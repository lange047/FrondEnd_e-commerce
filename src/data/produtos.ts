// src/data/produtos.ts
export interface Produto {
id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  code?: string;
}

export const TODOS_PRODUTOS: Produto[] = [
  // CATEGORIA: ELETRODOMÉSTICOS
  { 
    id: 1, 
    name: 'Cafeteira Expresso Nespresso Vertuo', 
    category: 'eletrodomesticos', 
    price: 150.00, 
    image: '/images/cafeteira-expresso.jpg', 
    code: 'ELET01' 
  },
  { 
    id: 2, 
    name: 'Batedeira Planetária KitchenAid Artisan', 
    category: 'eletrodomesticos', 
    price: 320.00, 
    image: '/images/batedeira-planetaria.jpg', 
    code: 'ELET02' 
  },

  // CATEGORIA: MODA
  { 
    id: 3, 
    name: 'Camiseta Nike Sportswear Premium', 
    category: 'moda', 
    price: 49.90, 
    image: '/images/camiseta-premium.jpg', 
    code: 'MODA01' 
  },
  { 
    id: 4, 
    name: 'Tênis Vans Knu Skool Black', 
    category: 'moda', 
    price: 299.90, 
    image: '/images/tenis.jpg', 
    code: 'MODA02' 
  },

  // CATEGORIA: CASA E DECORAÇÃO
  { 
    id: 5, 
    name: 'Vaso de Cristal Bohemia Golden', 
    category: 'casa-decoracao', 
    price: 89.90, 
    image: '/images/vaso-decorativo.jpg', 
    code: 'CASA01' 
  },
  { 
    id: 6, 
    name: 'Luminária de Mesa Philips Hue Nordik', 
    category: 'casa-decoracao', 
    price: 120.00, 
    image: '/images/luminaria-mesa.jpg', 
    code: 'CASA02' 
  },

  // CATEGORIA: ELETRÔNICOS
  { 
    id: 7, 
    name: 'iPhone 17 Pro Max Titanium', 
    category: 'eletronicos', 
    price: 2500.00, 
    image: '/images/smartphone-pro.jpg', 
    code: 'ELEC01' 
  },
  { 
    id: 8, 
    name: 'Fone Bluetooth JBL Tour One M2', 
    category: 'eletronicos', 
    price: 199.00, 
    image: '/images/fone-bluetooth.jpg', 
    code: 'ELEC02' 
  },

  // CATEGORIA: ADMINISTRAÇÃO
  { 
    id: 9, 
    name: 'Console PowerBI Dashboard CoreX', 
    category: 'administracao', 
    price: 550.00, 
    image: '/images/impressora-hp.jpg', 
    code: 'ADM01' 
  },
  { 
    id: 10, 
    name: 'Scanner HP ScanJet Enterprise 4K', 
    category: 'administracao', 
    price: 890.00, 
    image: '/images/scanner-documentos.jpg', 
    code: 'ADM02' 
  }
];