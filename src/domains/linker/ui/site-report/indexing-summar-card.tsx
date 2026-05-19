"use client";
type IndexingSummaryProps = {
  indexed: number;
  total: number;
};

export function IndexingSummary({ indexed, total }: IndexingSummaryProps) {
  const percentage = (indexed / total) * 100;

  return (
    <div className="flex items-center justify-between p-4 bg-blue-50">
      <div>
        <p className="text-sm font-medium text-gray-700">Indexed Pages</p>
        <p className="text-2xl font-bold text-blue-600">{indexed.toLocaleString()}</p>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-600">of {total.toLocaleString()}</p>
        <p className="text-lg font-semibold text-blue-600">{percentage.toFixed(1)}%</p>
      </div>
    </div>
  );
}

type IndexingStatBoxProps = {
  label: string;
  value: string | number;
};

export function IndexingStatBox({ label, value }: IndexingStatBoxProps) {
  return (
    <div className="p-3 border">
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
