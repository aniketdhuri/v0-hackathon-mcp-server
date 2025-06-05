import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star, GitFork, Eye, ExternalLink, Terminal, Book, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getToolDetails, recordToolView } from "@/app/actions"

export default async function ToolPage({ params }: { params: { id: string } }) {
  try {
    const tool = await getToolDetails(params.id)

    if (!tool) {
      notFound()
    }

    // Record this view
    await recordToolView(params.id)

    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{tool.name}</h1>
              <p className="text-muted-foreground mt-1">{tool.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <Link href={tool.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  View on GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{tool.stars.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">stars</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-5 w-5" />
              <span className="font-medium">{tool.forks.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">forks</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-5 w-5" />
              <span className="font-medium">{tool.views.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">views</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="commands">Commands</TabsTrigger>
            <TabsTrigger value="usage">Usage Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none dark:prose-invert">
                  {tool.overview ? (
                    <div dangerouslySetInnerHTML={{ __html: tool.overview }} />
                  ) : (
                    <div>
                      <p>{tool.description}</p>
                      <p className="mt-4">
                        This is a popular {tool.language} tool with {tool.stars.toLocaleString()} stars on GitHub. It
                        was last updated {tool.lastUpdated}.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commands" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Available Commands
                </CardTitle>
                <CardDescription>Common commands and options for {tool.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tool.commands && tool.commands.length > 0 ? (
                    tool.commands.map((cmd, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-mono text-lg font-semibold">{cmd.command}</h3>
                        <p className="text-muted-foreground">{cmd.description}</p>
                        {cmd.example && (
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                            <code>{cmd.example}</code>
                          </pre>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Command information is being generated. Please check the GitHub repository for detailed usage
                        instructions.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Usage Examples
                </CardTitle>
                <CardDescription>Learn how to use {tool.name} with these practical examples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {tool.usageExamples && tool.usageExamples.length > 0 ? (
                    tool.usageExamples.map((example, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="text-lg font-semibold">{example.title}</h3>
                        <p className="text-muted-foreground">{example.description}</p>
                        <div className="bg-muted rounded-md overflow-hidden">
                          <div className="bg-muted/50 px-4 py-2 border-b flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            <span className="text-sm font-medium">Example</span>
                          </div>
                          <pre className="p-4 overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Usage examples are being generated. Please check the GitHub repository for detailed examples and
                        documentation.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error loading tool details:", error)
    notFound()
  }
}
