"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gavel, Plus, TrendingUp, Shield } from "lucide-react"

interface BiddingPanelProps {
  currentBid: number
  reservePrice: number
  bidIncrement: number
  isReserveMet: boolean
  onPlaceBid: (amount: number) => void
  userMaxBid?: number
}

export function BiddingPanel({
  currentBid,
  reservePrice,
  bidIncrement,
  isReserveMet,
  onPlaceBid,
  userMaxBid,
}: BiddingPanelProps) {
  const [customBid, setCustomBid] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const suggestedBids = [currentBid + bidIncrement, currentBid + bidIncrement * 2, currentBid + bidIncrement * 5]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleQuickBid = async (amount: number) => {
    setIsSubmitting(true)
    console.log("[v0] Quick bid placed:", amount)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    onPlaceBid(amount)
    setIsSubmitting(false)
  }

  const handleCustomBid = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseInt(customBid)
    if (amount <= currentBid) {
      alert("Bid must be higher than current bid")
      return
    }
    setIsSubmitting(true)
    console.log("[v0] Custom bid placed:", amount)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    onPlaceBid(amount)
    setCustomBid("")
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gavel className="h-5 w-5 text-primary" />
          <span>Place Your Bid</span>
        </CardTitle>
        <CardDescription>Current high bid: {formatPrice(currentBid)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Bid Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Reserve Price</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{formatPrice(reservePrice)}</span>
              <Badge variant={isReserveMet ? "default" : "secondary"} className="text-xs">
                {isReserveMet ? (
                  <>
                    <Shield className="h-3 w-3 mr-1" />
                    Met
                  </>
                ) : (
                  "Not Met"
                )}
              </Badge>
            </div>
          </div>

          {userMaxBid && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Your Max Bid</span>
              <span className="font-medium text-primary">{formatPrice(userMaxBid)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Minimum Increment</span>
            <span className="font-medium">{formatPrice(bidIncrement)}</span>
          </div>
        </div>

        {/* Quick Bid Buttons */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Quick Bid</span>
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestedBids.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                className="justify-between bg-transparent"
                onClick={() => handleQuickBid(amount)}
                disabled={isSubmitting}
              >
                <span>Bid {formatPrice(amount)}</span>
                <Plus className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Bid */}
        <div className="space-y-3">
          <h4 className="font-medium">Custom Bid</h4>
          <form onSubmit={handleCustomBid} className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-3 text-muted-foreground">$</span>
              <Input
                type="number"
                placeholder="Enter your bid"
                className="pl-8"
                value={customBid}
                onChange={(e) => setCustomBid(e.target.value)}
                min={currentBid + 1}
                step={bidIncrement}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || !customBid}>
              {isSubmitting ? "Placing Bid..." : "Place Custom Bid"}
            </Button>
          </form>
        </div>

        {/* Bidding Info */}
        <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
          <p className="font-medium mb-1">Bidding Information:</p>
          <ul className="space-y-1">
            <li>• Bids are binding and cannot be retracted</li>
            <li>• You will be notified if outbid</li>
            <li>• Winning bid requires full payment within 48 hours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
