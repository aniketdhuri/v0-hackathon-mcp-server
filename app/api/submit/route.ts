import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function POST(request: NextRequest) {
  try {
    const { name, github_url } = await request.json()

    if (!name || !github_url) {
      return NextResponse.json({ error: "Name and GitHub URL are required" }, { status: 400 })
    }

    // Generate a unique ID for the server
    const serverId = `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Store the basic information immediately
    const serverData = {
      id: serverId,
      name,
      github_url,
      created_at: new Date().toISOString(),
      status: "processing",
    }

    // Store in KV storage
    await kv.hset(`server:${serverId}`, serverData)

    // Add to servers list
    await kv.sadd("servers", serverId)

    // Increment trending count
    await kv.zincrby("trending_servers", 1, serverId)

    // Trigger description generation asynchronously (fire and forget)
    fetch(`${request.nextUrl.origin}/api/description`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, github_url, serverId }),
    }).catch(console.error)

    return NextResponse.json({
      success: true,
      message: "Server submitted successfully",
      serverId,
      data: serverData,
    })
  } catch (error) {
    console.error("Error in submit endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
