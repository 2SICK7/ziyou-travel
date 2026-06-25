export interface Attraction {
  id: string;
  name: string;
  tags: string[];
  description: string;
  duration: string;
  crowd: string;
  ticket: string;
  image: string;
  suitable: string[];
  tips: string;
  highlights: string[];
}

export const attractions: Attraction[] = [
  {
    id: 'leitai',
    name: '雷台汉墓',
    tags: ['必打卡', '博物馆', '历史文化'],
    description: '马踏飞燕出土地，中国旅游标志的诞生地。这座汉代墓葬群因出土铜奔马而闻名遐迩，仪仗俑阵势恢宏，诉说着凉州古城的辉煌过往。',
    duration: '2-3小时',
    crowd: '适中',
    ticket: '50元',
    image: '/images/spots/leitai-han-tomb.jpg',
    suitable: ['历史爱好者', '文化探索者', '亲子家庭'],
    tips: '建议请导游或租借讲解器，深入了解铜车马仪仗的历史背景。墓室内部禁止拍照。',
    highlights: ['铜奔马真品', '仪仗俑阵', '汉代墓室结构']
  },
  {
    id: 'museum',
    name: '武威市博物馆',
    tags: ['免费', '博物馆', '雨天备选'],
    description: '馆藏丰富，尤其以马踏飞燕系列文物和凉州历史文物著称。是了解武威千年变迁的最佳场所。',
    duration: '1.5-2小时',
    crowd: '较少',
    ticket: '免费',
    image: '/images/spots/wuwei-museum.jpg',
    suitable: ['历史爱好者', '雨天的选择', '低预算旅行者'],
    tips: '周一闭馆，建议下午4点前入场。馆内提供免费讲解服务。',
    highlights: ['马踏飞燕展区', '凉州历史文物', '丝路文化展厅']
  },
  {
    id: 'confucian',
    name: '武威文庙',
    tags: ['古建筑', '拍照', '儒学文化'],
    description: '西北地区保存最完整的文庙之一，古建筑群庄严肃穆，柏树参天，是感受儒家文化的绝佳去处。',
    duration: '1-2小时',
    crowd: '较少',
    ticket: '30元',
    image: '/images/spots/wuwei-confucian-temple.jpg',
    suitable: ['拍照爱好者', '文化探索者', '安静游览'],
    tips: '清晨或傍晚光线最美，适合拍照。附近的凉州市场可以品尝本地小吃。',
    highlights: ['古柏夹道', '大成殿', '文昌宫']
  },
  {
    id: 'tianti',
    name: '天梯山石窟',
    tags: ['石窟', '佛教艺术', '自然风光'],
    description: '中国早期石窟艺术的杰出代表，大佛依山面水，石窟与山水交相辉映，展现了佛教艺术与自然景观的完美融合。',
    duration: '3-4小时',
    crowd: '较少',
    ticket: '40元',
    image: '/images/spots/tiantishan-grottoes.jpg',
    suitable: ['艺术爱好者', '摄影爱好者', '深度文化游'],
    tips: '距离市区约40公里，建议包车或自驾。带好防晒用品，景区内可以徒步至水库观景台。',
    highlights: ['大佛坐像', '山水石窟', '早期壁画遗存']
  },
  {
    id: 'baita',
    name: '白塔寺',
    tags: ['历史遗址', '文化景点', '汉藏交流'],
    description: '凉州会盟遗址，见证了汉藏民族交融的重要历史时刻。塔群巍峨，承载着深厚的民族文化记忆。',
    duration: '1-2小时',
    crowd: '较少',
    ticket: '25元',
    image: '/images/spots/baita-temple.jpg',
    suitable: ['历史爱好者', '文化探索者'],
    tips: '可与天梯山石窟安排在同一天，两地相距较近。会盟纪念馆值得一看。',
    highlights: ['白塔群', '会盟纪念碑', '汉藏文化展览']
  },
  {
    id: 'jiujiang',
    name: '鸠摩罗什寺',
    tags: ['佛教', '古寺', '安静游览'],
    description: '为纪念佛教翻译家鸠摩罗什而建的寺院，古树参天，香火缭绕，是修心养性的清净之地。',
    duration: '1-1.5小时',
    crowd: '很少',
    ticket: '免费',
    image: '/images/spots/kumarajiva-temple.jpg',
    suitable: ['文化探索者', '佛教文化爱好者', '安静游览'],
    tips: '清晨前往更能感受古刹宁静。寺外有素斋可以品尝。',
    highlights: ['鸠摩罗什舍利塔', '古树', '藏经楼']
  },
  {
    id: 'desert',
    name: '武威沙漠公园',
    tags: ['自然景观', '户外体验', '亲子'],
    description: '腾格里沙漠边缘的绿洲奇迹，沙漠与植物园共存。可以体验骑骆驼、滑沙等沙漠项目。',
    duration: '3-4小时',
    crowd: '适中',
    ticket: '30元',
    image: '/images/spots/wuwei-desert-park.jpg',
    suitable: ['亲子家庭', '户外爱好者', '摄影爱好者'],
    tips: '下午4点后入园，光线最佳。防晒必备，带好饮用水。骑骆驼建议提前谈价。',
    highlights: ['沙漠绿洲', '骑骆驼体验', '滑沙区']
  },
  {
    id: 'nightmarket',
    name: '明清街 / 凉州夜市',
    tags: ['美食', '夜游', '烟火气'],
    description: '武威最具烟火气的美食街区，夜幕降临后灯火通明，本地美食汇聚，是体验凉州夜生活的最佳去处。',
    duration: '2-3小时',
    crowd: '热闹',
    ticket: '免费',
    image: '/images/spots/liangzhou-night-market.jpg',
    suitable: ['美食爱好者', '夜猫子', '低预算旅行者'],
    tips: '晚上7点后人流渐多。必尝三套车、凉州面食、杏皮茶。',
    highlights: ['三套车', '凉州凉面', '本地烧烤']
  }
];

export const getAttractionById = (id: string): Attraction | undefined => {
  return attractions.find(a => a.id === id);
};

export const getAttractionsByIds = (ids: string[]): Attraction[] => {
  return ids.map(id => getAttractionById(id)).filter((a): a is Attraction => a !== undefined);
};
