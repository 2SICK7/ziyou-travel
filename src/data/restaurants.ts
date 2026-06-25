export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  price: number;
  dishes: string[];
  time: ('breakfast' | 'lunch' | 'dinner' | 'night')[];
  location: string;
  image: string;
  description: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 'santouche',
    name: '凉州三套车',
    cuisine: '本地特色',
    price: 25,
    dishes: ['三套车', '凉州饴烙', '面食套餐'],
    time: ['breakfast', 'lunch', 'dinner'],
    location: '明清街',
    image: '/images/foods/santao-che.jpg',
    description: '武威最具代表性的本地美食，一碗面配腊肉、粉汤、卤肉，分量实在，是凉州人最爱的家常味道。'
  },
  {
    id: 'mingqing',
    name: '明清街老字号',
    cuisine: '西北菜',
    price: 45,
    dishes: ['手抓羊肉', '凉皮', '拉条子', '炒面片'],
    time: ['lunch', 'dinner'],
    location: '明清街夜市',
    image: '/images/foods/mingqing-street-food.jpg',
    description: '夜市里最热闹的摊位，本地人常去。羊肉新鲜现烤，配上凉皮和啤酒，是武威夜晚的正确打开方式。'
  },
  {
    id: 'xingpicha',
    name: '老字号杏皮茶',
    cuisine: '饮品甜品',
    price: 8,
    dishes: ['杏皮茶', '灰豆子', '甜胚子'],
    time: ['breakfast', 'lunch', 'dinner', 'night'],
    location: '明清街',
    image: '/images/foods/xingpi-tea.jpg',
    description: '武威特色饮品，杏皮熬制的酸甜口感，消暑解渴。本地人从小喝到大，比任何奶茶都地道。'
  },
  {
    id: 'liangzhou',
    name: '凉州味道',
    cuisine: '陇菜',
    price: 65,
    dishes: ['烤全羊', '大漠风沙鸡', '石窟素斋', '沙漠野菜'],
    time: ['lunch', 'dinner'],
    location: '新城区',
    image: '/images/foods/liangzhou-cuisine.jpg',
    description: '主打武威本地特色菜的餐厅，环境雅致。烤全羊需要提前预约，是招待客人或特殊日子的好选择。'
  },
  {
    id: 'nopork',
    name: '鸠摩罗什素斋馆',
    cuisine: '素食',
    price: 35,
    dishes: ['素面', '凉拌野菜', '粗粮馒头', '素馅饺子'],
    time: ['breakfast', 'lunch'],
    location: '鸠摩罗什寺附近',
    image: '/images/foods/vegetarian-meal.jpg',
    description: '寺旁清净素斋馆，以本地野菜和粗粮为主，清淡养生。吃完再去寺庙走走，心静神宁。'
  },
  {
    id: 'breakfast',
    name: '传统凉州面馆',
    cuisine: '面食',
    price: 15,
    dishes: ['牛肉面', '炮仗面', '臊子面', '炸酱面'],
    time: ['breakfast', 'lunch'],
    location: '老城区',
    image: '/images/foods/liangzhou-noodles.jpg',
    description: '武威人早餐的首选，面条劲道，汤底鲜美。一碗牛肉面开启凉州的一天，本地人的日常味道。'
  },
  {
    id: 'desertcamp',
    name: '沙漠营地餐厅',
    cuisine: '户外烧烤',
    price: 88,
    dishes: ['沙漠烧烤套餐', '手抓饭', '烤红薯', '蒙古奶茶'],
    time: ['lunch', 'dinner'],
    location: '沙漠公园内',
    image: '/images/foods/desert-bbq.jpg',
    description: '沙漠公园内的特色餐厅，烧烤现做，氛围感十足。在沙漠边缘用餐，是独特的旅行体验。'
  },
  {
    id: 'hotal',
    name: '孝乐怡清真餐厅',
    cuisine: '清真菜',
    price: 55,
    dishes: ['爆炒牛羊肉', '馕包肉', '大盘鸡', '椒麻鸡'],
    time: ['lunch', 'dinner'],
    location: '南关十字',
    image: '/images/foods/muslim-cuisine.jpg',
    description: '武威老字号清真餐厅，菜品分量足，味道地道。是体验武威清真美食文化的不错选择。'
  }
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(r => r.id === id);
};

export const getRestaurantsByTime = (time: 'breakfast' | 'lunch' | 'dinner' | 'night'): Restaurant[] => {
  return restaurants.filter(r => r.time.includes(time));
};

export const getRestaurantsByPriceRange = (maxPrice: number): Restaurant[] => {
  return restaurants.filter(r => r.price <= maxPrice);
};
