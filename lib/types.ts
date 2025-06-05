export interface Server {
  id: string
  name: string
  description: string
  stars: number
  forks: number
  views: number
  tags: string[]
  language: string
  lastUpdated: string
  matchScore: number
  repoUrl: string
  overview?: string
  commands?: Command[]
  usageExamples?: UsageExample[]
}

export interface Command {
  command: string
  description: string
  example?: string
}

export interface UsageExample {
  title: string
  description: string
  code: string
}
