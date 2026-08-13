import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useLocation, useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

interface ChartDataPoint {
  date: string;
  price: number;
  isPrediction: boolean;
}

const DashboardResults: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const location = useLocation();
  
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      // 1. Extract the macro values you submitted from the URL
      const queryParams = new URLSearchParams(location.search);
      const inflation = queryParams.get('inflation') || 0;
      const interestRate = queryParams.get('interestRate') || 0;
      const unemploymentRate = queryParams.get('unemploymentRate') || 0;
      const gdp = queryParams.get('gdp') || 0;

      try {
        // 2. Fetch the factored data from your FastAPI backend
        const url = `http://localhost:8000/predict?ticker=${symbol}&inflation=${inflation}&interestRate=${interestRate}&unemploymentRate=${unemploymentRate}&gdp=${gdp}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('API failed to respond');
        
        const result = await response.json();
        
        // 3. Set the Recharts array to state
        setData(result.chartData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [symbol, location.search]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/macro/inflation" />
          </IonButtons>
          <IonTitle>{symbol} Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonCard color="dark">
          <IonCardHeader>
            <IonCardTitle>30-Day Factored Trajectory</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {loading && <IonSpinner name="crescent" />}
            {error && <p style={{ color: 'var(--ion-color-danger)' }}>Error: {error}</p>}
            
            {/* 4. Render the Recharts visualization */}
            {!loading && !error && data.length > 0 && (
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis domain={['auto', 'auto']} stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3880ff" 
                      strokeWidth={2}
                      dot={false}
                    />
                    {/* Highlight the ML prediction at the very end of the line */}
                    <ReferenceDot 
                      x={data[data.length - 1].date} 
                      y={data[data.length - 1].price} 
                      r={6} 
                      fill="#2dd36f" 
                      stroke="none" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DashboardResults;