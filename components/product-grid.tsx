"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getProductsByCategory, type Product } from "@/lib/db"

interface ProductGridProps {
  category: string
}

export function ProductGrid({ category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const categoryProducts = await getProductsByCategory(category, 6)
        setProducts(categoryProducts)
      } catch (err) {
        console.error(`Error loading products for category ${category}:`, err)
        setError(`Failed to load products. Please try again later.`)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square relative">
              <Skeleton className="absolute inset-0" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products available in this category at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg?height=200&width=200"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {product.popular && (
                <Badge variant="default" className="bg-primary">
                  Popular
                </Badge>
              )}
              {product.sale && <Badge variant="destructive">Sale</Badge>}
            </div>
          </div>
          <CardContent className="p-4">
            <div className="space-y-1">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            <div className="mt-2 flex items-center">
              <div className="font-semibold">${product.price.toFixed(2)}</div>
              {product.sale && product.originalPrice && (
                <div className="ml-2 text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button asChild className="w-full">
              <Link href={`/products/${product.id}`}>Buy Now</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
