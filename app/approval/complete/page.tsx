'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function CompletePage() {
  const router = useRouter()
  // ウィンドウサイズの状態を管理
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    // ウィンドウサイズを更新する関数
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // 初期サイズを設定
    updateWindowSize()

    // リサイズイベントリスナーを追加
    window.addEventListener('resize', updateWindowSize)

    // クリーンアップ関数
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* 紙吹雪エフェクト */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
      />
      <Card className="max-w-2xl mx-auto p-6">
        <div className="text-center space-y-6">
          {/* チェックマークアイコン */}
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold">予約が完了しました</h1>
          <p className="text-gray-600">
            ご予約ありがとうございます。<br />
            予約内容の確認をLineでお送りしますのでご確認ください。
          </p>
          
          {/* トップページへ戻るボタン */}
          <div className="pt-6">
            <Button
              className="bg-[#006699] text-white hover:bg-[#006699]/90"
              onClick={() => router.push('/')}
            >
              トップページへ戻る
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
