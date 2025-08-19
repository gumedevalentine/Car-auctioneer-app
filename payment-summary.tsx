import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Car, DollarSign } from "lucide-react"

interface PaymentSummaryProps {
  auction: {
    car: {
      make: string
      model: string
      year: number
      images: string[]
    }
    winningBid: number
    deposit: number
    fees: {
      buyersPremium: number
      documentation: number
      transport?: number
    }
  }
}

export function PaymentSummary({ auction }: PaymentSummaryProps) {
  const { car, winningBid, deposit, fees } = auction

  const subtotal = winningBid + fees.buyersPremium + fees.documentation + (fees.transport || 0)
  const totalDue = subtotal - deposit

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Car className="h-5 w-5 text-primary" />
          <span>Payment Summary</span>
        </CardTitle>
        <CardDescription>Congratulations! You won the auction for this vehicle.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vehicle Info */}
        <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold">
              {car.year} {car.make} {car.model}
            </h3>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Auction Won
            </Badge>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium">Payment Breakdown</h4>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Winning Bid</span>
              <span className="font-medium">{formatPrice(winningBid)}</span>
            </div>

            <div className="flex justify-between">
              <span>Buyer's Premium (10%)</span>
              <span className="font-medium">{formatPrice(fees.buyersPremium)}</span>
            </div>

            <div className="flex justify-between">
              <span>Documentation Fee</span>
              <span className="font-medium">{formatPrice(fees.documentation)}</span>
            </div>

            {fees.transport && (
              <div className="flex justify-between">
                <span>Transport Fee</span>
                <span className="font-medium">{formatPrice(fees.transport)}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Deposit Applied</span>
              <span>-{formatPrice(deposit)}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Due</span>
              <span className="text-primary">{formatPrice(totalDue)}</span>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <DollarSign className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Payment Terms</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Payment due within 48 hours of auction end</li>
                <li>• Wire transfer or certified funds accepted</li>
                <li>• Vehicle pickup within 7 days of payment</li>
                <li>• All sales are final</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
