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
  { symbol: 'GOOG', name: 'Alphabet Inc', price: 178.20, changePercent: 1.5 }

];




// Macro / economy pages, separate from individual stocks.
interface Macro {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
}

interface MenuProps{
  stockChosen: string |null;
  onSelectStock: (symbol: string) => void;
}

const macroPages: Macro[] = [
  {
    title: 'Inflation',
    url: '/macro/inflation',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp,
  },
  {
    title: 'Interest rates',
    url: '/macro/interest-rates',
    iosIcon: cashOutline,
    mdIcon: cashSharp,
  },
];

const formatPrice = (price: number) =>
  price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const Menu: React.FC<MenuProps> = ({ stockChosen, onSelectStock }) => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="stocks-list">
          <IonListHeader>MarketIQ</IonListHeader>
          {stocks.map((stock) => {
           
            const isPositive = stock.changePercent >= 0;

            return (
              <IonMenuToggle key={stock.symbol} autoHide={false}>
                <IonItem
                className={stockChosen  === stock.symbol ? 'selected' : ''}
                  onClick={() => onSelectStock(stock.symbol)}
                  button // Adds the clickable ripple effect
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
