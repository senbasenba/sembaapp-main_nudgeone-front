import { useState, useEffect } from 'react';

type AvailabilityStatus = '○' | '△' | '×';

type DateInfo = {
  date: Date;
  formatted: string;
  availability: AvailabilityStatus;
};

type DateSelectionProps = {
  onSelect: (date: Date) => void;
  onBack: () => void;
};

export default function DateSelection({ onSelect, onBack }: DateSelectionProps) {
  const [availableDates, setAvailableDates] = useState<DateInfo[]>([]);

  useEffect(() => {
    const generateWeekDates = () => {
      const dates: DateInfo[] = [];
      const startDate = new Date('2023-12-18');
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push({
          date,
          formatted: `${date.getMonth() + 1}月${date.getDate()}日 (${['日', '月', '火', '水', '木', '金', '土'][date.getDay()]})`,
          availability: ['○', '△', '×'][Math.floor(Math.random() * 3)] as AvailabilityStatus // ランダムに設定（実際のアプリケーションでは、APIやデータベースから取得する）
        });
      }
      return dates;
    };

    setAvailableDates(generateWeekDates());
  }, []);

  const getAvailabilityColor = (availability: AvailabilityStatus) => {
    switch (availability) {
      case '○': return 'text-green-600';
      case '△': return 'text-yellow-600';
      case '×': return 'text-red-600';
      default: return '';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">日付</h2>
      <div className="space-y-2">
        {availableDates.map((dateInfo) => (
          <button
            key={dateInfo.formatted}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 flex justify-between items-center"
            onClick={() => onSelect(dateInfo.date)}
            disabled={dateInfo.availability === '×'}
          >
            <span>{dateInfo.formatted}</span>
            <span className={`font-bold ${getAvailabilityColor(dateInfo.availability)}`}>
              {dateInfo.availability}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button className="px-4 py-2 border rounded-lg" onClick={onBack}>戻る</button>
        <button 
          className="px-4 py-2 bg-black text-white rounded-lg disabled:bg-gray-300" 
          onClick={() => {
            const firstAvailable = availableDates.find(d => d.availability !== '×');
            if (firstAvailable) onSelect(firstAvailable.date);
          }}
          disabled={!availableDates.some(d => d.availability !== '×')}
        >
          次へ
        </button>
      </div>
    </div>
  );
}
