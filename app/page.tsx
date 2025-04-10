import Link from "next/link"
import { ArrowRight, Gift, Gamepad2, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductGrid } from "@/components/product-grid"
import { PersonalizedSection } from "@/components/personalized-section"
import { MobileAppBanner } from "@/components/mobile-app-banner"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-6 md:py-10">
          <div className="container">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-10 md:px-10 md:py-16">
              <div className="relative z-10 max-w-lg text-white">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Instant Digital Codes for Your Favorite Games
                </h1>
                <p className="mt-4 text-lg text-white/90">
                  Get immediate access to game credits, gift cards, and more with secure, instant delivery.
                </p>
                <div className="mt-6 flex gap-4">
                  <Link href="/products">
                    <Button size="lg" variant="secondary">
                      Browse Products
                    </Button>
                  </Link>
                  <Link href="/deals">
                    <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                      Today's Deals
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform lg:block">
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-20"
                >
                  <path
                    d="M200 0C310.457 0 400 89.5431 400 200C400 310.457 310.457 400 200 400C89.5431 400 0 310.457 0 200C0 89.5431 89.5431 0 200 0Z"
                    fill="white"
                  />
                  <path
                    d="M200 40C288.366 40 360 111.634 360 200C360 288.366 288.366 360 200 360C111.634 360 40 288.366 40 200C40 111.634 111.634 40 200 40Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M200 80C266.274 80 320 133.726 320 200C320 266.274 266.274 320 200 320C133.726 320 80 266.274 80 200C80 133.726 133.726 80 200 80Z"
                    fill="white"
                    fillOpacity="0.3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
              <Link href="/products" className="flex items-center text-sm font-medium text-primary">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6">
              <FeaturedProducts />
            </div>
          </div>
        </section>

        <section className="py-8 bg-muted/50">
          <div className="container">
            <PersonalizedSection />
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Category</h2>
            <Tabs defaultValue="games" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="games" className="flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Game Credits
                </TabsTrigger>
                <TabsTrigger value="gift-cards" className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Gift Cards
                </TabsTrigger>
                <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Subscriptions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="games">
                <ProductGrid category="games" />
              </TabsContent>
              <TabsContent value="gift-cards">
                <ProductGrid category="gift-cards" />
              </TabsContent>
              <TabsContent value="subscriptions">
                <ProductGrid category="subscriptions" />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            <MobileAppBanner />
          </div>
        </section>

        <section className="py-8 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
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
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                  <p className="mt-2 text-muted-foreground">
                    Multiple payment options with bank-level security for all transactions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
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
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                  <h3 className="text-xl font-bold">Instant Delivery</h3>
                  <p className="mt-2 text-muted-foreground">
                    Receive your digital codes immediately after purchase via email and dashboard.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
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
                    className="h-10 w-10 mb-4 text-primary"
                  >
                    <path d="M12 13V2l8 4-8 4" />
                    <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
                    <path d="M8 10a5 5 0 1 0 8.9 2.02" />
                  </svg>
                  <h3 className="text-xl font-bold">Loyalty Rewards</h3>
                  <p className="mt-2 text-muted-foreground">
                    Earn points with every purchase and redeem them for discounts on future orders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium">Products</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Game Credits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Subscriptions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Special Offers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Support</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ePinHub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5\
