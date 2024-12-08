'use client'

import { useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { CalendarIcon, MapPin, Star, Users, Bed, Bath, Wifi, CookingPotIcon as Kitchen, Car, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function PropertyDetail() {
  const [date, setDate] = useState<{ from: Date; to: Date } | undefined>()
  const [guests, setGuests] = useState(1)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Mock data
  const property = {
    title: "海辺の素敵なコテージ",
    location: "沖縄県那覇市",
    rating: 4.9,
    reviews: 128,
    type: "一軒家",
    host: "Taro",
    maxGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    price: 15000,
    cleaningFee: 5000,
    description: "美しい海岸線を望む、居心地の良いコテージです。静かな環境で、リラックスした休暇を過ごすのに最適です。新しくリノベーションされた内装、モダンな設備、広々としたリビングスペースを備えています。ビーチまで徒歩5分、地元のレストランやショップにも近接しています。",
    amenities: ["Wi-Fi", "キッチン", "駐車場", "エアコン", "洗濯機", "テレビ"],
    images: [
      "/placeholder.svg?height=400&width=600&text=Main+Image",
      "/placeholder.svg?height=200&width=200&text=Image+1",
      "/placeholder.svg?height=200&width=200&text=Image+2",
      "/placeholder.svg?height=200&width=200&text=Image+3",
      "/placeholder.svg?height=200&width=200&text=Image+4",
    ]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </span>
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-1 fill-yellow-400" />
            {property.rating} ({property.reviews}件のレビュー)
          </span>
        </div>
      </div>

      {/* Main visual */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="col-span-2 row-span-2">
          <Image
            src={property.images[0]}
            alt="Main property image"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        {property.images.slice(1).map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Property image ${index + 2}`}
            width={200}
            height={200}
            className="rounded-lg object-cover w-full h-full"
          />
        ))}
      </div>
      <Button variant="outline" className="mb-6">写真をすべて見る</Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Basic information */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{property.type}</h2>
                  <p className="text-sm text-muted-foreground">ホスト: {property.host}さん</p>
                </div>
                <Image
                  src="/placeholder.svg?height=50&width=50&text=Host"
                  alt="Host avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center"><Users className="w-4 h-4 mr-1" />最大{property.maxGuests}人</span>
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1" />寝室{property.bedrooms}部屋</span>
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1" />ベッド{property.beds}台</span>
                <span className="flex items-center"><Bath className="w-4 h-4 mr-1" />バスルーム{property.bathrooms}室</span>
              </div>
            </CardContent>
          </Card>

          {/* Features and amenities */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">特徴・設備</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    {amenity === "Wi-Fi" && <Wifi className="w-5 h-5 mr-2" />}
                    {amenity === "キッチン" && <Kitchen className="w-5 h-5 mr-2" />}
                    {amenity === "駐車場" && <Car className="w-5 h-5 mr-2" />}
                    {amenity !== "Wi-Fi" && amenity !== "キッチン" && amenity !== "駐車場" && <div className="w-5 h-5 mr-2 bg-blue-100 rounded-full" />}
                    {amenity}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4">設備をすべて表示</Button>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">物件の説明</h2>
              <p className={cn("text-muted-foreground", !showFullDescription && "line-clamp-3")}>
                {property.description}
              </p>
              <Button
                variant="link"
                className="mt-2 p-0"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <>
                    閉じる
                    <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    続きを読む
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">地図</h2>
              <div className="aspect-video relative mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=600&text=Map"
                  alt="Location map"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">正確な住所は予約後にお知らせします</p>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 fill-yellow-400" />
                <span className="text-xl font-semibold">{property.rating}</span>
                <span className="text-muted-foreground">・ {property.reviews}件のレビュー</span>
              </div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="mb-4 pb-4 border-b last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40&text=User"
                      alt={`Reviewer ${index + 1}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">ゲスト{index + 1}</p>
                      <p className="text-sm text-muted-foreground">2023年6月</p>
                    </div>
                  </div>
                  <p className="text-sm">素晴らしい滞在でした。ホストの方はとても親切で、部屋も清潔でした。ロケーションも最高です。</p>
                </div>
              ))}
              <Button variant="outline">レビューをすべて見る</Button>
            </CardContent>
          </Card>
        </div>

        {/* Reservation section */}
        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold">¥{property.price.toLocaleString()}<span className="text-base font-normal"> / 泊</span></div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                  <span className="text-sm">{property.rating}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>日付を選択</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    ゲスト数
                  </label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    {[...Array(property.maxGuests)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}人
                      </option>
                    ))}
                  </select>
                </div>
                {date && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>¥{property.price.toLocaleString()} x {((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))}泊</span>
                      <span>¥{(property.price * ((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>清掃料</span>
                      <span>¥{property.cleaningFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>合計</span>
                      <span>¥{(property.price * ((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + property.cleaningFee).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">予約する</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}