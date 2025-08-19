"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Building2, Clock, AlertTriangle } from "lucide-react"
import { useState } from "react"

interface WireInstructionsProps {
  payment: {
    id: string
    amount: number
    deadline: string
    reference: string
  }
}

export function WireInstructions({ payment }: WireInstructionsProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const bankDetails = {
    bankName: "Elite Auto Auctions Bank",
    accountName: "Elite Auto Auctions LLC - Escrow",
    accountNumber: "9876543210",
    routingNumber: "021000021",
    swiftCode: "EAABUS33",
    address: "123 Banking Street, Beverly Hills, CA 90210",
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

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

  return (
    <div className="space-y-6">
      {/* Deadline Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Payment Due</p>
              <p className="text-sm text-yellow-700">
                Wire transfer must be completed by {formatDate(payment.deadline)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wire Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span>Wire Transfer Instructions</span>
          </CardTitle>
          <CardDescription>Send exactly {formatPrice(payment.amount)} to complete your purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="font-mono text-sm">{bankDetails.bankName}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.bankName, "bankName")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Account Name</label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="font-mono text-sm">{bankDetails.accountName}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountName, "accountName")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Account Number</label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="font-mono text-sm">{bankDetails.accountNumber}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.accountNumber, "accountNumber")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Routing Number</label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="font-mono text-sm">{bankDetails.routingNumber}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.routingNumber, "routingNumber")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">SWIFT Code</label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="font-mono text-sm">{bankDetails.swiftCode}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(bankDetails.swiftCode, "swiftCode")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Reference Number</label>
              <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-md">
                <span className="font-mono text-sm text-primary">{payment.reference}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(payment.reference, "reference")}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Bank Address</label>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <span className="text-sm">{bankDetails.address}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(bankDetails.address, "address")}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {copiedField && (
            <div className="text-center">
              <Badge variant="outline" className="text-green-600 border-green-200">
                Copied to clipboard!
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Important Instructions</p>
              <ul className="text-sm text-red-700 mt-1 space-y-1">
                <li>• Wire exactly {formatPrice(payment.amount)} - no more, no less</li>
                <li>• Include reference number {payment.reference} in wire description</li>
                <li>• Payment must be received by {formatDate(payment.deadline)}</li>
                <li>• Contact us immediately after sending the wire transfer</li>
                <li>• Keep your wire transfer receipt for records</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
