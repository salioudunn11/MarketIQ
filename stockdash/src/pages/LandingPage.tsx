import React from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
} from '@ionic/react';
import '../styles/LandingPages.scss';

// ===== HEADER COMPONENT =====
const Header: React.FC = () => (
  <header className="landing-header">
    <div className="header-content">
      <div className="logo">
        Market<span className="highlight">IQ</span>
      </div>
      <IonButton
        className="btn btn-primary header-btn"
        href="/macro/inflation"
      >
        Get Started
      </IonButton>
    </div>
  </header>
);

// ===== FEATURE CARD COMPONENT =====
interface CardProps {
  icon: string;
  title: string;
  history: string;
  impact: string;
  benefit: string;
  chartData: number[];
}

const FeatureCard: React.FC<CardProps> = ({ 
  icon, 
  title, 
  history, 
  impact, 
  benefit, 
  chartData 
}) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <div className="feature-history">{history}</div>
    
    <div className="feature-section">
      <h4>Historical Impact</h4>
      <p className="feature-impact">{impact}</p>
    </div>

    <div className="mini-chart">
      {chartData.map((value, idx) => (
        <div
          key={idx}
          className="chart-bar"
          style={{ height: `${value}%` }}
        ></div>
      ))}
    </div>

    <div className="feature-section">
      <h4>How MarketIQ Helps</h4>
      <p className="feature-benefit">{benefit}</p>
    </div>
  </div>
);

// ===== ABOUT US STAT CARD COMPONENT =====
interface StatProps {
  label: string;
  value: string;
}

const StatCard: React.FC<StatProps> = ({ label, value }) => (
  <div className="stat-card">
    <dt className="stat-label">{label}</dt>
    <dd className="stat-value">{value}</dd>
  </div>
);

// ===== ABOUT US COMPONENT =====
const AboutUsSection: React.FC = () => {
  const stats: StatProps[] = [
    { label: 'Portfolio Accuracy', value: '94%+' },
    { label: 'Data Sources', value: '50+' },
    { label: 'Historical Data', value: '50 Years' },
    { label: 'Prediction Horizon', value: '6-12 Months' },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="section-header-left">
            <h2>About MarketIQ</h2>
            <p className="section-subheader">
              How MarketIQ Transforms Your Investment Strategy
            </p>
          </div>

          <p className="about-description">
            MarketIQ combines machine learning, economic data science, 
            and financial engineering to predict market movements. Our algorithms 
            analyze the same macro indicators that professional institutional investors
            track but we make them accessible to everyone.
          </p>

          <p className="about-description">
            Input today's Inflation data, Employment reports, Federal Reserve decisions, and GDP forecasts.
             We identify patterns that human analysts miss and translate them into actionable investment recommendations.
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="about-features-list">
            <h3>Our Technology</h3>
            <ul className="features-bullet-list">
              <li>
                <span className="check-mark">✓</span>
                <span>Advanced ML models trained on 50+ years of market data</span>
              </li>
              <li>
                <span className="check-mark">✓</span>
                <span>Real time macro indicator monitoring and correlation analysis</span>
              </li>
              <li>
                <span className="check-mark">✓</span>
                <span>6 to 12 month forward predictions with 94% accuracy</span>
              </li>
              <li>
                <span className="check-mark">✓</span>
                <span>Personalized portfolio recommendations aligned with your goals</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="about-chart">
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <p className="chart-label">Portfolio Performance</p>
                <p className="chart-value">+24.8%</p>
              </div>
              <span className="chart-badge">Annualized</span>
            </div>

            <svg viewBox="0 0 400 180" className="performance-chart">
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DB2955" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#DB2955" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 150 L40 138 L80 128 L120 112 L160 98 L200 88 L240 72 L280 62 L320 50 L360 35 L400 30 L400 180 L0 180 Z"
                fill="url(#chart-fill)"
              />
              <path
                d="M0 150 L40 138 L80 128 L120 112 L160 98 L200 88 L240 72 L280 62 L320 50 L360 35 L400 30"
                fill="none"
                stroke="#DB2955"
                strokeWidth="2"
              />
              <path
                d="M0 162 L80 152 L160 136 L240 116 L320 92 L400 68"
                fill="none"
                stroke="#9DA39A"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
            </svg>

            <div className="volume-bars">
              {[38, 52, 30, 64, 44, 72, 40, 58, 34, 80, 48, 66].map((h, i) => (
                <span
                  key={i}
                  className="bar"
                  style={{ height: `${h * 0.5}px` }}
                ></span>
              ))}
            </div>
            <p className="chart-footnote">Trading Volume - Last 12 Months</p>

            <div className="chart-metrics">
              <div className="metric">
                <span className="metric-label">50/200d Moving Avg</span>
                <span className="metric-value">Golden Cross</span>
              </div>
              <div className="metric">
                <span className="metric-label">Volatility</span>
                <span className="metric-value">21.4%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Max Drawdown</span>
                <span className="metric-value">−31.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== FOOTER COMPONENT =====
const Footer: React.FC = () => (
  <footer className="landing-footer">
    <div className="footer-content">
      <p>&copy; 2026 MarketIQ. All rights reserved.</p>
      <div className="footer-logo">Market<span className="highlight">IQ</span></div>
    </div>
  </footer>
);

// ===== MAIN LANDING PAGE COMPONENT =====
const LandingPage: React.FC = () => {
  const features: CardProps[] = [
    {
      icon: '',
      title: 'Inflation',
      history: 'History & Economic Impact',
      impact: 'Inflation erodes purchasing power and directly affects corporate profit margins. During the 1970s stagflation crisis, inflation rates exceeded 12%, causing the stock market to crash significantly. Today, moderate inflation (2-3% annually) typically supports healthy equity growth, but rapid inflation above 5% can trigger market volatility and force central banks to raise interest rates.',
      benefit: 'MarketIQ continuously monitors inflation trends and automatically recommends portfolio allocation adjustments to optimize returns. Our AI predicts inflation spikes 3-6 months ahead, allowing you to reposition assets before market corrections occur.',
      chartData: [20, 15, 10, 40, 60, 35]
    },
    {
      icon: '',
      title: 'Unemployment',
      history: 'History & Workforce Impact',
      impact: 'High unemployment rates signal economic weakness and reduce consumer spending power. During the Great Depression, unemployment reached 25%, devastating stock valuations. Rising unemployment historically precedes market downturns by 2-3 months. Each 1% increase in unemployment typically correlates with a 2-4% decline in equity valuations, making it a critical leading indicator for portfolio management.',
      benefit: 'MarketIQ analyzes employment trends and tracks jobless claims to predict economic cycles. Our system identifies emerging recessions early, enabling you to reduce risk exposure before widespread market declines occur. Get alerts when unemployment trends suggest market weakness.',
      chartData: [35, 30, 65, 45, 25, 30]
    },
    {
      icon: '',
      title: 'Federal Fund Rates',
      history: 'History & Interest Rate Impact',
      impact: 'Federal Reserve interest rate decisions directly impact stock valuations through discount rates applied to future earnings. When the Fed raised rates from 0% to 5.25% in 2022-2023, the S&P 500 declined 20%. Conversely, rate cuts typically trigger market rallies. Higher rates reduce borrowing capacity for companies and decrease consumer spending, while lower rates stimulate growth and asset prices.',
      benefit: 'MarketIQ predicts Fed policy changes based on inflation data, employment reports, and economic indicators. Our algorithms identify optimal entry and exit points based on expected rate movements. Receive forecasts on Fed decisions 4-8 weeks before official announcements, giving you a competitive advantage.',
      chartData: [15, 12, 8, 5, 18, 50]
    },
    {
      icon: '',
      title: 'GDP Growth',
      history: 'History & Economic Growth',
      impact: 'GDP growth reflects overall economic health and directly drives corporate revenue and profitability. Positive GDP growth (above 2.5%) typically supports bull markets and rising stock prices. Recessions (negative GDP) trigger 20-30% market declines on average. The 2008 financial crisis saw -4.3% GDP decline, causing a 57% S&P 500 crash. Strong GDP growth above 4% historically supports 12-15% annual stock market returns.',
      benefit: 'MarketIQ forecasts GDP trends using leading economic indicators and advance economic data. Our AI identifies recession risks 6-12 months early, allowing strategic portfolio positioning. Get actionable insights on when to shift between growth and defensive stocks based on GDP trajectory.',
      chartData: [55, 50, 20, 60, 45, 50]
    }
  ];

  return (
    <IonPage>
      <IonContent className="landing-content">
        
        <Header />

        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-headline">
              Skip the Cleanup. Make Smarter, <span className="highlight">Safer Investments</span>.
            </h1>
            <p className="hero-subtitle">
              Clean Data. Smart Choices. Secure Investments. MarketIQ transforms messy macro feeds into analysis-ready data, giving you the clarity needed to build a stronger portfolio.
            </p>
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2>Understanding Market Drivers</h2>
            <p>Key economic indicators that shape investment outcomes</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        <AboutUsSection />

        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Make Smarter Investments?</h2>
            <p>Join thousands of investors who trust MarketIQ. Get started free today—no credit card required.</p>
            <IonButton
              className="btn btn-primary cta-btn"
              href="/macro/inflation"
            >
              Get Started
            </IonButton>
          </div>
        </section>

        <Footer />

      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
