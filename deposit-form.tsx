"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "./file-upload"
import { DollarSign, Calendar, MessageSquare } from "lucide-react"

interface DepositFormProps {
  carId?: string
  requiredAmount?: number
}

export function DepositForm({ carId, requiredAmount = 5000 }: DepositFormProps) {
  const [formData, setFormData] = useState({
    amount: requiredAmount.toString(),
    transferDate: "",
    transferMethod: "",
    referenceNumber: "",
    notes: "",
  })
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Deposit submission:", { formData, files })

    if (files.length === 0) {
      alert("Please upload proof of payment")
      return
    }

    // TODO: Implement actual deposit submission logic
    alert("Deposit submitted successfully! We'll review your payment proof within 24 hours.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <span>Submit Deposit</span>
        </CardTitle>
        <CardDescription>
          Complete your deposit by uploading proof of your bank transfer. Required deposit: $
          {requiredAmount.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Transfer Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                required
                min={requiredAmount}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferDate">Transfer Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="transferDate"
                  type="date"
                  className="pl-10"
                  value={formData.transferDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, transferDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferMethod">Transfer Method</Label>
              <Select
                value={formData.transferMethod}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, transferMethod: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transfer method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wire">Wire Transfer</SelectItem>
                  <SelectItem value="ach">ACH Transfer</SelectItem>
                  <SelectItem value="online">Online Banking</SelectItem>
                  <SelectItem value="mobile">Mobile Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                placeholder="DEPOSIT-{USER_ID}-{CAR_ID}"
                value={formData.referenceNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, referenceNumber: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="notes"
                placeholder="Any additional information about your transfer..."
                className="pl-10"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          <FileUpload onFilesChange={setFiles} maxFiles={3} />

          <Button type="submit" className="w-full" size="lg">
            Submit Deposit for Review
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
