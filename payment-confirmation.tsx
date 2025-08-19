import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Mail, Calendar, MapPin } from "lucide-react"

interface PaymentConfirmationProps {
  payment: {
    id: string
    method: string
    amount: number
    status: "completed" | "pending" | "processing"
    completedAt?: string
    car: {
      make: string
      model: string
      year: number
    }
    pickupLocation: string
    pickupDeadline: string
  }
}

export function PaymentConfirmation({ payment }: PaymentConfirmationProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Payment Completed"
      case "processing":
        return "Processing Payment"
      default:
        return "Payment Pending"
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-green-900">
                {payment.status === "completed" ? "Payment Successful!" : "Payment Initiated"}
              </h2>
              <p className="text-green-700">
                {payment.status === "completed"
                  ? "Your payment has been processed successfully."
                  : "Your payment is being processed."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Transaction #{payment.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Vehicle</p>
              <p className="font-medium">
                {payment.car.year} {payment.car.make} {payment.car.model}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="font-medium">{formatPrice(payment.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium capitalize">{payment.method.replace("_", " ")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={`${getStatusColor(payment.status)} border`}>{getStatusText(payment.status)}</Badge>
            </div>
          </div>

          {payment.completedAt && (
            <div>
              <p className="text-sm text-muted-foreground">Completed At</p>
              <p className="font-medium">{formatDate(payment.completedAt)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <div>
                <p className="font-medium">Vehicle Inspection</p>
                <p className="text-sm text-muted-foreground">
                  Schedule a final inspection of your vehicle before pickup
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <div>
                <p className="font-medium">Arrange Transportation</p>
                <p className="text-sm text-muted-foreground">Coordinate vehicle pickup or delivery arrangements</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <div>
                <p className="font-medium">Complete Transfer</p>
                <p className="text-sm text-muted-foreground">Finalize title transfer and registration documents</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-accent-foreground">Pickup Information</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Location:</strong> {payment.pickupLocation}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Deadline:</strong> {formatDate(payment.pickupDeadline)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Mail className="h-4 w-4 mr-2" />
          Email Receipt
        </Button>
      </div>
    </div>
  )
}
