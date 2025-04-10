"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPopularProducts, type Product } from "@/lib/db"

export function PersonalizedSection() {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRecommendations() {
      try {
        setLoading(true)
        // In a real app, this would use user preferences or history
        // For now, we'll just use popular products as recommendations
        const popularProducts = await getPopularProducts(3)
        setRecommendations(popularProducts)
      } catch (err) {
        console.error("Error loading recommendations:", err)
        setError("Failed to load personalized recommendations.")
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Recommended for You</h2>
        <Link href="/recommendations" className="flex items-center text-sm font-medium text-primary">
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No recommendations available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((product) => (
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
                  <p className="text-sm text-muted-foreground">Based on your preferences</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-semibold">${product.price.toFixed(2)}</div>
                  <Button asChild size="sm">
                    <Link href={`/products/${product.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
