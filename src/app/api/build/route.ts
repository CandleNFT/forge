import { NextRequest, NextResponse } from 'next/server';

const OPENCLAW_GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL;
const OPENCLAW_GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;

// Store active builds in memory (in production, use a database)
const activeBuilds = new Map<string, {
  status: 'pending' | 'building' | 'deploying' | 'complete' | 'failed';
  step: number;
  prompt: string;
  vercelToken: string;
  url?: string;
  error?: string;
  startedAt: number;
}>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, vercelToken, style, colorTheme } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!vercelToken) {
      return NextResponse.json({ error: 'Vercel token is required' }, { status: 400 });
    }

    // Generate a unique build ID
    const buildId = `build_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Store the build
    activeBuilds.set(buildId, {
      status: 'pending',
      step: 0,
      prompt,
      vercelToken,
      startedAt: Date.now(),
    });

    // If OpenClaw gateway is configured, spawn a real agent
    if (OPENCLAW_GATEWAY_URL && OPENCLAW_GATEWAY_TOKEN) {
      // Spawn real agent asynchronously
      spawnBuildAgent(buildId, prompt, vercelToken, style, colorTheme);
    } else {
      // Mock mode - simulate build progress
      simulateBuild(buildId);
    }

    return NextResponse.json({ 
      success: true, 
      buildId,
      message: 'Build started! Bobert is on it 🤖'
    });

  } catch (error) {
    console.error('Build error:', error);
    return NextResponse.json({ error: 'Failed to start build' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const buildId = request.nextUrl.searchParams.get('buildId');
  
  if (!buildId) {
    return NextResponse.json({ error: 'buildId is required' }, { status: 400 });
  }

  const build = activeBuilds.get(buildId);
  
  if (!build) {
    return NextResponse.json({ error: 'Build not found' }, { status: 404 });
  }

  return NextResponse.json({
    buildId,
    status: build.status,
    step: build.step,
    url: build.url,
    error: build.error,
  });
}

async function spawnBuildAgent(
  buildId: string, 
  prompt: string, 
  vercelToken: string,
  style?: string,
  colorTheme?: string
) {
  const build = activeBuilds.get(buildId);
  if (!build) return;

  try {
    build.status = 'building';
    build.step = 1;

    const taskPrompt = `Build and deploy a website based on this description:

"${prompt}"

Style preference: ${style || 'minimal'}
Color theme: ${colorTheme || 'purple/pink gradients'}

Requirements:
1. Create a Next.js project with TypeScript and Tailwind CSS
2. Make it visually stunning with modern design
3. Use the provided Vercel token to deploy: ${vercelToken}
4. The site should be fully functional and responsive

Deploy using: VERCEL_TOKEN=${vercelToken} vercel --prod --yes

When complete, report the deployed URL.`;

    // Call OpenClaw gateway to spawn agent
    const response = await fetch(`${OPENCLAW_GATEWAY_URL}/api/sessions/spawn`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENCLAW_GATEWAY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: taskPrompt,
        label: `forge-${buildId}`,
        runTimeoutSeconds: 600,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to spawn agent');
    }

    const data = await response.json();
    
    // Poll for completion
    const pollInterval = setInterval(async () => {
      try {
        const statusResponse = await fetch(
          `${OPENCLAW_GATEWAY_URL}/api/sessions/history?sessionKey=${data.childSessionKey}&limit=1`,
          {
            headers: {
              'Authorization': `Bearer ${OPENCLAW_GATEWAY_TOKEN}`,
            },
          }
        );
        
        const statusData = await statusResponse.json();
        const lastMessage = statusData.messages?.[0];
        
        if (lastMessage?.content) {
          // Check if build is complete by looking for a URL
          const urlMatch = lastMessage.content.match(/https:\/\/[^\s]+\.vercel\.app/);
          if (urlMatch) {
            build.status = 'complete';
            build.step = 4;
            build.url = urlMatch[0];
            clearInterval(pollInterval);
          }
        }

        // Update step based on time elapsed
        const elapsed = Date.now() - build.startedAt;
        if (elapsed > 30000 && build.step < 2) build.step = 2;
        if (elapsed > 60000 && build.step < 3) build.step = 3;
        
        // Timeout after 10 minutes
        if (elapsed > 600000) {
          build.status = 'failed';
          build.error = 'Build timed out';
          clearInterval(pollInterval);
        }

      } catch (e) {
        console.error('Poll error:', e);
      }
    }, 5000);

  } catch (error) {
    console.error('Agent spawn error:', error);
    build.status = 'failed';
    build.error = 'Failed to start build agent';
  }
}

async function simulateBuild(buildId: string) {
  const build = activeBuilds.get(buildId);
  if (!build) return;

  // Simulate build steps
  const steps = [
    { delay: 2000, step: 1, status: 'building' as const },
    { delay: 3000, step: 2, status: 'building' as const },
    { delay: 3000, step: 3, status: 'deploying' as const },
    { delay: 2000, step: 4, status: 'complete' as const },
  ];

  for (const s of steps) {
    await new Promise(resolve => setTimeout(resolve, s.delay));
    build.step = s.step;
    build.status = s.status;
  }

  // Generate fake URL
  const siteName = build.prompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20);
  const siteId = Math.random().toString(36).substring(2, 8);
  build.url = `https://${siteName}-${siteId}.vercel.app`;
}
