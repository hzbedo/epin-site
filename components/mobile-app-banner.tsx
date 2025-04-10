import Image from "next/image"
import Link from "next/link"
import { Apple, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function MobileAppBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="container px-6 py-8 md:py-12 md:px-10 flex flex-col md:flex-row items-center">
        <div className="relative z-10 max-w-lg text-white md:w-1/2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Get Our Mobile App</h2>
          <p className="mt-4 text-lg text-white/90">
            Shop for digital codes on the go. Get instant notifications when your codes are delivered.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" className="gap-2">
              <Apple className="h-5 w-5" />
              App Store
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 gap-2">
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
                <path d="m3 16 5 3 5-3" />
                <path d="m3 12 5 3 5-3" />
                <path d="m3 8 5 3 5-3" />
                <path d="m13 16 5 3 5-3" />
                <path d="m13 12 5 3 5-3" />
                <path d="m13 8 5 3 5-3" />
              </svg>
              Google Play
            </Button>
            <Link href="/app" className="flex items-center text-sm font-medium text-white underline">
              Learn more
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-96">
            <div className="absolute inset-0 bg-black/20 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-black/20 rounded-3xl transform -rotate-3"></div>
            <div className="relative bg-black rounded-3xl overflow-hidden w-full h-full border-4 border-white/20">
              <div className="h-8 bg-black flex items-center justify-center">
                <div className="w-20 h-4 bg-white/20 rounded-full"></div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=250"
                alt="Mobile App Screenshot"
                width={250}
                height={400}
                className="w-full h-[calc(100%-32px)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
