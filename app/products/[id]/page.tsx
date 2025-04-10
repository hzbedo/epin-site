"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, ShieldCheck, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"
import { getProduct, subscribeToProduct, type Product } from "@/lib/db"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDenomination, setSelectedDenomination] = useState<number | null>(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const productData = await getProduct(params.id)

        if (productData) {
          setProduct(productData)
          // Set default denomination if available
          if (productData.denominations && productData.denominations.length > 0) {
            setSelectedDenomination(productData.denominations[0])
          }
        } else {
          setError("Product not found")
        }
      } catch (err) {
        console.error("Error loading product:", err)
        setError("Failed to load product details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()

    // Subscribe to real-time updates
    const unsubscribe = subscribeToProduct(params.id, (updatedProduct) => {
      if (updatedProduct) {
        setProduct(updatedProduct)
      }
    })

    return () => unsubscribe()
  }, [params.id])

  const handleDenominationSelect = (value: number) => {
    setSelectedDenomination(value)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6 md:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-md" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <Skeleton className="h-10 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Separator />
                <div>
                  <Skeleton className="h-6 w-1/3 mb-4" />
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-10 w-20" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-24" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-32" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-destructive mb-4">{error}</h2>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          ) : product ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.popular && (
                      <Badge variant="default" className="absolute top-4 right-4 bg-primary">
                        Popular
                      </Badge>
                    )}
                  </div>
                  {product.additionalImages && product.additionalImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {product.additionalImages.map((img, i) => (
                        <div key={i} className="aspect-square overflow-hidden rounded-md border bg-muted">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${product.name} view ${i + 1}`}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{product.name}</h1>
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-primary text-primary" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviewCount || 0})</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-lg text-muted-foreground">{product.description}</p>
                  </div>
                  <Separator />
                  <div>
                    {product.denominations && product.denominations.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-lg font-medium mb-2">Select Denomination</h2>
                        <div className="flex flex-wrap gap-2">
                          {product.denominations.map((value) => (
                            <Button
                              key={value}
                              variant={value === selectedDenomination ? "default" : "outline"}
                              className="min-w-[80px]"
                              onClick={() => handleDenominationSelect(value)}
                            >
                              ${value}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">${(selectedDenomination || product.price).toFixed(2)}</div>
                      <div className="flex items-center gap-2">
                        <Button size="lg" className="px-8">
                          Add to Cart
                        </Button>
                        <Link href="/checkout">
                          <Button size="lg" variant="secondary">
                            Buy Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      Instant delivery via email
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      Secure payment processing
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      100% satisfaction guarantee
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium">Earn Loyalty Points</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Purchase this product and earn {Math.floor(selectedDenomination || product.price)} loyalty points,
                      which can be redeemed for discounts on future purchases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Tabs defaultValue="description">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                    <TabsTrigger
                      value="description"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-10"
                    >
                      Description
                    </TabsTrigger>
                    {product.howToUse && product.howToUse.length > 0 && (
                      <TabsTrigger
                        value="how-to-use"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-10"
                      >
                        How to Use
                      </TabsTrigger>
                    )}
                    <TabsTrigger
                      value="reviews"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-10"
                    >
                      Reviews
                    </TabsTrigger>
                    {product.faqs && product.faqs.length > 0 && (
                      <TabsTrigger
                        value="faq"
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-10"
                      >
                        FAQ
                      </TabsTrigger>
                    )}
                  </TabsList>
                  <TabsContent value="description" className="pt-6">
                    <p className="text-lg">{product.longDescription || product.description}</p>
                  </TabsContent>
                  {product.howToUse && product.howToUse.length > 0 && (
                    <TabsContent value="how-to-use" className="pt-6">
                      <ol className="list-decimal pl-5 space-y-2">
                        {product.howToUse.map((step, index) => (
                          <li key={index} className="text-lg">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </TabsContent>
                  )}
                  <TabsContent value="reviews" className="pt-6">
                    <ProductReviews productId={params.id} />
                  </TabsContent>
                  {product.faqs && product.faqs.length > 0 && (
                    <TabsContent value="faq" className="pt-6">
                      <div className="space-y-6">
                        {product.faqs.map((faq, index) => (
                          <div key={index}>
                            <h3 className="text-lg font-medium">{faq.question}</h3>
                            <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <RelatedProducts productId={params.id} category={product.category} />
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  )
}
