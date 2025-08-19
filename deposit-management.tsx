"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Eye, Download, Search, Filter } from "lucide-react"

interface Deposit {
  id: string
  user: {
    name: string
    email: string
  }
  car: {
    name: string
    id: string
  }
  amount: number
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  referenceNumber: string
  proofFiles: string[]
  notes?: string
}

const mockDeposits: Deposit[] = [
  {
    id: "1",
    user: { name: "John Doe", email: "john@example.com" },
    car: { name: "2022 Porsche 911 GT3", id: "car1" },
    amount: 5000,
    status: "pending",
    submittedAt: "2025-01-15T10:30:00Z",
    referenceNumber: "DEPOSIT-USER123-CAR001",
    proofFiles: ["receipt1.pdf", "bank_statement.png"],
  },
  {
    id: "2",
    user: { name: "Sarah Smith", email: "sarah@example.com" },
    car: { name: "2021 Ferrari F8 Tributo", id: "car2" },
    amount: 5000,
    status: "approved",
    submittedAt: "2025-01-14T15:20:00Z",
    referenceNumber: "DEPOSIT-USER456-CAR002",
    proofFiles: ["wire_receipt.pdf"],
    notes: "Verified wire transfer",
  },
  {
    id: "3",
    user: { name: "Mike Johnson", email: "mike@example.com" },
    car: { name: "2020 McLaren 720S", id: "car3" },
    amount: 5000,
    status: "rejected",
    submittedAt: "2025-01-13T09:15:00Z",
    referenceNumber: "DEPOSIT-USER789-CAR003",
    proofFiles: ["receipt.jpg"],
    notes: "Insufficient proof of payment",
  },
]

export function DepositManagement() {
  const [deposits, setDeposits] = useState(mockDeposits)
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  const handleApprove = (depositId: string) => {
    setDeposits((prev) =>
      prev.map((deposit) => (deposit.id === depositId ? { ...deposit, status: "approved" as const } : deposit)),
    )
    console.log("[v0] Deposit approved:", depositId)
  }

  const handleReject = (depositId: string) => {
    setDeposits((prev) =>
      prev.map((deposit) => (deposit.id === depositId ? { ...deposit, status: "rejected" as const } : deposit)),
    )
    console.log("[v0] Deposit rejected:", depositId, "Notes:", reviewNotes)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const pendingCount = deposits.filter((d) => d.status === "pending").length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Management</CardTitle>
        <CardDescription>Review and approve user deposits. {pendingCount} deposits pending review.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search deposits..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Deposits List */}
        <div className="space-y-4">
          {deposits.map((deposit) => (
            <Card key={deposit.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{deposit.user.name}</h4>
                    <p className="text-sm text-muted-foreground">{deposit.user.email}</p>
                  </div>
                  <Badge className={`${getStatusColor(deposit.status)} border`}>
                    {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Car</p>
                    <p className="font-medium">{deposit.car.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">{formatPrice(deposit.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <p className="font-medium font-mono text-sm">{deposit.referenceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium">{formatDate(deposit.submittedAt)}</p>
                  </div>
                </div>

                {deposit.notes && (
                  <div className="mb-4 p-3 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm">{deposit.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{deposit.proofFiles.length} file(s) uploaded</span>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedDeposit(deposit)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Deposit</DialogTitle>
                          <DialogDescription>Review deposit details and proof of payment</DialogDescription>
                        </DialogHeader>
                        {selectedDeposit && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">User</p>
                                <p className="font-medium">{selectedDeposit.user.name}</p>
                                <p className="text-sm text-muted-foreground">{selectedDeposit.user.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Amount</p>
                                <p className="font-medium">{formatPrice(selectedDeposit.amount)}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Proof Files</p>
                              <div className="space-y-2">
                                {selectedDeposit.proofFiles.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                                    <span className="text-sm">{file}</span>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Review Notes</label>
                              <Textarea
                                placeholder="Add notes about this deposit review..."
                                value={reviewNotes}
                                onChange={(e) => setReviewNotes(e.target.value)}
                                className="mt-1"
                              />
                            </div>

                            {selectedDeposit.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button onClick={() => handleApprove(selectedDeposit.id)} className="flex-1">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve Deposit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleReject(selectedDeposit.id)}
                                  className="flex-1"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject Deposit
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {deposit.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => handleApprove(deposit.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleReject(deposit.id)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
