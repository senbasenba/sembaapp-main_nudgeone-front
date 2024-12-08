"use client"
import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Star } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// サンプルデータ
const properties = [
  { 
    id: 1, 
    location: "THE RESIDENCE MUROMI by Nudgeone.", 
    rating: 5.0, 
    price: "¥280,000",
    images: [
      "/Nudgeone_1.webp",
      "/Nudgeone_2.webp",
    ]
  },
  { 
    id: 2, 
    location: "Nudgeone.香椎", 
    rating: 4.8, 
    price: "¥80,000",
    images: [
      "/Nudgeone_3.jpg",
      "/Nudgeone_4.jpg",
    ]
  },
  { 
    id: 3, 
    location: "NDG 福大通り by Nudgeone", 
    rating: 4.9, 
    price: "¥50,000",
    images: [
      "/Nudgeone_5.jpg",
      "/Nudgeone_6.jpg",
      "/Nudgeone_7.jpg"
    ]
  },
]

// PropertyCardの型定義
type Property = {
  id: number
  location: string
  rating: number
  price: string
  date: string
  images: string[]
}

export default function Component() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground text-sm p-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Travel App. All rights reserved.</p>
          <nav className="mt-2 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li><a href="#" className="hover:underline">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:underline">利用規約</a></li>
              <li><a href="#" className="hover:underline">お問い合わせ</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function PropertyCard({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation() // イベントの伝播を停止
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation() // イベントの伝播を停止
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    )
  }

  const handleCardClick = () => {
    router.push(`/date_selection?propertyId=${property.id}`)
  }

  return (
    <Card 
      className="overflow-hidden border-0 shadow-none cursor-pointer hover:opacity-95 transition-opacity"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={property.images[currentImageIndex]}
          fill
          alt={`${property.location}の景色 ${currentImageIndex + 1}`}
          className="object-cover rounded-lg"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full"
          onClick={prevImage}
          aria-label="前の画像"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full"
          onClick={nextImage}
          aria-label="次の画像"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{property.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{property.date}</span>
          </div>
          <span className="font-medium text-foreground">{property.price} / 1weekstay</span>
        </div>
      </div>
    </Card>
  )
}