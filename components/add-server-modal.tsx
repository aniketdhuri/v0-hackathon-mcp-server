"use client"

import type React from "react"

import { useState } from "react"
import { Github, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { addServer } from "@/app/actions"

interface AddServerModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddServerModal({ isOpen, onClose }: AddServerModalProps) {
  const [name, setName] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !githubUrl.trim()) return

    setIsSubmitting(true)
    try {
      await addServer({ name: name.trim(), githubUrl: githubUrl.trim() })
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setName("")
        setGithubUrl("")
        setIsSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error adding server:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setName("")
      setGithubUrl("")
      setIsSuccess(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">+</span>
            </div>
            Add MCP Server
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">Server Added Successfully!</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your MCP server has been submitted and will be processed shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="server-name">Server Name</Label>
              <Input
                id="server-name"
                placeholder="e.g., PDF Processing Server"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github-url">GitHub URL</Label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="github-url"
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  disabled={isSubmitting}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Auto-generation:</strong> Once submitted, we'll automatically generate the server description,
                fetch stars count, and create a JSON description based on the GitHub repository.
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting} className="flex-1">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !name.trim() || !githubUrl.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Server"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
