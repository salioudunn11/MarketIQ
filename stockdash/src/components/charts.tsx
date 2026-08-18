import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import stockHistory from '../data/stock.json';
import React, { FC } from 'react';

// Matches your actual file: a flat array of daily rows.
// If you add a "symbol" field to each row (recommended), this type reflects that.
interface DailyRow {
  symbol: string; // add this field to your JSON, e.g. "AAPL"
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  sma20: number | null;
  sma50: number | null;
  sma200: number | null;
  rsi: number | null;
  volatility30d: number | null;
}

const typedStockHistory = stockHistory as DailyRow[];

interface Props {
  symbol: string; 
}

const StockPriceChart: React.FC<Props> = ({ symbol }: Props) => {
  // Filter the flat array down to just this stock, then take the last 90 days
  const rows = typedStockHistory
    .filter((row) => row.symbol === symbol)
    .slice(-90);

  if (rows.length === 0) {
    return <p>No price data found for {symbol}.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={rows}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} minTickGap={30} />
        <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Line type="monotone" dataKey="close" stroke="#2a78d6" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="sma50" stroke="#eb6834" dot={false} strokeWidth={1.5} />
        <Line type="monotone" dataKey="sma200" stroke="#eda100" dot={false} strokeWidth={1.5} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockPriceChart;