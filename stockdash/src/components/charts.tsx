import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DailyRow {
  date: string;
  close: number;
  sma50: number | null;
  sma200: number | null;
}

// Hardcoded placeholder data — replace values with real prices when ready.
// Each row is one trading day. sma50/sma200 can be null for early rows
// where there isn't enough history yet to compute the average.
const hardcodedHistory: DailyRow[] = [
  { date: '2026-05-01', close: 172.10, sma50: 168.40, sma200: 160.20 },
  { date: '2026-05-08', close: 174.55, sma50: 169.10, sma200: 160.80 },
  { date: '2026-05-15', close: 171.30, sma50: 169.60, sma200: 161.30 },
  { date: '2026-05-22', close: 175.80, sma50: 170.20, sma200: 161.90 },
  { date: '2026-05-29', close: 177.40, sma50: 171.00, sma200: 162.50 },
  { date: '2026-06-05', close: 176.20, sma50: 171.70, sma200: 163.10 },
  { date: '2026-06-12', close: 179.10, sma50: 172.50, sma200: 163.80 },
  { date: '2026-06-19', close: 180.60, sma50: 173.40, sma200: 164.40 },
  { date: '2026-06-26', close: 178.90, sma50: 174.10, sma200: 165.00 },
  { date: '2026-07-03', close: 181.20, sma50: 175.00, sma200: 165.70 },
  { date: '2026-07-10', close: 183.40, sma50: 175.90, sma200: 166.40 },
  { date: '2026-07-17', close: 182.10, sma50: 176.60, sma200: 167.00 },
  { date: '2026-07-24', close: 184.70, sma50: 177.50, sma200: 167.70 },
  { date: '2026-07-31', close: 179.30, sma50: 178.00, sma200: 168.30 },
  { date: '2026-08-07', close: 178.20, sma50: 178.20, sma200: 168.90 },
];

interface Props {
  symbol: string;
}

const StockPriceChart: React.FC<Props> = ({ symbol }: Props) => {
  return (
    <div>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
        Showing placeholder data for {symbol}
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={hardcodedHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={30} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#2a78d6" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="sma50" stroke="#eb6834" dot={false} strokeWidth={1.5} />
          <Line type="monotone" dataKey="sma200" stroke="#eda100" dot={false} strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockPriceChart;