"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Eye, Gavel } from "lucide-react"

interface ActivityItem {
  id: string
  type: "bid" | "join" | "watch"
  user: string
  amount?: number
  timestamp: string
}

interface LiveActivityProps {
  auctionId: string
}

export function LiveActivity({ auctionId }: LiveActivityProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "bid",
      user: "John D.",
      amount: 185000,
      timestamp: new Date(Date.now() - 30000).toISOString(),
    },
    {
      id: "2",
      type: "join",
      user: "Sarah M.",
      timestamp: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: "3",
      type: "bid",
      user: "Mike R.",
      amount: 180000,
      timestamp: new Date(Date.now() - 180000).toISOString(),
    },
    {
      id: "4",
      type: "watch",
      user: "Emma L.",
      timestamp: new Date(Date.now() - 240000).toISOString(),
    },
  ])

  const [viewerCount, setViewerCount] = useState(47)

  // Simulate live activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new activity
      if (Math.random() > 0.7) {
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "join" : "watch",
          user: `User ${Math.floor(Math.random() * 1000)}`,
          timestamp: new Date().toISOString(),
        }
        setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
      }

      // Update viewer count
      setViewerCount((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    return `${Math.floor(diffInSeconds / 3600)}h ago`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "bid":
        return <Gavel className="h-4 w-4 text-primary" />
      case "join":
        return <Users className="h-4 w-4 text-green-600" />
      case "watch":
        return <Eye className="h-4 w-4 text-blue-600" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case "bid":
        return `placed a bid of ${formatPrice(activity.amount!)}`
      case "join":
        return "joined the auction"
      case "watch":
        return "is watching"
      default:
        return "unknown activity"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>Live Activity</span>
        </CardTitle>
        <CardDescription className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Live
          </Badge>
          <span className="flex items-center space-x-1 text-sm">
            <Eye className="h-4 w-4" />
            <span>{viewerCount} watching</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{getActivityText(activity)}</span>
                </p>
                <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
