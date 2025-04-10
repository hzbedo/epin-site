import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  onSnapshot,
  type DocumentData,
  startAfter,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

// Product type definition
export interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  price: number
  originalPrice?: number
  image: string
  additionalImages?: string[]
  category: string
  popular?: boolean
  sale?: boolean
  rating?: number
  reviewCount?: number
  denominations?: number[]
  howToUse?: string[]
  faqs?: {
    question: string
    answer: string
  }[]
  createdAt: Date
  updatedAt: Date
}

// Convert Firestore data to Product type
const convertProduct = (doc: DocumentData): Product => {
  const data = doc.data()
  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    longDescription: data.longDescription,
    price: data.price,
    originalPrice: data.originalPrice,
    image: data.image,
    additionalImages: data.additionalImages,
    category: data.category,
    popular: data.popular,
    sale: data.sale,
    rating: data.rating,
    reviewCount: data.reviewCount,
    denominations: data.denominations,
    howToUse: data.howToUse,
    faqs: data.faqs,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  }
}

// Get a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const productRef = doc(db, "products", id)
    const productSnap = await getDoc(productRef)

    if (productSnap.exists()) {
      return convertProduct(productSnap)
    }

    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    throw error
  }
}

// Get products by category
export async function getProductsByCategory(categoryName: string, limitCount = 6): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("category", "==", categoryName), orderBy("createdAt", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(convertProduct)
  } catch (error) {
    console.error(`Error fetching products for category ${categoryName}:`, error)
    throw error
  }
}

// Get featured products
export async function getFeaturedProducts(limitCount = 4): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("featured", "==", true), orderBy("createdAt", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(convertProduct)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    throw error
  }
}

// Get popular products
export async function getPopularProducts(limitCount = 4): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("popular", "==", true), orderBy("rating", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(convertProduct)
  } catch (error) {
    console.error("Error fetching popular products:", error)
    throw error
  }
}

// Get products on sale
export async function getSaleProducts(limitCount = 4): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("sale", "==", true), orderBy("createdAt", "desc"), limit(limitCount))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(convertProduct)
  } catch (error) {
    console.error("Error fetching sale products:", error)
    throw error
  }
}

// Get related products
export async function getRelatedProducts(productId: string, category: string, limitCount = 3): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("category", "==", category), where("id", "!=", productId), limit(limitCount))

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(convertProduct)
  } catch (error) {
    console.error("Error fetching related products:", error)
    throw error
  }
}

// Subscribe to real-time updates for a product
export function subscribeToProduct(productId: string, callback: (product: Product | null) => void): () => void {
  const productRef = doc(db, "products", productId)

  return onSnapshot(
    productRef,
    (doc) => {
      if (doc.exists()) {
        callback(convertProduct(doc))
      } else {
        callback(null)
      }
    },
    (error) => {
      console.error("Error subscribing to product:", error)
      callback(null)
    },
  )
}

// Subscribe to real-time updates for products by category
export function subscribeToProductsByCategory(
  categoryName: string,
  callback: (products: Product[]) => void,
  limitCount = 6,
): () => void {
  const productsRef = collection(db, "products")
  const q = query(productsRef, where("category", "==", categoryName), orderBy("createdAt", "desc"), limit(limitCount))

  return onSnapshot(
    q,
    (querySnapshot) => {
      const products = querySnapshot.docs.map(convertProduct)
      callback(products)
    },
    (error) => {
      console.error(`Error subscribing to products for category ${categoryName}:`, error)
      callback([])
    },
  )
}

// Pagination helper - get next batch of products
export async function getNextProductsBatch(
  categoryName: string,
  lastDoc: QueryDocumentSnapshot<DocumentData>,
  limitCount = 6,
): Promise<{ products: Product[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
  try {
    const productsRef = collection(db, "products")
    const q = query(
      productsRef,
      where("category", "==", categoryName),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(limitCount),
    )

    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map(convertProduct)
    const newLastDoc = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null

    return { products, lastDoc: newLastDoc }
  } catch (error) {
    console.error(`Error fetching next batch of products for category ${categoryName}:`, error)
    throw error
  }
}

// Search products
export async function searchProducts(searchTerm: string, limitCount = 10): Promise<Product[]> {
  try {
    // Note: Basic search implementation
    // For production, consider using Firebase Extensions like Algolia or a custom search solution
    const productsRef = collection(db, "products")
    const querySnapshot = await getDocs(productsRef)

    const allProducts = querySnapshot.docs.map(convertProduct)

    // Simple client-side filtering - in a real app, use a proper search solution
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return filteredProducts.slice(0, limitCount)
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}
