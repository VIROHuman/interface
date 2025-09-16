"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, Moon, Sun, Plus, MessageSquare, Menu, X } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const searchParams = useSearchParams()
  const initialMessage = searchParams.get("message")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "வணக்கம்! நான் TLM 1.0, உங்கள் தமிழ் மொழி உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      handleInitialMessage(initialMessage.trim())
    }
  }, [initialMessage])

  const handleInitialMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate API call - replace with your backend integration
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "இது ஒரு மாதிரி பதில். உங்கள் backend API-யுடன் இதை இணைக்கவும்.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call - replace with your backend integration
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "இது ஒரு மாதிரி பதில். உங்கள் backend API-யுடன் இதை இணைக்கவும்.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const startNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "வணக்கம்! நான் TLM 1.0, உங்கள் தமிழ் மொழி உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sidebar-foreground">TLM 1.0</h1>
              <p className="text-xs text-muted-foreground">Tamil Language Model</p>
            </div>
          </div>
          <Button
            onClick={startNewChat}
            className="w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80"
            variant="ghost"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            <div className="p-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-sidebar-foreground" />
                <span className="text-sm font-medium text-sidebar-foreground">Current Chat</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {messages[messages.length - 1]?.content.slice(0, 40)}...
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <Button onClick={toggleTheme} variant="ghost" size="sm" className="w-full justify-start gap-2">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-foreground">TLM 1.0</h2>
                <p className="text-xs text-muted-foreground">Tamil Language Model • Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-12"
                      : "bg-card text-card-foreground mr-12"
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div
                    className={`text-xs mt-2 opacity-70 ${
                      message.role === "user" ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </Card>

                {message.role === "user" && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="max-w-[80%] p-4 bg-card text-card-foreground mr-12">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">TLM is thinking...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message in Tamil or English..."
                  className="min-h-[44px] pr-12 resize-none bg-input border-border focus:ring-2 focus:ring-ring"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-11 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              TLM 1.0 can make mistakes. Please verify important information.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
