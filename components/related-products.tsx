"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getRelatedProducts, type Product } from "@/lib/db"

interface RelatedProductsProps {
  productId: string
  category: string
}

export function RelatedProducts({ productId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        setLoading(true)
        const relatedProducts = await getRelatedProducts(productId, category, 4)
        setProducts(relatedProducts)
      } catch (err) {
        console.error("Error loading related products:", err)
        setError("Failed to load related products.")
      } finally {
        setLoading(false)
      }
    }

    if (productId && category) {
      loadRelatedProducts()
    }
  }, [productId, category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-4" />
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
    return null // Hide the section if there's an error
  }

  if (products.length === 0) {
    return null // Hide the section if no related products
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-1">
              <h3 className="font-semibold">{product.name}</h3>
            </div>
            <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
