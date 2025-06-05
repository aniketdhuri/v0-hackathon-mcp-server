import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")

    if (!name) {
      return NextResponse.json({ error: "Name parameter is required" }, { status: 400 })
    }

    // Get all server IDs
    const serverIds = (await kv.smembers("servers")) as string[]

    if (!serverIds || serverIds.length === 0) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 })
    }

    // Find server by name
    let foundServer = null
    for (const serverId of serverIds) {
      const serverData = await kv.hgetall(`server:${serverId}`)
      if (serverData && serverData.name === name) {
        foundServer = {
          ...serverData,
          stars: serverData.stars || Math.floor(Math.random() * 5000),
          forks: serverData.forks || Math.floor(Math.random() * 500),
          views: serverData.views || Math.floor(Math.random() * 10000),
          tags: serverData.tags || ["mcp", "server"],
          language: serverData.language || "Unknown",
          lastUpdated: serverData.updated_at || serverData.created_at || "Recently",
        }
        break
      }
    }

    if (!foundServer) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 })
    }

    return NextResponse.json({ server: foundServer })
  } catch (error) {
    console.error("Error in fetch endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
