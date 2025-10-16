"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  BarChart3, 
  Download, 
  Filter, 
  Search,
  Eye,
  Mail,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - in a real app, this would come from your database
const mockDonors = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1-555-0123",
    totalDonations: 2500,
    lastDonation: "2024-01-15",
    donationCount: 5,
    status: "Active"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com", 
    phone: "+1-555-0456",
    totalDonations: 1800,
    lastDonation: "2024-01-10",
    donationCount: 3,
    status: "Active"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1-555-0789",
    totalDonations: 5000,
    lastDonation: "2023-12-20",
    donationCount: 8,
    status: "Active"
  }
]

const mockRequests = [
  {
    id: 1,
    name: "Emily Davis",
    email: "emily@example.com",
    type: "Direct Sponsorship",
    date: "2024-01-20",
    status: "Pending",
    amount: 2000,
    academicLevel: "Undergraduate"
  },
  {
    id: 2,
    name: "David Wilson",
    email: "david@example.com",
    type: "Scholarship Help",
    date: "2024-01-18",
    status: "Replied",
    amount: 0,
    academicLevel: "High School"
  },
  {
    id: 3,
    name: "Lisa Garcia",
    email: "lisa@example.com",
    type: "Direct Sponsorship",
    date: "2024-01-15",
    status: "Pending",
    amount: 1500,
    academicLevel: "Graduate"
  }
]

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [donors, setDonors] = useState(mockDonors)
  const [requests, setRequests] = useState(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Check if already authenticated (in a real app, use proper session management)
    const authStatus = sessionStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "1234") {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
    } else {
      alert("Incorrect password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setPassword("")
  }

  const updateRequestStatus = (id: number, status: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ))
  }

  const exportDonorsCSV = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Total Donations", "Last Donation", "Donation Count", "Status"],
      ...donors.map(donor => [
        donor.name,
        donor.email,
        donor.phone,
        donor.totalDonations,
        donor.lastDonation,
        donor.donationCount,
        donor.status
      ])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "donors-report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportRequestsCSV = () => {
    const csvContent = [
      ["Name", "Email", "Type", "Date", "Status", "Amount", "Academic Level"],
      ...requests.map(req => [
        req.name,
        req.email,
        req.type,
        req.date,
        req.status,
        req.amount,
        req.academicLevel
      ])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "requests-report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || donor.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || request.type === filterType
    return matchesSearch && matchesType
  })

  const totalDonations = donors.reduce((sum, donor) => sum + donor.totalDonations, 0)
  const totalRequests = requests.length
  const pendingRequests = requests.filter(req => req.status === "Pending").length

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Enter password to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Chiyembekezo Scholar Foundation</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold">${totalDonations.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donors</p>
                  <p className="text-2xl font-bold">{donors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold">{totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold">{pendingRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="donors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donors">Donor Management</TabsTrigger>
            <TabsTrigger value="requests">Request Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Donor Management */}
          <TabsContent value="donors" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Donor Management</CardTitle>
                    <CardDescription>View and manage all donor information</CardDescription>
                  </div>
                  <Button onClick={exportDonorsCSV} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search donors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Total Donations</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell className="font-medium">{donor.name}</TableCell>
                        <TableCell>{donor.email}</TableCell>
                        <TableCell>{donor.phone}</TableCell>
                        <TableCell>${donor.totalDonations.toLocaleString()}</TableCell>
                        <TableCell>{donor.lastDonation}</TableCell>
                        <TableCell>{donor.donationCount}</TableCell>
                        <TableCell>
                          <Badge variant={donor.status === "Active" ? "default" : "secondary"}>
                            {donor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Request Management */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Request Management</CardTitle>
                    <CardDescription>Manage scholarship and sponsorship requests</CardDescription>
                  </div>
                  <Button onClick={exportRequestsCSV} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Direct Sponsorship">Direct Sponsorship</SelectItem>
                      <SelectItem value="Scholarship Help">Scholarship Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Academic Level</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.academicLevel}</TableCell>
                        <TableCell>
                          {request.amount > 0 ? `$${request.amount.toLocaleString()}` : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={request.status === "Replied" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, "Replied")}
                              disabled={request.status === "Replied"}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">Donation trends chart would go here</p>
                    <p className="text-sm text-gray-500 mt-2">Integration with charting library needed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Request Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Direct Sponsorship</span>
                      <span>{requests.filter(r => r.type === "Direct Sponsorship").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scholarship Help</span>
                      <span>{requests.filter(r => r.type === "Scholarship Help").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
