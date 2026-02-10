import { NextRequest, NextResponse } from "next/server";

// Mock build process - will be replaced with real agent later
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style, colorTheme } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Generate a unique job ID
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // In a real implementation, this would:
    // 1. Queue the build job
    // 2. Start the AI agent to generate the site
    // 3. Deploy to Vercel
    // 4. Return progress updates via SSE or WebSocket

    // For now, return a mock job ID
    return NextResponse.json({
      success: true,
      jobId,
      message: "Build started",
      estimatedTime: 10, // seconds
      config: {
        prompt: prompt.substring(0, 200),
        style: style || "minimal",
        colorTheme: colorTheme || "purple",
      },
    });
  } catch (error) {
    console.error("Build API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get build status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json(
      { error: "Job ID is required" },
      { status: 400 }
    );
  }

  // Mock status response
  // In a real implementation, this would check the actual job status

  // Simulate random progress
  const progress = Math.min(100, Math.floor(Math.random() * 40) + 60);
  const isComplete = progress >= 100;

  const steps = [
    { id: "ignite", text: "Igniting build engine...", complete: true },
    { id: "construct", text: "Constructing pages...", complete: progress > 25 },
    { id: "style", text: "Applying styles...", complete: progress > 50 },
    { id: "deploy", text: "Deploying to cloud...", complete: progress > 75 },
  ];

  const currentStep = steps.findIndex((s) => !s.complete);

  return NextResponse.json({
    jobId,
    status: isComplete ? "complete" : "building",
    progress,
    currentStep: currentStep === -1 ? steps.length - 1 : currentStep,
    steps,
    ...(isComplete && {
      result: {
        url: `https://my-site-${jobId.substring(4, 10)}.vercel.app`,
        deployedAt: new Date().toISOString(),
      },
    }),
  });
}
