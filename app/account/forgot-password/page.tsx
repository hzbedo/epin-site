"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { AuthForm } from "@/components/auth/auth-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleForgotPassword = async (data: Record<string, string>) => {
    setIsLoading(true)

    try {
      // This is where you would integrate with your auth provider (Firebase, Clerk, etc.)
      console.log("Reset password for:", data.email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setEmailSent(true)
    } catch (error) {
      console.error("Password reset error:", error)
      throw new Error("Failed to send password reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent you a password reset link">
        <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-950/30">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-600 dark:text-green-400">
            If an account exists with that email, we've sent a password reset link.
          </AlertDescription>
        </Alert>

        <div className="text-center mt-6">
          <p className="text-muted-foreground mb-4">Didn't receive an email? Check your spam folder or try again.</p>
          <button onClick={() => router.push("/account/login")} className="text-primary hover:underline">
            Return to login
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your email to reset your password">
      <AuthForm
        title="Reset Password"
        description="Enter your email address and we'll send you a link to reset your password"
        fields={[
          {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "name@example.com",
            required: true,
            autoComplete: "email",
          },
        ]}
        submitLabel={isLoading ? "Sending Reset Link..." : "Send Reset Link"}
        footerText="Remember your password?"
        footerLink={{
          label: "Back to login",
          href: "/account/login",
        }}
        onSubmit={handleForgotPassword}
      />
    </AuthLayout>
  )
}
