"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchProducts, type Product } from "@/lib/db"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsSearching(true)
        try {
          const searchResults = await searchProducts(query)
          setResults(searchResults)
          setShowResults(true)
        } catch (error) {
          console.error("Search error:", error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission if needed
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setShowResults(false)
  }

  return (
    <div className="w-full relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="w-full relative">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for games, gift cards, subscriptions..."
            className="w-full pl-10 pr-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim().length >= 2 && results.length > 0) {
                setShowResults(true)
              }
            }}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-10 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-7">
            Search
          </Button>
        </div>
      </form>

      {showResults && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
          {isSearching ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-auto py-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg?height=40&width=40"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    </div>
                    <div className="font-medium">${product.price.toFixed(2)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No products found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}
