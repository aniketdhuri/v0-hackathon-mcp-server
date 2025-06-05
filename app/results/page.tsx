import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchForm } from "@/components/search-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">MCP Server Search Results</h1>

      <div className="mb-8">
        <SearchForm />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Results for: <span className="text-primary">{query}</span>
        </h2>

        <Suspense fallback={<ResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}

function ResultsSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border rounded-lg p-6">
          <Skeleton className="h-7 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6 mb-4" />
          <div className="flex gap-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
