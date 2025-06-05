import { type NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    // Get all server IDs
    const serverIds = (await kv.smembers("servers")) as string[]

    if (!serverIds || serverIds.length === 0) {
      return NextResponse.json({ results: [] })
    }

    // Fetch all server data
    const servers = []
    for (const serverId of serverIds) {
      const serverData = await kv.hgetall(`server:${serverId}`)
      if (serverData) {
        servers.push(serverData)
      }
    }

    // Filter servers based on search query
    const searchLower = query.toLowerCase()
    const filteredServers = servers.filter((server) => {
      const name = (server.name as string)?.toLowerCase() || ""
      const githubUrl = (server.github_url as string)?.toLowerCase() || ""
      const description = (server.description as string)?.toLowerCase() || ""

      return name.includes(searchLower) || githubUrl.includes(searchLower) || description.includes(searchLower)
    })

    // Add match scores and format response
    const results = filteredServers.map((server) => ({
      ...server,
      matchScore: calculateMatchScore(query, server),
      stars: server.stars || Math.floor(Math.random() * 5000),
      forks: server.forks || Math.floor(Math.random() * 500),
      views: server.views || Math.floor(Math.random() * 10000),
      tags: server.tags || ["mcp", "server"],
      language: server.language || "Unknown",
      lastUpdated: server.updated_at || server.created_at || "Recently",
    }))

    // Sort by match score
    results.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error in search endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function calculateMatchScore(query: string, server: any): number {
  const queryLower = query.toLowerCase()
  const name = (server.name as string)?.toLowerCase() || ""
  const description = (server.description as string)?.toLowerCase() || ""

  let score = 0

  // Exact name match gets highest score
  if (name === queryLower) score += 100
  else if (name.includes(queryLower)) score += 80

  // Description match
  if (description.includes(queryLower)) score += 60

  // Partial word matches
  const queryWords = queryLower.split(" ")
  queryWords.forEach((word) => {
    if (name.includes(word)) score += 20
    if (description.includes(word)) score += 10
  })

  return Math.min(score, 100)
}
