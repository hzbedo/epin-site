"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { AuthForm } from "@/components/auth/auth-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Check if user just registered
    if (searchParams?.get("registered") === "true") {
      setShowSuccessMessage(true)

      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleLogin = async (data: Record<string, string>) => {
    setIsLoading(true)

    try {
      // This is where you would integrate with your auth provider (Firebase, Clerk, etc.)
      console.log("Login data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // On successful login, redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      throw new Error("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      {showSuccessMessage && (
        <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950/30">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            Account created successfully! You can now sign in.
          </AlertDescription>
        </Alert>
      )}

      <AuthForm
        title="Sign In"
        description="Enter your email and password to sign in to your account"
        fields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "name@example.com",
            required: true,
            autoComplete: "email",
          },
          {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
            required: true,
            autoComplete: "current-password",
          },
        ]}
        submitLabel={isLoading ? "Signing In..." : "Sign In"}
        footerText="Don't have an account?"
        footerLink={{
          label: "Create an account",
          href: "/account/register",
        }}
        onSubmit={handleLogin}
      />
    </AuthLayout>
  )
}
