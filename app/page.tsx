"use client"

import { useState } from "react"
import { SearchForm } from "@/components/search-form"
import { TrendingServers } from "@/components/trending-servers"
import { AddServerModal } from "@/components/add-server-modal"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4 max-w-6xl relative">
        {/* Header with Add Server Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MCP Server Finder
            </h1>
          </div>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Server
          </Button>
        </div>

        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-500 ${isSearchFocused ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-100 bg-clip-text text-transparent">
            Discover MCP Servers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find and connect with Model Context Protocol servers using natural language. Unlock the power of AI tool
            integration.
          </p>
        </div>

        {/* Search Form */}
        <div className="relative z-10">
          <SearchForm onFocusChange={setIsSearchFocused} isSearchFocused={isSearchFocused} />
        </div>

        {/* Spacer */}
        <div className="my-16" />

        {/* Trending Servers */}
        <div
          className={`transition-all duration-500 ${isSearchFocused ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}
        >
          <TrendingServers />
        </div>

        {/* MCP Information */}
        <div
          className={`mb-20 transition-all duration-500 ${isSearchFocused ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="group p-8 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">What is MCP</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Model Context Protocol (MCP) is an open standardized communication framework created by Anthropic
                    that allows LLMs to communicate with external AI tools and data sources.
                  </p>
                  <Link
                    href="https://www.anthropic.com/mcp"
                    className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="group p-8 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-1 h-16 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">What is an MCP server</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    An MCP server implements the Model Context Protocol, acting as the bridge between language models
                    and external AI tools or data sources, enabling seamless integration and communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Server Modal */}
        <AddServerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </div>
    </div>
  )
}
