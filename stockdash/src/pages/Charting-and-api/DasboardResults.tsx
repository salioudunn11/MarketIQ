import React, { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonBadge
} from '@ionic/react';
import { useParams, useLocation } from 'react-router-dom';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Endpoint 1: GET /predict/{ticker}
interface SinglePrediction {
  ticker: string;
  last_known_date: string;
  last_known_price: number;
  prediction_target_date: string;
  predicted_price: number;
  lookback_days: number;
  horizon_days: number;
}

// Endpoint 2: POST /predict/scenario
interface ScenarioPoint {
  date: string;
  AAPL: number;
  MSFT: number;
  GOOGL: number;
}

interface ScenarioResponse {
  scenario: {
    interest_rate: number;
    inflation_rate: number;
    unemployment_rate: number;
    gdp_growth: number;
  };
  horizon_days: number;
  chart_data: ScenarioPoint[];
}

const TICKER_COLORS: Record<string, string> = {
  GOOGL: '#4285F4',
  AAPL: '#A2AAAD',
  MSFT: '#00A4EF',
};

const DashboardResults: React.FC = () => {
  const { symbol = 'GOOGL' } = useParams<{ symbol: string }>();
  const activeSymbol = symbol.toUpperCase();
  const location = useLocation();

  const [singleData, setSingleData] = useState<SinglePrediction | null>(null);
  const [scenarioData, setScenarioData] = useState<ScenarioResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const hasMacroParams =
    searchParams.has('inflation') &&
    searchParams.has('interestRate') &&
    searchParams.has('unemploymentRate') &&
    searchParams.has('gdp');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSingleData(null);
      setScenarioData(null);

      try {
        if (hasMacroParams) {
          // Send macro simulation scenario to POST /predict/scenario
          const payload = {
            inflation_rate: parseFloat(searchParams.get('inflation') || '0'),
            interest_rate: parseFloat(searchParams.get('interestRate') || '0'),
            unemployment_rate: parseFloat(searchParams.get('unemploymentRate') || '0'),
            gdp_growth: parseFloat(searchParams.get('gdp') || '0'),
          };

          const response = await fetch('http://127.0.0.1:8000/predict/scenario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(`Scenario API error: ${response.statusText}`);
          }

          const result: ScenarioResponse = await response.json();
          setScenarioData(result);
        } else {
          // Fetch historical model prediction for single ticker
          const response = await fetch(`http://127.0.0.1:8000/predict/${activeSymbol}`);

          if (!response.ok) {
            throw new Error(`Single Ticker API error: ${response.statusText}`);
          }

          const result: SinglePrediction = await response.json();
          setSingleData(result);
        }
      } catch (err: any) {
        console.error('Failed to fetch prediction:', err);
        setError(err.message || 'Failed to connect to the backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeSymbol, location.search]);

  // Single ticker fallback chart formatting
  const singleChartData = singleData
    ? [
        { date: singleData.last_known_date, [activeSymbol]: singleData.last_known_price },
        { date: singleData.prediction_target_date, [activeSymbol]: singleData.predicted_price },
      ]
    : [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/macro/inflation" />
          </IonButtons>
          <IonTitle>{activeSymbol} Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Loading State */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <IonSpinner name="crescent" />
            <span style={{ marginLeft: '12px', fontSize: '1.1rem' }}>
              {hasMacroParams ? 'Simulating 30-Day Scenario...' : `Fetching ${activeSymbol} Model...`}
            </span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <IonCard color="danger">
            <IonCardHeader>
              <IonCardTitle>Connection Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{error}</p>
              <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                Ensure your FastAPI server is running on <code>http://127.0.0.1:8000</code>.
              </p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {/* Macro Scenario Header Card */}
            {hasMacroParams && scenarioData && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>30-Day Economic Simulation</IonCardTitle>
                  <IonCardSubtitle>Applied Macro Parameters</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <IonBadge color="primary">Inflation: {scenarioData.scenario.inflation_rate}%</IonBadge>
                    <IonBadge color="secondary">Interest Rate: {scenarioData.scenario.interest_rate}%</IonBadge>
                    <IonBadge color="tertiary">Unemployment: {scenarioData.scenario.unemployment_rate}%</IonBadge>
                    <IonBadge color="success">GDP Growth: {scenarioData.scenario.gdp_growth}%</IonBadge>
                  </div>
                </IonCardContent>
              </IonCard>
            )}

            {/* Single Ticker Stat Summary */}
            {!hasMacroParams && singleData && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Prediction Summary: {singleData.ticker}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <h2>
                    Last Price: <strong>${singleData.last_known_price}</strong>{' '}
                    <IonText color="medium">({singleData.last_known_date})</IonText>
                  </h2>
                  <h2>
                    30-Day Forecast: <strong>${singleData.predicted_price}</strong>{' '}
                    <IonText color="primary">({singleData.prediction_target_date})</IonText>
                  </h2>
                  <hr style={{ margin: '15px 0', borderColor: 'var(--ion-color-step-150)' }} />
                  <p><strong>Lookback Window:</strong> {singleData.lookback_days} days</p>
                  <p><strong>Horizon:</strong> {singleData.horizon_days} days</p>
                </IonCardContent>
              </IonCard>
            )}

            {/* Interactive Recharts Visualization */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  {hasMacroParams ? 'Multi-Asset Projected Trajectory' : `${activeSymbol} Forecast Chart`}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={hasMacroParams ? scenarioData?.chart_data : singleChartData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--ion-background-color, #1e1e1e)',
                          borderColor: '#444',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />

                      {hasMacroParams ? (
                        ['AAPL', 'MSFT', 'GOOGL'].map((ticker) => (
                          <Line
                            key={ticker}
                            type="monotone"
                            dataKey={ticker}
                            stroke={TICKER_COLORS[ticker] || '#8884d8'}
                            strokeWidth={ticker === activeSymbol ? 3 : 1.5}
                            opacity={ticker === activeSymbol ? 1 : 0.5}
                            dot={false}
                          />
                        ))
                      ) : (
                        <Line
                          type="monotone"
                          dataKey={activeSymbol}
                          stroke={TICKER_COLORS[activeSymbol] || '#3880ff'}
                          strokeWidth={2.5}
                          dot={{ r: 4 }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </IonCardContent>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DashboardResults;
