"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormField {
  id: string
  label: string
  type: string
  placeholder: string
  required?: boolean
  autoComplete?: string
}

interface AuthFormProps {
  title: string
  description: string
  fields: FormField[]
  submitLabel: string
  footerText: string
  footerLink: {
    label: string
    href: string
  }
  onSubmit: (data: Record<string, string>) => Promise<void>
}

export function AuthForm({ title, description, fields, submitLabel, footerText, footerLink, onSubmit }: AuthFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    // Validate email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    // Validate password
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    // Validate password confirmation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    // Check required fields
    fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await onSubmit(formData)
      // Successful authentication would typically redirect here
    } catch (error) {
      console.error("Authentication error:", error)
      setGeneralError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (fieldId: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {generalError && (
            <Alert variant="destructive">
              <AlertDescription>{generalError}</AlertDescription>
            </Alert>
          )}

          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <div className="relative">
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type === "password" ? (showPassword[field.id] ? "text" : "password") : field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                  className={errors[field.id] ? "border-destructive" : ""}
                />
                {field.type === "password" && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility(field.id)}
                  >
                    {showPassword[field.id] ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword[field.id] ? "Hide password" : "Show password"}</span>
                  </Button>
                )}
              </div>
              {errors[field.id] && <p className="text-sm text-destructive">{errors[field.id]}</p>}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {footerText}{" "}
            <Link href={footerLink.href} className="text-primary hover:underline">
              {footerLink.label}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
