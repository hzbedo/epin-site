"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Gamepad2, Gift, TrendingUp, Zap, Star, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CategoryNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b bg-background">
      <div className="container flex h-12 items-center">
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 h-12 rounded-none border-b-2 border-transparent hover:border-primary"
              >
                <Gamepad2 className="h-4 w-4" />
                Game Credits
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/products/category/roblox">Roblox</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/fortnite">Fortnite</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/minecraft">Minecraft</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/wow">World of Warcraft</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/cod">Call of Duty</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/apex">Apex Legends</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 h-12 rounded-none border-b-2 border-transparent hover:border-primary"
              >
                <Gift className="h-4 w-4" />
                Gift Cards
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/products/category/steam">Steam</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/nintendo">Nintendo</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/xbox">Xbox</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/playstation">PlayStation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/google-play">Google Play</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/apple">Apple</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 h-12 rounded-none border-b-2 border-transparent hover:border-primary"
              >
                <TrendingUp className="h-4 w-4" />
                Subscriptions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/products/category/ps-plus">PlayStation Plus</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/xbox-game-pass">Xbox Game Pass</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/nintendo-online">Nintendo Switch Online</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/ea-play">EA Play</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/discord-nitro">Discord Nitro</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/category/ubisoft-plus">Ubisoft+</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/deals"
            className="flex items-center gap-1 h-12 rounded-none border-b-2 border-transparent hover:border-primary text-sm font-medium"
          >
            <Tag className="h-4 w-4" />
            Deals
          </Link>
          <Link
            href="/new-releases"
            className="flex items-center gap-1 h-12 rounded-none border-b-2 border-transparent hover:border-primary text-sm font-medium"
          >
            <Zap className="h-4 w-4" />
            New Releases
          </Link>
          <Link
            href="/top-sellers"
            className="flex items-center gap-1 h-12 rounded-none border-b-2 border-transparent hover:border-primary text-sm font-medium"
          >
            <Star className="h-4 w-4" />
            Top Sellers
          </Link>
        </nav>
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          Categories
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
        {isOpen && (
          <div className="absolute top-[112px] left-0 right-0 z-50 bg-background border-b md:hidden">
            <div className="container py-4 grid grid-cols-2 gap-4">
              <Link
                href="/products/category/game-credits"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <Gamepad2 className="h-4 w-4" />
                Game Credits
              </Link>
              <Link
                href="/products/category/gift-cards"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <Gift className="h-4 w-4" />
                Gift Cards
              </Link>
              <Link
                href="/products/category/subscriptions"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <TrendingUp className="h-4 w-4" />
                Subscriptions
              </Link>
              <Link
                href="/deals"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <Tag className="h-4 w-4" />
                Deals
              </Link>
              <Link
                href="/new-releases"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <Zap className="h-4 w-4" />
                New Releases
              </Link>
              <Link
                href="/top-sellers"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <Star className="h-4 w-4" />
                Top Sellers
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
