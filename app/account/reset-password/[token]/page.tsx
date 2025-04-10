import { AuthLayout } from "@/components/auth/auth-layout"
import { PasswordResetForm } from "@/components/auth/password-reset-form"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  return (
    <AuthLayout title="Reset your password" subtitle="Create a new password for your account">
      <PasswordResetForm token={params.token} />
    </AuthLayout>
  )
}
