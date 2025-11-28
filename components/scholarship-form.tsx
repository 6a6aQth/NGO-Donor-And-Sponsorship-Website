"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ScholarshipFormProps {
  children: React.ReactNode
}

export function ScholarshipForm({ children }: ScholarshipFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    applicationType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    currentSchool: "",
    academicLevel: "",
    gpa: "",
    intendedMajor: "",
    financialNeed: "",
    essay: "",
    additionalInfo: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/scholarships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      // Success
      alert("Application submitted successfully! We'll review your application and get back to you soon.")
      setIsOpen(false)
      // Reset form
      setFormData({
        applicationType: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        currentSchool: "",
        academicLevel: "",
        gpa: "",
        intendedMajor: "",
        financialNeed: "",
        essay: "",
        additionalInfo: ""
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Scholarship application error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Scholarship & Sponsorship Support</DialogTitle>
          <DialogDescription className="text-center">
            We help students apply for external scholarships and provide direct sponsorships for educational support
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Application Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Application Type *</h3>
            <div>
              <Label htmlFor="applicationType">What type of support are you seeking?</Label>
              <Select value={formData.applicationType} onValueChange={(value) => handleInputChange("applicationType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select application type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scholarship-help">
                    <div className="flex flex-col">
                      <span className="font-medium">Help with External Scholarship Applications</span>
                      <span className="text-sm text-muted-foreground">We'll help you find and apply for scholarships from other organizations</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="direct-sponsorship">
                    <div className="flex flex-col">
                      <span className="font-medium">Direct Sponsorship from Chiyembekezo Scholar Foundation</span>
                      <span className="text-sm text-muted-foreground">Apply for direct financial support from our foundation</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Academic Information</h3>
            <div>
              <Label htmlFor="currentSchool">Current School/Institution *</Label>
              <Input
                id="currentSchool"
                value={formData.currentSchool}
                onChange={(e) => handleInputChange("currentSchool", e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="academicLevel">Academic Level *</Label>
                <Select value={formData.academicLevel} onValueChange={(value) => handleInputChange("academicLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gpa">Current GPA</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.gpa}
                  onChange={(e) => handleInputChange("gpa", e.target.value)}
                  placeholder="e.g., 3.5"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="intendedMajor">Intended Major/Field of Study</Label>
              <Input
                id="intendedMajor"
                value={formData.intendedMajor}
                onChange={(e) => handleInputChange("intendedMajor", e.target.value)}
                placeholder="e.g., Computer Science, Medicine, Engineering"
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Information</h3>
            <div>
              <Label htmlFor="financialNeed">Describe your financial need *</Label>
              <Textarea
                id="financialNeed"
                value={formData.financialNeed}
                onChange={(e) => handleInputChange("financialNeed", e.target.value)}
                placeholder="Please describe your current financial situation and why you need scholarship support..."
                className="min-h-[100px]"
                required
              />
            </div>
          </div>

          {/* Essay */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Statement</h3>
            <div>
              {formData.applicationType === "scholarship-help" ? (
                <>
                  <Label htmlFor="essay">Why do you need help finding and applying for scholarships? *</Label>
                  <Textarea
                    id="essay"
                    value={formData.essay}
                    onChange={(e) => handleInputChange("essay", e.target.value)}
                    placeholder="Tell us about your academic goals, what types of scholarships you're looking for, and how we can best help you in the application process..."
                    className="min-h-[120px]"
                    required
                  />
                </>
              ) : (
                <>
                  <Label htmlFor="essay">Why do you deserve direct sponsorship from Chiyembekezo Scholar Foundation? *</Label>
                  <Textarea
                    id="essay"
                    value={formData.essay}
                    onChange={(e) => handleInputChange("essay", e.target.value)}
                    placeholder="Tell us about your academic goals, achievements, financial need, and how our sponsorship will help you make a positive impact..."
                    className="min-h-[120px]"
                    required
                  />
                </>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div>
              <Label htmlFor="additionalInfo">Any additional information you'd like to share</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Extracurricular activities, volunteer work, awards, or any other relevant information..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
