"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, TrendingUp, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { searchTools } from "@/app/actions"

interface SearchFormProps {
  onFocusChange: (focused: boolean) => void
  isSearchFocused: boolean
}

const suggestedSearches = [
  { icon: TrendingUp, text: "PDF document processing and analysis", category: "Popular" },
  { icon: Zap, text: "Real-time data visualization tools", category: "Trending" },
  { icon: Clock, text: "Database integration and querying", category: "Recent" },
  { icon: TrendingUp, text: "Web scraping and content extraction", category: "Popular" },
  { icon: Zap, text: "Image processing and computer vision", category: "Trending" },
  { icon: Clock, text: "API integration and webhook handling", category: "Recent" },
]

export function SearchForm({ onFocusChange, isSearchFocused }: SearchFormProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    try {
      await searchTools(query)
      router.push(`/results?q=${encodeURIComponent(query)}`)
    } finally {
      setIsSearching(false)
    }
  }

  const handleFocus = () => {
    setShowSuggestions(true)
    onFocusChange(true)
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false)
      onFocusChange(false)
    }, 200)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    onFocusChange(false)
    // Auto-submit the suggestion
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }, 100)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSuggestions(false)
        onFocusChange(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onFocusChange])

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className={`relative transition-all duration-500 ${isSearchFocused ? "scale-105" : "scale-100"}`}>
            <Textarea
              ref={inputRef}
              placeholder="Describe what you're looking for... (e.g., I need an MCP server that can process and analyze PDF documents)"
              className={`min-h-[120px] resize-none text-lg p-6 rounded-2xl border-2 transition-all duration-300 ${
                isSearchFocused
                  ? "border-blue-500 shadow-2xl bg-white dark:bg-slate-800"
                  : "border-slate-200 dark:border-slate-700 shadow-lg bg-white/80 dark:bg-slate-800/80"
              } backdrop-blur-sm`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div className="absolute right-4 top-4">
              <Search
                className={`h-6 w-6 transition-colors duration-300 ${
                  isSearchFocused ? "text-blue-500" : "text-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Suggested Searches</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {suggestedSearches.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <suggestion.icon className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <div className="flex-1">
                      <div className="text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {suggestion.text}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{suggestion.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Find Servers
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
