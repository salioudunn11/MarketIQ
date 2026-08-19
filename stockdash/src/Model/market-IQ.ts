export interface MarketData {
  inflationRate: number;
  unemploymentRate: number;
  gdpGrowth: number;
  federalRate: number;
}

export interface Problem {
  icon: string;
  title: string;
  description: string;
}

export interface Feature {
  name: string;
  icon: string;
  impact: string;
  benefit: string;
  chartData: number[];
}