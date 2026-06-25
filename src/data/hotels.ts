export interface Hotel {
  id: string;
  name: string;
  type: '经济' | '舒适' | '高级';
  priceRange: string;
  priceNum: number;
  area: string;
  convenience: string;
  suitable: string[];
  image: string;
  facilities: string[];
  description: string;
}

export const hotels: Hotel[] = [
  {
    id: 'qingshe',
    name: '凉州青年旅舍',
    type: '经济',
    priceRange: '50-80元/床',
    priceNum: 65,
    area: '老城区',
    convenience: '距离明清街步行10分钟',
    suitable: ['独自旅行', '预算有限', '年轻人'],
    image: '/images/hotels/liangzhou-youth-hostel.jpg',
    facilities: ['WiFi', '公共浴室', '行李寄存'],
    description: '背包客的首选，经济实惠，氛围轻松。老板熟悉武威本地玩法，可以获取一手旅行贴士。'
  },
  {
    id: 'jiudian',
    name: '凉州商务酒店',
    type: '舒适',
    priceRange: '150-220元/晚',
    priceNum: 185,
    area: '新城区',
    convenience: '距离火车站15分钟车程',
    suitable: ['商务出行', '家庭出游', '休闲度假'],
    image: '/images/hotels/liangzhou-business-hotel.jpg',
    facilities: ['WiFi', '停车场', '早餐', '空调', '24h热水'],
    description: '新城区性价比最高的商务酒店，房间干净舒适，设施齐全。早餐丰富，适合追求舒适度的旅行者。'
  },
  {
    id: 'wenmiao',
    name: '文庙巷民宿',
    type: '舒适',
    priceRange: '120-180元/晚',
    priceNum: 150,
    area: '文庙附近',
    convenience: '紧邻武威文庙，步行可达',
    suitable: ['文化爱好者', '拍照达人', '慢旅行者'],
    image: '/images/hotels/wenmiao-boutique-inn.jpg',
    facilities: ['WiFi', '空调', '特色早餐'],
    description: '藏在文庙老巷子里的特色民宿，老板精心布置，院落有凉州特色。清晨可以漫步文庙，感受古城慢生活。'
  },
  {
    id: 'silu',
    name: '丝路风情酒店',
    type: '高级',
    priceRange: '380-520元/晚',
    priceNum: 450,
    area: '新城区CBD',
    convenience: '武威市中心，购物便利',
    suitable: ['纪念日', '商务接待', '品质追求'],
    image: '/images/hotels/silk-road-hotel.jpg',
    facilities: ['WiFi', '停车场', '早餐', '健身房', '景观房', '管家服务'],
    description: '武威最高端的酒店之一，丝路文化元素融入设计，房间宽敞，景观无敌。顶楼餐厅可俯瞰城市夜景。'
  },
  {
    id: 'minsu',
    name: '大漠驿站民宿',
    type: '舒适',
    priceRange: '160-240元/晚',
    priceNum: 200,
    area: '沙漠公园附近',
    convenience: '沙漠公园自驾15分钟',
    suitable: ['亲子家庭', '摄影爱好者', '户外体验'],
    image: '/images/hotels/desert-oasis-homestay.jpg',
    facilities: ['WiFi', '停车', '早餐', '庭院', '天文望远镜'],
    description: '沙漠边缘的特色民宿，夜晚可以观星。老板是本地通，熟悉周边玩法。适合自驾游客或家庭出行。'
  },
  {
    id: 'cheap',
    name: '速8酒店',
    type: '经济',
    priceRange: '89-120元/晚',
    priceNum: 105,
    area: '南关十字',
    convenience: '公交便利，多条线路经过',
    suitable: ['预算有限', '过境旅客', '学生党'],
    image: '/images/hotels/super8-hotel.jpg',
    facilities: ['WiFi', '空调', '24h热水'],
    description: '全国连锁，经济干净，位置便利。适合过境武威或预算极度紧张时入住，基本需求都能满足。'
  }
];

export const getHotelById = (id: string): Hotel | undefined => {
  return hotels.find(h => h.id === id);
};

export const getHotelsByType = (type: '经济' | '舒适' | '高级'): Hotel[] => {
  return hotels.filter(h => h.type === type);
};

export const getHotelsByBudget = (perDayBudget: number): Hotel[] => {
  if (perDayBudget <= 100) {
    return hotels.filter(h => h.type === '经济');
  } else if (perDayBudget <= 250) {
    return hotels.filter(h => h.type === '经济' || h.type === '舒适');
  } else {
    return hotels;
  }
};
