"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Building2, Hash } from "lucide-react"
import { useState } from "react"

export function BankDetails() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const bankDetails = {
    bankName: "Elite Auto Auctions Bank",
    accountName: "Elite Auto Auctions LLC",
    accountNumber: "1234567890",
    routingNumber: "021000021",
    swiftCode: "EAABUS33",
    reference: "DEPOSIT-{USER_ID}-{CAR_ID}",
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-primary" />
          <span>Bank Transfer Details</span>
        </CardTitle>
        <CardDescription>
          Use these details to make your deposit via bank transfer. Include the reference number to ensure proper
          processing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent rounded-md">
              <span className="font-mono text-sm text-accent-foreground">{bankDetails.reference}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(bankDetails.reference, "reference")}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-accent/5 border border-accent/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Hash className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium text-accent-foreground">Important: Include Reference Number</p>
              <p className="text-sm text-muted-foreground mt-1">
                Always include the reference number in your transfer description to ensure your deposit is processed
                correctly and linked to your account.
              </p>
            </div>
          </div>
        </div>

        {copiedField && (
          <div className="text-center">
            <span className="text-sm text-green-600 font-medium">Copied to clipboard!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
