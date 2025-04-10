"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CreditCard, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { Steps } from "@/components/steps"

// Mock cart data
const cartItems = [
  {
    id: "1",
    name: "Steam Wallet Card",
    description: "$25 USD",
    price: 25.0,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const handlePaymentSubmit = () => {
    setCurrentStep(2)
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true)
      setCurrentStep(3)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ePinHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="sm">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <Steps
            steps={[
              { id: 1, name: "Payment" },
              { id: 2, name: "Processing" },
              { id: 3, name: "Complete" },
            ]}
            currentStep={currentStep}
          />
        </div>

        {currentStep === 1 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Complete your purchase securely</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4">
                      <CheckoutForm onSubmit={handlePaymentSubmit} />
                    </TabsContent>
                    <TabsContent value="paypal" className="mt-4">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Image
                          src="/placeholder.svg?height=60&width=200&text=PayPal"
                          alt="PayPal"
                          width={200}
                          height={60}
                          className="mb-4"
                        />
                        <p className="mb-6 text-center text-muted-foreground">
                          You will be redirected to PayPal to complete your purchase securely.
                        </p>
                        <Button onClick={handlePaymentSubmit}>Continue with PayPal</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="crypto" className="mt-4">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Image
                          src="/placeholder.svg?height=60&width=200&text=Crypto"
                          alt="Cryptocurrency"
                          width={200}
                          height={60}
                          className="mb-4"
                        />
                        <p className="mb-6 text-center text-muted-foreground">
                          Pay with Bitcoin, Ethereum, or other cryptocurrencies.
                        </p>
                        <Button onClick={handlePaymentSubmit}>Pay with Crypto</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Your payment information is encrypted and secure
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <OrderSummary items={cartItems} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-8 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <h2 className="text-2xl font-bold">Processing Your Payment</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Please wait while we process your payment. This will only take a moment.
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                <CardDescription>Your digital code is ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-6 text-center">
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">Your Steam Wallet Code</h3>
                  <div className="mb-4 text-2xl font-mono font-bold tracking-wider">XXXX-XXXX-XXXX-XXXX</div>
                  <Button variant="outline" className="w-full">
                    Copy Code
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="mb-2 font-medium">Order Details</h3>
                  <div className="rounded-lg border">
                    <div className="flex items-center gap-4 p-4">
                      <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Steam Wallet Card"
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Steam Wallet Card</h4>
                        <p className="text-sm text-muted-foreground">$25 USD</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4">
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$25.00</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Tax</span>
                        <span>$0.00</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between py-1 font-medium">
                        <span>Total</span>
                        <span>$25.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/dashboard">View in Dashboard</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
