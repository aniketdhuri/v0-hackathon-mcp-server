"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ModuleSectionProps {
  module: {
    name: string
    summary: string
    details: string
    icon: React.ComponentType<{ className?: string }>
  }
}

export function ModuleSection({ module }: ModuleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const IconComponent = module.icon

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-xl">{module.name}</CardTitle>
                  <CardDescription className="text-base mt-1">{module.summary}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {isExpanded ? "Show less" : "Learn more"}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{module.details}</p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
