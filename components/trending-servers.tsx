"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Star, Eye, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Server {
  id: string
  name: string
  description?: string
  short_description?: string
  github_url?: string
  stars: number
  forks?: number
  views: number
  tags?: string[]
  language: string
  lastUpdated: string
  trendingScore?: number
}

// Mock data to ensure we always have trending servers to display
const mockTrendingServers: Server[] = [
  {
    id: "server-1",
    name: "anthropic-mcp-server",
    description: "Official reference implementation of the Model Context Protocol server by Anthropic",
    short_description: "Official MCP server by Anthropic",
    github_url: "https://github.com/anthropics/mcp-server",
    stars: 4250,
    forks: 320,
    views: 25000,
    tags: ["mcp", "llm", "anthropic", "claude"],
    language: "Python",
    lastUpdated: "2 days ago",
    trendingScore: 100,
  },
  {
    id: "server-2",
    name: "mcp-toolkit",
    description: "A comprehensive toolkit for building and deploying MCP servers with various integrations",
    short_description: "Comprehensive MCP toolkit",
    github_url: "https://github.com/ai-community/mcp-toolkit",
    stars: 2800,
    forks: 410,
    views: 18000,
    tags: ["mcp", "toolkit", "integrations", "ai"],
    language: "TypeScript",
    lastUpdated: "5 days ago",
    trendingScore: 95,
  },
  {
    id: "server-3",
    name: "pdf-mcp-server",
    description: "MCP server specialized in PDF document processing, analysis, and data extraction",
    short_description: "PDF processing MCP server",
    github_url: "https://github.com/pdf-ai/pdf-mcp-server",
    stars: 1950,
    forks: 280,
    views: 12000,
    tags: ["mcp", "pdf", "document-processing", "ai"],
    language: "Python",
    lastUpdated: "1 week ago",
    trendingScore: 90,
  },
  {
    id: "server-4",
    name: "mcp-connect",
    description: "Lightweight MCP server implementation with focus on performance and scalability",
    short_description: "High-performance MCP server",
    github_url: "https://github.com/mcp-project/mcp-connect",
    stars: 3100,
    forks: 520,
    views: 22000,
    tags: ["mcp", "performance", "scalable", "enterprise"],
    language: "Rust",
    lastUpdated: "3 days ago",
    trendingScore: 92,
  },
  {
    id: "server-5",
    name: "data-analysis-mcp",
    description: "MCP server for data analysis and visualization with multiple data source connectors",
    short_description: "Data analysis MCP server",
    github_url: "https://github.com/data-tools/data-analysis-mcp",
    stars: 2100,
    forks: 310,
    views: 15000,
    tags: ["mcp", "data-analysis", "visualization", "connectors"],
    language: "Python",
    lastUpdated: "4 days ago",
    trendingScore: 88,
  },
  {
    id: "server-6",
    name: "mcp-js",
    description: "JavaScript implementation of MCP server for web applications and browser environments",
    short_description: "JavaScript MCP server",
    github_url: "https://github.com/web-ai/mcp-js",
    stars: 1800,
    forks: 240,
    views: 9500,
    tags: ["mcp", "javascript", "web", "browser"],
    language: "JavaScript",
    lastUpdated: "1 week ago",
    trendingScore: 85,
  },
]

export function TrendingServers() {
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchServers = async () => {
      try {
        // For now, use mock data to ensure the component always shows content
        // In production, this would fetch from the API
        setServers(mockTrendingServers)
      } catch (error) {
        console.error("Failed to fetch trending servers:", error)
        // Fallback to mock data
        setServers(mockTrendingServers)
      } finally {
        setLoading(false)
      }
    }

    fetchServers()
  }, [])

  useEffect(() => {
    if (servers.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(servers.length / 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [servers.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(servers.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(servers.length / 3)) % Math.ceil(servers.length / 3))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 dark:from-slate-100 dark:to-blue-200 bg-clip-text text-transparent">
            Trending MCP Servers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const totalSlides = Math.ceil(servers.length / 3)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 dark:from-slate-100 dark:to-blue-200 bg-clip-text text-transparent">
            Trending MCP Servers
          </h2>
        </div>

        {totalSlides > 1 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prevSlide} className="rounded-full w-10 h-10 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} className="rounded-full w-10 h-10 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Grid layout for better visibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <Link href={`/server/${server.id}`} key={server.id}>
            <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{server.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {server.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {server.language}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                  {server.short_description || server.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{server.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{server.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{server.lastUpdated}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Dots indicator - only show if we have multiple slides */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
