import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Shield, Trophy, Users } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 opacity-10 animate-pulse">
          <Image
            src="/sa-hero-cars-collage.png"
            alt="South African Cars"
            width={400}
            height={300}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-10 left-10 opacity-5 animate-bounce">
          <Image
            src="/sa-toyota-hilux-white.png"
            alt="Toyota Hilux"
            width={300}
            height={200}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge
            variant="outline"
            className="text-sm px-4 py-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white border-0 shadow-lg"
          >
            <Clock className="h-4 w-4 mr-2" />
            Next Auction: January 15th, 2025
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
            <span className="bg-gradient-to-r from-emerald-700 via-amber-700 to-orange-700 bg-clip-text text-transparent">
              South African
            </span>
            <span className="text-primary block">Car Auctions</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bid on 5 carefully curated quality vehicles each month. Secure deposits, live bidding, and guaranteed
            authenticity for serious buyers and car enthusiasts across South Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-700 to-amber-700 hover:from-emerald-800 hover:to-amber-800 text-white shadow-lg"
            >
              View Current Auction
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/80 backdrop-blur-sm border-emerald-400 text-emerald-800 hover:bg-emerald-50"
            >
              How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-blue-50/80 to-blue-100/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-blue-900">Verified Authenticity</h3>
              <p className="text-sm text-blue-700 text-center">
                Every vehicle undergoes rigorous inspection and verification
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-emerald-50/80 to-emerald-100/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-emerald-900">Quality Selection</h3>
              <p className="text-sm text-emerald-700 text-center">
                Only 5 exceptional South African vehicles featured each month
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-amber-50/80 to-amber-100/80 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-amber-900">Local Community</h3>
              <p className="text-sm text-amber-700 text-center">
                Join a trusted network of South African car enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
