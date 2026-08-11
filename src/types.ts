export interface MenuItem {
  id: string;
  name: string;
  category: 'ESPRESSO' | 'FILTER' | 'COLD' | 'PASTRIES';
  description: string;
  notes?: string;
  origin?: string;
  roast?: string;
  elevation?: string;
  price: string;
  badge?: string;
}

export interface JourneySceneData {
  id: number;
  title: string;
  subtitle: string;
  stepNumber: string;
  tagline: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'e1',
    name: 'EMBER ESPRESSO',
    category: 'ESPRESSO',
    description: 'Double ristretto shot pulled on our custom Synesso. Rich body with dark chocolate backbone.',
    notes: 'Dark Chocolate · Marzipan · Black Cherry',
    origin: 'Yirgacheffe, Ethiopia & Huila, Colombia Blend',
    roast: 'Medium-Light',
    price: '₹280',
    badge: 'Signature',
  },
  {
    id: 'e2',
    name: 'VELVET CORTADO',
    category: 'ESPRESSO',
    description: 'Equal parts Ember Espresso and silk textured steamed microfoam milk from local Surat dairy.',
    notes: 'Salted Caramel · Toasted Hazelnut · Cream',
    origin: 'Single Origin Colombia Pink Bourbon',
    roast: 'Light',
    price: '₹320',
  },
  {
    id: 'e3',
    name: 'FLAT WHITE',
    category: 'ESPRESSO',
    description: 'Double shot espresso seamlessly folded with velvety micro-steamed milk in a 6oz porcelain cup.',
    notes: 'Brown Sugar · Milk Chocolate · Vanilla',
    price: '₹340',
  },
  {
    id: 'f1',
    name: 'ETHIOPIAN GUJI POUR OVER',
    category: 'FILTER',
    description: 'Hand-poured on V60 paper dripper. Exceptionally clean cup with jasmine aromatics and bergamot finish.',
    notes: 'Jasmine · Bergamot · Peach Blossom',
    origin: 'Guji Zone, Oromia, Ethiopia (1,950m)',
    roast: 'Ultra-Light Hand Roast',
    price: '₹380',
    badge: 'Seasonal Reserve',
  },
  {
    id: 'f2',
    name: 'HOUSE BATCH FILTER',
    category: 'FILTER',
    description: 'Slow-drip thermal carafe filter coffee. Smooth, comforting, and balanced for long mornings.',
    notes: 'Toffee · Red Apple · Roasted Pecan',
    origin: 'Tarrazú, Costa Rica',
    roast: 'Medium',
    price: '₹260',
  },
  {
    id: 'f3',
    name: 'PANAMA GEISHA AEROPRESS',
    category: 'FILTER',
    description: 'High-elevation competition grade Geisha lot. Delicate tea-like body with floral undertones.',
    notes: 'Meyer Lemon · Honeycomb · White Tea',
    origin: 'Boquete, Panama (1,800m)',
    roast: 'Light',
    price: '₹550',
    badge: 'Limited Lot',
  },
  {
    id: 'c1',
    name: '18-HOUR COLD BREW',
    category: 'COLD',
    description: 'Slow steep in pure filtered spring water for 18 hours. Zero bitterness, low acidity, ultra-refreshing.',
    notes: 'Dark Cocoa · Maple · Vanilla Bean',
    price: '₹320',
  },
  {
    id: 'c2',
    name: 'SPICED ESPRESSO TONIC',
    category: 'COLD',
    description: 'Chilled artisanal tonic water over crystal ice topped with fresh espresso and cardamon mist.',
    notes: 'Citrus Zest · Cardamom · Roasted Espresso',
    price: '₹360',
    badge: 'Summer Favorite',
  },
  {
    id: 'p1',
    name: 'BUTTER CROISSANT',
    category: 'PASTRIES',
    description: 'Baked fresh every morning at 05:00 AM using Normandy cultured butter. 81 golden flaky layers.',
    notes: 'Rich Butter · Flaky Crust',
    price: '₹240',
  },
  {
    id: 'p2',
    name: 'CINNAMON MORNING BUN',
    category: 'PASTRIES',
    description: 'Laminated croissant dough rolled with Ceylon cinnamon, dark brown sugar, and orange zest.',
    notes: 'Ceylon Cinnamon · Orange Zest',
    price: '₹280',
  },
  {
    id: 'p3',
    name: 'CHOCOLATE PAIN AU CHOCOLAT',
    category: 'PASTRIES',
    description: 'Flaky butter pastry filled with two batons of 70% Valrhona dark chocolate.',
    notes: '70% Valrhona Dark Cocoa',
    price: '₹290',
  }
];
