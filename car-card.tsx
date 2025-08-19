import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Heart } from "lucide-react"
import Image from "next/image"

interface CarCardProps {
  car: {
    id: string
    make: string
    model: string
    year: number
    mileage: number
    currentBid: number
    reservePrice: number
    timeLeft: string
    images: string[]
    status: "active" | "upcoming" | "sold"
    featured?: boolean
  }
}

export function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-ZA").format(mileage)
  }

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 ${
        car.featured ? "ring-2 ring-emerald-500" : ""
      } bg-gradient-to-br from-white to-slate-50/50`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.images[0] || "/placeholder.svg"}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {car.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-amber-600 text-white border-0 shadow-lg">
            Featured
          </Badge>
        )}
        <Badge
          className={`absolute top-3 right-3 shadow-lg ${
            car.status === "active"
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white"
              : car.status === "upcoming"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
          }`}
        >
          {car.status === "active" ? "Live" : car.status === "upcoming" ? "Upcoming" : "Sold"}
        </Badge>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4 text-red-500" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
            <Eye className="h-4 w-4 text-blue-500" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-semibold bg-gradient-to-r from-emerald-800 to-amber-800 bg-clip-text text-transparent">
            {car.year} {car.make} {car.model}
          </h3>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatMileage(car.mileage)} km</span>
            {car.status === "active" && (
              <div className="flex items-center space-x-1 text-primary">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="font-medium text-red-600">{car.timeLeft}</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Bid</span>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-amber-700 bg-clip-text text-transparent">
                {formatPrice(car.currentBid)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reserve</span>
              <span className="text-sm font-medium">{formatPrice(car.reservePrice)}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full transition-all duration-300 ${
            car.status === "active"
              ? "bg-gradient-to-r from-emerald-700 to-amber-700 hover:from-emerald-800 hover:to-amber-800 text-white shadow-lg"
              : ""
          }`}
          disabled={car.status === "sold"}
          variant={car.status === "active" ? "default" : "outline"}
        >
          {car.status === "active" ? "Place Bid" : car.status === "upcoming" ? "Watch Auction" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  )
}
