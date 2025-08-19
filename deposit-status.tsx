import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, Download } from "lucide-react"

interface Deposit {
  id: string
  amount: number
  status: "pending" | "approved" | "rejected" | "processing"
  submittedAt: string
  reviewedAt?: string
  carId: string
  carName: string
  referenceNumber: string
  notes?: string
}

interface DepositStatusProps {
  deposits: Deposit[]
}

export function DepositStatus({ deposits }: DepositStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "processing":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
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

  if (deposits.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Deposits Yet</h3>
          <p className="text-muted-foreground">
            Your deposit history will appear here once you submit your first deposit.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Deposit History</h3>
        <Badge variant="outline">{deposits.length} deposits</Badge>
      </div>

      {deposits.map((deposit) => (
        <Card key={deposit.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{deposit.carName}</CardTitle>
              <Badge className={`${getStatusColor(deposit.status)} border`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(deposit.status)}
                  <span className="capitalize">{deposit.status}</span>
                </div>
              </Badge>
            </div>
            <CardDescription>Reference: {deposit.referenceNumber}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-semibold">${deposit.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="font-medium">{formatDate(deposit.submittedAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {deposit.status === "approved" || deposit.status === "rejected" ? "Reviewed" : "Status"}
                </p>
                <p className="font-medium">{deposit.reviewedAt ? formatDate(deposit.reviewedAt) : "Under Review"}</p>
              </div>
            </div>

            {deposit.notes && (
              <div className="mb-4 p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                <p className="text-sm">{deposit.notes}</p>
              </div>
            )}

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
