"use server"

import { revalidatePath } from "next/cache"

// Submit a new MCP server
export async function addServer(data: { name: string; githubUrl: string }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        github_url: data.githubUrl,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit server")
    }

    const result = await response.json()

    // Revalidate pages to show new data
    revalidatePath("/")

    return result
  } catch (error) {
    console.error("Error adding server:", error)
    throw new Error("Failed to add server")
  }
}

// Search for servers
export async function searchServers(query: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/search?q=${encodeURIComponent(query)}`,
    )

    if (!response.ok) {
      throw new Error("Search failed")
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Error searching servers:", error)
    return []
  }
}

// Get trending servers
export async function getTrendingServers(count = 5) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/fetch_top_trending?count=${count}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch trending servers")
    }

    const data = await response.json()
    return data.servers || []
  } catch (error) {
    console.error("Error fetching trending servers:", error)
    return []
  }
}

// Get server by name
export async function getServerByName(name: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/fetch?name=${encodeURIComponent(name)}`,
    )

    if (!response.ok) {
      throw new Error("Server not found")
    }

    const data = await response.json()
    return data.server
  } catch (error) {
    console.error("Error fetching server:", error)
    return null
  }
}

// Legacy functions for backward compatibility
export async function searchTools(query: string) {
  return searchServers(query)
}

export async function getPopularServers() {
  return getTrendingServers(6)
}

export async function getSearchResults(query: string) {
  return searchServers(query)
}

export async function getToolDetails(id: string) {
  // For now, return mock data for the detail page
  // In the future, this could be updated to use the fetch API
  const mockServers = [
    {
      id: "server-1",
      name: "anthropic-mcp-server",
      description: "Official reference implementation of the Model Context Protocol server by Anthropic",
      stars: 4250,
      forks: 320,
      views: 25000,
      tags: ["mcp", "llm", "anthropic", "claude"],
      language: "Python",
      lastUpdated: "2 days ago",
      matchScore: 98,
      repoUrl: "https://github.com/anthropics/mcp-server",
    },
    {
      id: "server-2",
      name: "mcp-toolkit",
      description: "A comprehensive toolkit for building and deploying MCP servers with various integrations",
      stars: 2800,
      forks: 410,
      views: 18000,
      tags: ["mcp", "toolkit", "integrations", "ai"],
      language: "TypeScript",
      lastUpdated: "5 days ago",
      matchScore: 95,
      repoUrl: "https://github.com/ai-community/mcp-toolkit",
    },
    {
      id: "server-3",
      name: "pdf-mcp-server",
      description: "MCP server specialized in PDF document processing, analysis, and data extraction",
      stars: 1950,
      forks: 280,
      views: 12000,
      tags: ["mcp", "pdf", "document-processing", "ai"],
      language: "Python",
      lastUpdated: "1 week ago",
      matchScore: 90,
      repoUrl: "https://github.com/pdf-ai/pdf-mcp-server",
    },
    {
      id: "server-4",
      name: "mcp-connect",
      description: "Lightweight MCP server implementation with focus on performance and scalability",
      stars: 3100,
      forks: 520,
      views: 22000,
      tags: ["mcp", "performance", "scalable", "enterprise"],
      language: "Rust",
      lastUpdated: "3 days ago",
      matchScore: 92,
      repoUrl: "https://github.com/mcp-project/mcp-connect",
    },
    {
      id: "server-5",
      name: "data-analysis-mcp",
      description: "MCP server for data analysis and visualization with multiple data source connectors",
      stars: 2100,
      forks: 310,
      views: 15000,
      tags: ["mcp", "data-analysis", "visualization", "connectors"],
      language: "Python",
      lastUpdated: "4 days ago",
      matchScore: 88,
      repoUrl: "https://github.com/data-tools/data-analysis-mcp",
    },
    {
      id: "server-6",
      name: "mcp-js",
      description: "JavaScript implementation of MCP server for web applications and browser environments",
      stars: 1800,
      forks: 240,
      views: 9500,
      tags: ["mcp", "javascript", "web", "browser"],
      language: "JavaScript",
      lastUpdated: "1 week ago",
      matchScore: 85,
      repoUrl: "https://github.com/web-ai/mcp-js",
    },
  ]

  const server = mockServers.find((s) => s.id === id)
  if (!server) return null

  return {
    ...server,
    overview: `
      <h2>About ${server.name}</h2>
      <p>${server.description}</p>
      <p>This ${server.language} implementation of the Model Context Protocol has gained significant popularity in the AI developer community with ${server.stars.toLocaleString()} stars on GitHub.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Full implementation of the MCP specification</li>
        <li>Seamless integration with language models like Claude</li>
        <li>Extensible plugin architecture for custom tools</li>
        <li>Comprehensive documentation and examples</li>
      </ul>
    `,
  }
}

export async function recordToolView(id: string) {
  console.log(`Tool view recorded: ${id}`)
  return true
}
