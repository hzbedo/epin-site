"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  date: Date
  title: string
  content: string
  helpful: number
}

interface ReviewSummary {
  average: number
  total: number
  distribution: {
    stars: number
    count: number
    percentage: number
  }[]
}

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [summary, setSummary] = useState<ReviewSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true)

        // Get reviews from Firestore
        const reviewsRef = collection(db, "reviews")
        const q = query(reviewsRef, where("productId", "==", productId), orderBy("date", "desc"))

        const querySnapshot = await getDocs(q)
        const reviewsData: Review[] = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            userAvatar: data.userAvatar,
            rating: data.rating,
            date: data.date.toDate(),
            title: data.title,
            content: data.content,
            helpful: data.helpful || 0,
          }
        })

        setReviews(reviewsData)

        // Calculate summary
        if (reviewsData.length > 0) {
          const total = reviewsData.length
          const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0)
          const average = Number.parseFloat((sum / total).toFixed(1))

          // Calculate distribution
          const distribution = [5, 4, 3, 2, 1].map((stars) => {
            const count = reviewsData.filter((r) => r.rating === stars).length
            const percentage = Math.round((count / total) * 100)
            return { stars, count, percentage }
          })

          setSummary({ average, total, distribution })
        }
      } catch (error) {
        console.error("Error loading reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [productId])

  const handleHelpfulClick = async (reviewId: string) => {
    try {
      // Update in Firestore (in a real app)
      // await updateDoc(doc(db, "reviews", reviewId), {
      //   helpful: increment(1)
      // })

      // For now, just update the UI
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
      )

      setHelpfulClicked((prev) => ({ ...prev, [reviewId]: true }))
    } catch (error) {
      console.error("Error marking review as helpful:", error)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <Skeleton className="h-12 w-16 mb-2" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <div className="w-12 text-sm">{stars} stars</div>
                <Skeleton className="h-2 flex-1" />
                <div className="w-10 text-sm">0%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24 mb-1" />
                <div>
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-8 w-32" />
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">This product has no reviews yet. Be the first to leave a review!</p>
        <Button>Write a Review</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold">{summary?.average || 0}</div>
          <div className="mt-2 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(summary?.average || 0) ? "fill-primary text-primary" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">Based on {summary?.total || 0} reviews</div>
        </div>

        <div className="mt-6 space-y-2">
          {summary?.distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="w-12 text-sm">{item.stars} stars</div>
              <Progress value={item.percentage} className="h-2" />
              <div className="w-10 text-sm text-muted-foreground">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-xs text-muted-foreground">{review.date.toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>

              <div>
                <h4 className="font-medium">{review.title}</h4>
                <p className="mt-1 text-muted-foreground">{review.content}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleHelpfulClick(review.id)}
                  disabled={helpfulClicked[review.id]}
                >
                  {helpfulClicked[review.id] ? "Helpful" : "Mark as helpful"}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {helpfulClicked[review.id] ? review.helpful + 1 : review.helpful} people found this helpful
                </span>
              </div>

              <Separator className="mt-4" />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button>Load More Reviews</Button>
        </div>
      </div>
    </div>
  )
}
