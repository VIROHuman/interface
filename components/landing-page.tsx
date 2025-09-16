"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bot, Globe, BookOpen, Zap, ArrowRight, Send } from "lucide-react"
import { useRouter } from "next/navigation"

export function LandingPage() {
  const [chatInput, setChatInput] = useState("")
  const router = useRouter()

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatInput.trim()) {
      // Navigate to chat page with the initial message
      router.push(`/chat?message=${encodeURIComponent(chatInput.trim())}`)
    } else {
      router.push("/chat")
    }
  }

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Tamil Language Mastery",
      description:
        "Native understanding of Tamil grammar, literature, and cultural context with deep linguistic knowledge.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Cultural Intelligence",
      description:
        "Trained on Tamil literature, poetry, and cultural texts to provide contextually appropriate responses.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Bilingual Fluency",
      description:
        "Seamlessly switch between Tamil and English, perfect for translation and cross-cultural communication.",
    },
  ]

  const useCases = [
    "Tamil content creation and editing",
    "Language learning and tutoring",
    "Translation between Tamil and English",
    "Cultural and historical research",
    "Poetry and literature analysis",
    "Business communication in Tamil",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">TLM 1.0</h1>
                <p className="text-xs text-slate-700">Tamil Language Model</p>
              </div>
            </div>
            <Button onClick={() => router.push("/chat")} className="bg-primary hover:bg-primary/90">
              Start Chatting
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
              The Future of
              <span className="text-primary"> Tamil AI</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 text-pretty max-w-2xl mx-auto">
              TLM 1.0 is an advanced Tamil Language Model designed to understand, generate, and interact in Tamil with
              unprecedented accuracy and cultural awareness.
            </p>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-3 items-center p-2 bg-card border border-border rounded-xl shadow-lg">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything in Tamil or English..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-base"
              />
              <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-600 mt-2">Try: "தமிழ் கவிதை எழுது" or "Explain Tamil grammar"</p>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["தமிழ் கவிதை எழுது", "Translate to English", "Tamil grammar help", "Cultural context"].map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                size="sm"
                onClick={() => {
                  setChatInput(prompt)
                  router.push(`/chat?message=${encodeURIComponent(prompt)}`)
                }}
                className="text-sm"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Built for Tamil Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI capabilities specifically designed for the Tamil language and culture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What You Can Do</h2>
            <p className="text-lg text-muted-foreground">Explore the possibilities with TLM 1.0</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-foreground">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Experience Tamil AI?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your conversation with TLM 1.0 and discover the power of advanced Tamil language understanding.
          </p>
          <Button
            onClick={() => router.push("/chat")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8"
          >
            Start Chatting
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">TLM 1.0</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Tamil Language Model • Built with care for the Tamil community
          </p>
        </div>
      </footer>
    </div>
  )
}
