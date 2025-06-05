import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star, Eye, ExternalLink, Github, Code, Database, Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModuleSection } from "@/components/module-section"

// Mock data directly in the component to avoid server action issues
const servers = [
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

const modules = [
  {
    name: "Core Engine",
    summary: "Main processing engine that handles MCP protocol communication and request routing",
    details:
      "The core engine is responsible for parsing incoming requests, validating protocol compliance, and routing requests to appropriate handlers. It includes connection management, error handling, and response formatting.",
    icon: Code,
  },
  {
    name: "Data Processing",
    summary: "Advanced data transformation and analysis capabilities",
    details:
      "Handles various data formats including JSON, XML, CSV, and binary data. Provides filtering, transformation, aggregation, and validation features with support for custom processing pipelines.",
    icon: Database,
  },
  {
    name: "Configuration",
    summary: "Flexible configuration management and environment setup",
    details:
      "Supports multiple configuration formats (YAML, JSON, ENV). Includes hot-reloading, environment-specific configs, and validation. Provides CLI tools for configuration management.",
    icon: Settings,
  },
  {
    name: "Performance",
    summary: "Optimized performance monitoring and scaling capabilities",
    details:
      "Built-in metrics collection, performance profiling, and auto-scaling features. Includes connection pooling, caching mechanisms, and resource optimization for high-throughput scenarios.",
    icon: Zap,
  },
]

export default function ServerPage({ params }: { params: { id: string } }) {
  const server = servers.find((s) => s.id === params.id)

  if (!server) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {/* Navigation */}
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8 hover:bg-white/50 dark:hover:bg-slate-800/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
        </Link>

        {/* Server Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-bold text-3xl">{server.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 dark:from-slate-100 dark:to-blue-200 bg-clip-text text-transparent">
                  {server.name}
                </h1>
                <p className="text-xl text-muted-foreground mt-2 leading-relaxed">{server.description}</p>
              </div>
            </div>

            <div className="flex gap-3 md:ml-auto">
              <Link href={server.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-lg">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {server.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{server.stars.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">GitHub Stars</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{server.views.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <ExternalLink className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.floor(server.views * 0.15).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Click Count</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Description */}
        <Card className="mb-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">About {server.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed mb-4">{server.description}</p>
              <p className="text-lg leading-relaxed mb-4">
                This {server.language} implementation of the Model Context Protocol has gained significant popularity in
                the AI developer community with {server.stars.toLocaleString()} stars on GitHub.
              </p>
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Full implementation of the MCP specification</li>
                <li>Seamless integration with language models like Claude</li>
                <li>Extensible plugin architecture for custom tools</li>
                <li>Comprehensive documentation and examples</li>
                <li>Active community support and regular updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Module Summaries */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 dark:from-slate-100 dark:to-blue-200 bg-clip-text text-transparent">
            Module Architecture
          </h2>

          <div className="grid gap-4">
            {modules.map((module) => (
              <ModuleSection key={module.name} module={module} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
