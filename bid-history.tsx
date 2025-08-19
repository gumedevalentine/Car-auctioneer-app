import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUp, Crown, Clock } from "lucide-react"

interface Bid {
  id: string
  amount: number
  bidder: {
    id: string
    name: string
    isCurrentUser?: boolean
  }
  timestamp: string
  isWinning?: boolean
}

interface BidHistoryProps {
  bids: Bid[]
  currentUserId?: string
}

export function BidHistory({ bids, currentUserId }: BidHistoryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (bids.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Bid History</span>
          </CardTitle>
          <CardDescription>No bids placed yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Be the first to place a bid!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Bid History</span>
        </CardTitle>
        <CardDescription>{bids.length} bids placed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {bids.map((bid, index) => (
            <div
              key={bid.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                bid.isWinning
                  ? "bg-primary/5 border-primary/20"
                  : bid.bidder.id === currentUserId
                    ? "bg-accent/5 border-accent/20"
                    : "bg-muted/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{getInitials(bid.bidder.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {bid.bidder.id === currentUserId ? "You" : bid.bidder.name}
                    </span>
                    {bid.isWinning && (
                      <Badge variant="default" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Winning
                      </Badge>
                    )}
                    {index === 0 && !bid.isWinning && (
                      <Badge variant="secondary" className="text-xs">
                        Latest
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{formatTime(bid.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${bid.isWinning ? "text-primary" : "text-foreground"}`}>
                  {formatPrice(bid.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
