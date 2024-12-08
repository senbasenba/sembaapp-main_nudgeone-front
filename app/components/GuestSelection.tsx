import { useState } from 'react';

type GuestSelectionProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function GuestSelection({ onBack, onNext }: GuestSelectionProps) {
  const [guestCount, setGuestCount] = useState(1);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">ゲスト</h2>
      <p className="text-gray-600 mb-4">ご自身を含み、最大6人まで追加できます。</p>
      <div className="flex items-center justify-center space-x-8">
        <button
          className="text-2xl w-10 h-10 rounded-full border"
          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
        >
          -
        </button>
        <span className="text-3xl font-semibold">{guestCount}</span>
        <button
          className="text-2xl w-10 h-10 rounded-full border"
          onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
        >
          +
        </button>
      </div>
      <div className="mt-8 flex justify-between">
        <button className="px-4 py-2 border rounded-lg" onClick={onBack}>戻る</button>
        <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={onNext}>次へ</button>
      </div>
    </div>
  );
}