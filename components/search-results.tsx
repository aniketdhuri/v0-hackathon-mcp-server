import { searchServers } from "@/app/actions"
import Link from "next/link"
import { Star, GitFork, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export async function SearchResults({ query }: { query: string }) {
  const results = await searchServers(query)

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No servers found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search terms or be more specific about what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.map((server: any) => (
        <Card key={server.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-xl">{server.name}</h3>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{server.stars?.toLocaleString() || 0}</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{server.description || server.short_description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(server.tags || []).map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Match score:</span> {server.matchScore || 0}%
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 bg-muted/50 flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm">
              <div>Updated {server.lastUpdated}</div>
              <div>{server.language}</div>
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                {server.forks?.toLocaleString() || 0}
              </div>
            </div>

            <Link href={`/server/${server.id}`}>
              <Button variant="outline" size="sm">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
