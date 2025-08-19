import { CarCard } from "@/components/car/car-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const currentAuctionCars = [
  {
    id: "1",
    make: "Toyota",
    model: "Hilux 2.8 GD-6",
    year: 2022,
    mileage: 45000,
    currentBid: 485000,
    reservePrice: 520000,
    timeLeft: "2d 14h",
    images: ["/sa-toyota-hilux-white.png"],
    status: "active" as const,
    featured: true,
  },
  {
    id: "2",
    make: "BMW",
    model: "320i M Sport",
    year: 2021,
    mileage: 32000,
    currentBid: 425000,
    reservePrice: 450000,
    timeLeft: "2d 14h",
    images: ["/sa-bmw-320i-blue.png"],
    status: "active" as const,
  },
  {
    id: "3",
    make: "Volkswagen",
    model: "Polo GTI",
    year: 2023,
    mileage: 18000,
    currentBid: 385000,
    reservePrice: 410000,
    timeLeft: "2d 14h",
    images: ["/sa-vw-polo-gti-red.png"],
    status: "active" as const,
  },
  {
    id: "4",
    make: "Ford",
    model: "Ranger Wildtrak",
    year: 2022,
    mileage: 28000,
    currentBid: 565000,
    reservePrice: 590000,
    timeLeft: "2d 14h",
    images: ["/sa-ford-ranger-orange.png"],
    status: "active" as const,
  },
  {
    id: "5",
    make: "Audi",
    model: "A3 Sportback",
    year: 2023,
    mileage: 15000,
    currentBid: 445000,
    reservePrice: 470000,
    timeLeft: "2d 14h",
    images: ["/sa-audi-a3-silver.png"],
    status: "active" as const,
  },
]

export function CurrentAuction() {
  return (
    <section className="py-20 bg-gradient-to-br from-stone-50 via-slate-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge
            variant="outline"
            className="text-sm px-4 py-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white border-0"
          >
            <Calendar className="h-4 w-4 mr-2" />
            January 2025 Auction
          </Badge>

          <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-emerald-700 to-amber-700 bg-clip-text text-transparent">
            Current Monthly Selection
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five exceptional South African vehicles carefully selected for this month's auction. Bidding ends in 2 days,
            14 hours.
          </p>

          <div className="flex items-center justify-center space-x-2 text-primary bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="text-xl font-bold font-mono bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              2d 14h 23m 45s
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentAuctionCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="px-8 bg-gradient-to-r from-emerald-700 to-amber-700 hover:from-emerald-800 hover:to-amber-800 text-white shadow-lg"
          >
            View All Auction Details
          </Button>
        </div>
      </div>
    </section>
  )
}
