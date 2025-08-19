"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Building2, Smartphone, Shield } from "lucide-react"

interface PaymentMethodsProps {
  totalAmount: number
  onPaymentSubmit: (method: string, details: any) => void
}

export function PaymentMethods({ totalAmount, onPaymentSubmit }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState("wire")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmit = () => {
    if (selectedMethod === "card") {
      onPaymentSubmit("card", cardDetails)
    } else {
      onPaymentSubmit(selectedMethod, {})
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <span>Payment Method</span>
        </CardTitle>
        <CardDescription>Choose your preferred payment method for {formatPrice(totalAmount)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
          {/* Wire Transfer */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="wire" id="wire" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="wire" className="font-medium">
                  Wire Transfer
                </Label>
                <Badge className="bg-green-100 text-green-800 text-xs">Recommended</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Secure bank-to-bank transfer. Instructions provided after selection.
              </p>
            </div>
          </div>

          {/* Credit Card */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="card" id="card" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="card" className="font-medium">
                  Credit Card
                </Label>
                <Badge variant="outline" className="text-xs">
                  3% Processing Fee
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Visa, Mastercard, American Express accepted</p>
            </div>
          </div>

          {/* ACH Transfer */}
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="ach" id="ach" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="ach" className="font-medium">
                  ACH Bank Transfer
                </Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Direct bank account transfer. 2-3 business days processing.
              </p>
            </div>
          </div>
        </RadioGroup>

        {/* Credit Card Form */}
        {selectedMethod === "card" && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
            <h4 className="font-medium">Card Details</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wire Transfer Instructions */}
        {selectedMethod === "wire" && (
          <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
            <h4 className="font-medium">Wire Transfer Instructions</h4>
            <p className="text-sm text-muted-foreground">
              Complete wire transfer instructions will be provided after confirming this payment method. You will have
              48 hours to complete the transfer.
            </p>
          </div>
        )}

        <Separator />

        {/* Security Notice */}
        <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
          <Shield className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Secure Payment</p>
            <p className="text-sm text-muted-foreground">
              All payments are processed securely with bank-grade encryption and fraud protection.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full" size="lg">
          {selectedMethod === "wire"
            ? "Get Wire Instructions"
            : selectedMethod === "card"
              ? `Pay ${formatPrice(totalAmount)}`
              : "Continue with ACH Transfer"}
        </Button>
      </CardContent>
    </Card>
  )
}
