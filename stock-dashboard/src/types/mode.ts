export interface FeatureImportance {
  feature: string;                           
  importance: number;                        
  impact: 'positive' | 'negative' | 'neutral';
}

export interface ModelMetrics {
  bestModelName: string;                    
  lastTrainedDate: string;                
  accuracy: number;                         
  precision: number;                       
  recall: number;                         
  f1Score: number;                         
  confusionMatrix: [                         
    [number, number],
    [number, number]
  ];
  featureImportances: FeatureImportance[];
}

export interface PredictionInput {
  fedFundsRate: number;     
  cpiInflation: number;     
  revenueGrowthYoY: number;   
  rsi14d: number;             
}

export interface PredictionResult {
  predictedDirection: 'UP' | 'DOWN'; 
  probability: number;               
}

export interface ScenarioPrediction {
  scenarioId: string;
  label: string;                    
  predictedDirection: 'UP' | 'DOWN';
  probability: number;
}