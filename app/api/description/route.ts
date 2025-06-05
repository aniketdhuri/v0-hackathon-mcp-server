import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { kv } from "@vercel/kv"

export async function POST(request: NextRequest) {
  try {
    const { name, github_url, serverId } = await request.json()

    if (!name || !github_url) {
      return NextResponse.json({ error: "Name and GitHub URL are required" }, { status: 400 })
    }

    // Generate description using AI
    const { text: description } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze the GitHub repository at ${github_url} with the name "${name}" and generate a comprehensive description for an MCP (Model Context Protocol) server.
        
        Please provide:
        1. A detailed description of what this MCP server does
        2. Its main features and capabilities
        3. How it integrates with the Model Context Protocol
        4. What kind of AI tools or data sources it connects to
        
        Keep the description informative but concise, around 2-3 paragraphs.
        Focus on the MCP-specific functionality and integration capabilities.
      `,
    })

    // Generate short description for the first page
    const { text: shortDescription } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Based on this description: "${description}"
        
        Create a very short, one-sentence description (maximum 80 characters) that captures the essence of this MCP server.
        This will be displayed on the main page as a brief summary.
      `,
    })

    // Update the server data in storage
    const updateData = {
      description,
      short_description: shortDescription,
      status: "completed",
      updated_at: new Date().toISOString(),
    }

    if (serverId) {
      // Update existing server
      await kv.hset(`server:${serverId}`, updateData)
    } else {
      // This is a standalone description generation
      // You might want to handle this case differently
      console.log("Generated description for:", name)
    }

    return NextResponse.json({
      success: true,
      description,
      short_description: shortDescription,
      message: "Description generated successfully",
    })
  } catch (error) {
    console.error("Error in description endpoint:", error)

    // Update status to failed if we have a serverId
    const { serverId } = await request.json().catch(() => ({}))
    if (serverId) {
      await kv
        .hset(`server:${serverId}`, {
          status: "failed",
          error: "Failed to generate description",
          updated_at: new Date().toISOString(),
        })
        .catch(console.error)
    }

    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 })
  }
}
