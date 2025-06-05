"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink, Star, GitFork, Eye } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPopularServers } from "@/app/actions"
import type { Server } from "@/lib/types"

export function PopularServers() {
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularServers = async () => {
      try {
        const popularServers = await getPopularServers()
        setServers(popularServers)
      } catch (error) {
        console.error("Failed to fetch popular servers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularServers()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter className="px-6 py-4 bg-muted/50 flex justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server) => (
        <Link href={`/server/${server.id}`} key={server.id}>
          <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{server.name}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
              <p className="text-muted-foreground text-sm line-clamp-3">{server.description}</p>
            </CardContent>
            <CardFooter className="px-6 py-3 bg-muted/50 flex justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4" />
                <span>{server.stars.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <GitFork className="h-4 w-4" />
                  <span>{server.forks.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{server.views.toLocaleString()}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
