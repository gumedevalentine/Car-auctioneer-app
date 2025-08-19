"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, AlertTriangle } from "lucide-react"

interface CountdownTimerProps {
  endTime: string
  onTimeUp?: () => void
}

export function CountdownTimer({ endTime, onTimeUp }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setIsExpired(true)
        onTimeUp?.()
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onTimeUp])

  if (isExpired) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">Auction Ended</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1

  return (
    <Card className={`${isUrgent ? "border-red-200 bg-red-50" : "border-primary/20 bg-primary/5"}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Clock className={`h-5 w-5 ${isUrgent ? "text-red-600" : "text-primary"}`} />
          <span className={`font-semibold ${isUrgent ? "text-red-600" : "text-primary"}`}>
            {isUrgent ? "Ending Soon!" : "Time Remaining"}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="space-y-1">
            <div className={`text-2xl font-bold font-mono ${isUrgent ? "text-red-600" : "text-foreground"}`}>
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Days</div>
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold font-mono ${isUrgent ? "text-red-600" : "text-foreground"}`}>
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Hours</div>
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold font-mono ${isUrgent ? "text-red-600" : "text-foreground"}`}>
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Min</div>
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-bold font-mono ${isUrgent ? "text-red-600" : "text-foreground"}`}>
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-muted-foreground uppercase">Sec</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
