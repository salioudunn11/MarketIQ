import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  trendingUpOutline,
  trendingUpSharp,
  cashOutline,
  cashSharp,
  statsChartOutline,
  statsChartSharp,
} from 'ionicons/icons';
import './Menu.css';

// One row per stock in your watchlist.
// symbol/name/price/change would normally come from your stock_history.json
// (latest row per ticker), not hardcoded like this.
interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

const stocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.52, changePercent: 0.7 },
  { symbol: 'MSFT', name: 'Microsoft', price: 412.3, changePercent: 1.2 },
  { symbol: 'TSLA', name: 'Tesla', price: 241.9, changePercent: -1.8 },
  { symbol: 'NVDA', name: 'Nvidia', price: 118.4, changePercent: 2.4 },
];

const formatPrice = (price: number) =>
  price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="stocks-list">
          <IonListHeader>MarketIQ</IonListHeader>
          {stocks.map((stock) => {
            const url = `/stock/${stock.symbol}`;
            const isPositive = stock.changePercent >= 0;

            return (
              <IonMenuToggle key={stock.symbol} autoHide={false}>
                <IonItem
                  className={location.pathname === url ? 'selected' : ''}
                  routerLink={url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={trendingUpOutline}
                    md={trendingUpSharp}
                  />
                  <IonLabel>
                    <h3>{stock.symbol}</h3>
                    <p>{stock.name}</p>
                  </IonLabel>
                  <IonNote slot="end" color={isPositive ? 'success' : 'danger'}>
                    {formatPrice(stock.price)}
                    <br />
                    {isPositive ? '+' : ''}
                    {stock.changePercent}%
                  </IonNote>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;