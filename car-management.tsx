"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react"
import Image from "next/image"

interface Car {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  reservePrice: number
  status: "draft" | "active" | "sold" | "archived"
  images: string[]
  description: string
  specifications: {
    engine: string
    transmission: string
    drivetrain: string
    fuelType: string
  }
  createdAt: string
}

const mockCars: Car[] = [
  {
    id: "1",
    make: "Porsche",
    model: "911 GT3",
    year: 2022,
    mileage: 2500,
    reservePrice: 200000,
    status: "active",
    images: ["/placeholder-zev2n.png"],
    description: "Pristine condition 911 GT3 with track package",
    specifications: {
      engine: "4.0L Naturally Aspirated Flat-6",
      transmission: "7-Speed PDK",
      drivetrain: "RWD",
      fuelType: "Premium Gasoline",
    },
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "2",
    make: "Ferrari",
    model: "F8 Tributo",
    year: 2021,
    mileage: 1200,
    reservePrice: 290000,
    status: "active",
    images: ["/yellow-ferrari-f8-tributo.png"],
    description: "Low mileage F8 Tributo in Giallo Modena",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      transmission: "7-Speed Dual-Clutch",
      drivetrain: "RWD",
      fuelType: "Premium Gasoline",
    },
    createdAt: "2025-01-09T14:30:00Z",
  },
]

export function CarManagement() {
  const [cars, setCars] = useState(mockCars)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    reservePrice: 0,
    description: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "sold":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleAddCar = () => {
    const car: Car = {
      id: Date.now().toString(),
      ...newCar,
      status: "draft",
      images: ["/placeholder.svg"],
      specifications: {
        engine: "",
        transmission: "",
        drivetrain: "",
        fuelType: "",
      },
      createdAt: new Date().toISOString(),
    }
    setCars((prev) => [car, ...prev])
    setNewCar({
      make: "",
      model: "",
      year: new Date().getFullYear(),
      mileage: 0,
      reservePrice: 0,
      description: "",
    })
    setIsAddDialogOpen(false)
    console.log("[v0] Car added:", car)
  }

  const handleDeleteCar = (carId: string) => {
    setCars((prev) => prev.filter((car) => car.id !== carId))
    console.log("[v0] Car deleted:", carId)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Car Management</CardTitle>
            <CardDescription>Manage auction vehicles and their details</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Car
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogDescription>Enter the details for the new auction vehicle</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      value={newCar.make}
                      onChange={(e) => setNewCar((prev) => ({ ...prev, make: e.target.value }))}
                      placeholder="Porsche"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={newCar.model}
                      onChange={(e) => setNewCar((prev) => ({ ...prev, model: e.target.value }))}
                      placeholder="911 GT3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar((prev) => ({ ...prev, year: Number.parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={newCar.mileage}
                      onChange={(e) => setNewCar((prev) => ({ ...prev, mileage: Number.parseInt(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reservePrice">Reserve Price ($)</Label>
                    <Input
                      id="reservePrice"
                      type="number"
                      value={newCar.reservePrice}
                      onChange={(e) =>
                        setNewCar((prev) => ({ ...prev, reservePrice: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCar.description}
                    onChange={(e) => setNewCar((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the vehicle..."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCar}>Add Car</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search cars..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={car.images[0] || "/placeholder.svg"}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${getStatusColor(car.status)} border`}>
                  {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-semibold mb-2">
                  {car.year} {car.make} {car.model}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mileage</span>
                    <span>{car.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reserve</span>
                    <span className="font-medium">{formatPrice(car.reservePrice)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCar(car.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
