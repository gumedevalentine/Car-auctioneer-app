import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Car, Users, Gavel } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  color?: string
}

function StatsCard({ title, value, description, icon, trend, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
    green: "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white",
    purple: "bg-gradient-to-br from-purple-600 to-purple-700 text-white",
    orange: "bg-gradient-to-br from-amber-600 to-amber-700 text-white",
    red: "bg-gradient-to-br from-red-600 to-red-700 text-white",
  }

  return (
    <Card
      className={`${colorClasses[color as keyof typeof colorClasses]} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
        <div className="text-white/80">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center space-x-2 mt-1">
          <CardDescription className="text-xs text-white/70">{description}</CardDescription>
          {trend && (
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
              {trend.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {trend.value}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value="R4.8M"
        description="This month"
        icon={<DollarSign className="h-4 w-4" />}
        trend={{ value: "+12.5%", isPositive: true }}
        color="green"
      />
      <StatsCard
        title="Active Auctions"
        value="5"
        description="Currently live"
        icon={<Gavel className="h-4 w-4" />}
        color="blue"
      />
      <StatsCard
        title="Registered Users"
        value="1,247"
        description="Total users"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: "+8.2%", isPositive: true }}
        color="purple"
      />
      <StatsCard
        title="Cars Listed"
        value="23"
        description="This month"
        icon={<Car className="h-4 w-4" />}
        trend={{ value: "-2.1%", isPositive: false }}
        color="orange"
      />
    </div>
  )
}
