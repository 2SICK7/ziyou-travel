import { getRestaurantsByPriceRange } from '../data/restaurants';
import { getHotelsByBudget } from '../data/hotels';
import { BudgetAnalysis, BudgetLevel } from './budgetCalculator';

export interface TimeSlot {
  type: 'morning' | 'noon' | 'afternoon' | 'evening';
  places: string[];
  activity: string;
  duration: string;
  tips: string;
  transport?: string;
}

export interface DailyPlan {
  day: number;
  theme: string;
  slots: TimeSlot[];
}

export interface GeneratedRoute {
  title: string;
  subtitle: string;
  city: string;
  totalBudget: number;
  days: number;
  budgetLevel: BudgetLevel;
  pressureIndex: string;
  routeTags: string[];
  personalityLabel: string;
  dailyPlans: DailyPlan[];
  restaurantList: string[];
  hotelRecommendation: string;
  budgetBreakdown: {
    hotel: number;
    food: number;
    tickets: number;
    transport: number;
    backup: number;
  };
  warnings: string[];
  routeDescription: string;
}


const getPersonalityLabel = (preferences: string[], budgetLevel: BudgetLevel): string => {
  const preferenceLabels: Record<string, string> = {
    '历史文化': '凉州历史漫游者',
    '美食优先': '凉州美食探索家',
    '拍照出片': '大漠摄影玩家',
    '低预算穷游': '精打细算的凉州行者',
    '舒适休闲': '丝路轻奢旅行者',
    '亲子家庭': '沙漠绿洲亲子游侠',
    '深度文化游': '丝路文化猎人',
  };

  for (const pref of preferences) {
    if (preferenceLabels[pref]) {
      return preferenceLabels[pref];
    }
  }

  if (budgetLevel === '经济') return '凉州深度探索者';
  if (budgetLevel === '高级') return '丝路品质旅行者';
  return '凉州文化漫游者';
};

const getRouteTags = (preferences: string[], days: number): string[] => {
  const tags: string[] = ['武威', '凉州'];
  
  if (preferences.includes('历史文化') || preferences.includes('深度文化游')) {
    tags.push('汉唐遗韵', '石窟秘境');
  }
  if (preferences.includes('美食优先')) {
    tags.push('凉州烟火', '夜市寻味');
  }
  if (preferences.includes('拍照出片')) {
    tags.push('出片圣地', '光影凉州');
  }
  if (preferences.includes('低预算穷游')) {
    tags.push('高性价比', '深度穷游');
  }
  if (preferences.includes('舒适休闲')) {
    tags.push('慢节奏', '品质游');
  }
  if (days >= 3) {
    tags.push('全景凉州', '丝路精华');
  }
  
  return tags;
};

const generateDayPlan = (
  day: number,
  themes: { morning?: string; noon?: string; afternoon?: string; evening?: string },
  _budget: BudgetAnalysis
): DailyPlan => {
  const slotData: Record<string, { activity: string; tips: string; duration: string }> = {
    morning: { activity: '开启凉州之旅', tips: '建议早起错峰，8点前到达景区', duration: '2-3小时' },
    noon: { activity: '品味本地风味', tips: '推荐本地特色餐厅，尝试三套车等特色美食', duration: '1.5小时' },
    afternoon: { activity: '深入探索', tips: '下午光线柔和，适合拍照', duration: '2-3小时' },
    evening: { activity: '感受凉州夜色', tips: '夜市7点后渐热闹，是体验本地生活的好时机', duration: '2-3小时' },
  };

  const slots: TimeSlot[] = ['morning', 'noon', 'afternoon', 'evening'].map((time) => {
    const t = time as keyof typeof themes;
    return {
      type: t as 'morning' | 'noon' | 'afternoon' | 'evening',
      places: themes[t] ? [themes[t]] : [],
      activity: themes[t] ? slotData[t].activity : '自由活动',
      duration: themes[t] ? slotData[t].duration : '',
      tips: themes[t] ? slotData[t].tips : '享受悠闲时光',
    };
  });

  return {
    day,
    theme: getDayTheme(day, themes),
    slots,
  };
};

const getDayTheme = (day: number, themes: Record<string, string | undefined>): string => {
  if (day === 1 && themes.morning === 'leitai') return '凉州城内文化线';
  if (day === 2 && themes.morning === 'tianti') return '石窟山水探秘线';
  if (day === 3 && themes.morning === 'desert') return '大漠绿洲体验线';
  if (themes.evening === 'nightmarket') return '古城烟火漫游线';
  return `凉州探索第${day}日`;
};

const generateDay1 = (budget: BudgetAnalysis): DailyPlan => {
  return generateDayPlan(1, {
    morning: 'leitai',
    noon: 'breakfast',
    afternoon: 'museum',
    evening: 'nightmarket',
  }, budget);
};

const generateDay2 = (budget: BudgetAnalysis): DailyPlan => {
  if (budget.level === '经济') {
    return generateDayPlan(2, {
      morning: 'confucian',
      noon: 'hotal',
      afternoon: 'jiujiang',
      evening: 'nightmarket',
    }, budget);
  }
  return generateDayPlan(2, {
    morning: 'tianti',
    noon: 'desertcamp',
    afternoon: 'baita',
    evening: '明清街',
  }, budget);
};

const generateDay3 = (budget: BudgetAnalysis): DailyPlan => {
  if (budget.level === '经济') {
    return generateDayPlan(3, {
      morning: 'confucian',
      noon: 'nopork',
      afternoon: 'jiujiang',
      evening: 'nightmarket',
    }, budget);
  }
  return generateDayPlan(3, {
    morning: 'desert',
    noon: 'desertcamp',
    afternoon: 'jiujiang',
    evening: 'nightmarket',
  }, budget);
};

const generateDay4 = (): DailyPlan => {
  return generateDayPlan(4, {
    morning: 'tianti',
    noon: 'baita',
    afternoon: 'confucian',
    evening: 'nightmarket',
  }, { level: '舒适', pressureIndex: '合理', perDayBudget: 400, totalBudget: 1600, days: 4, breakdown: { hotel: 560, food: 400, tickets: 240, transport: 160, backup: 240 } });
};

const generateDay5 = (): DailyPlan => {
  return generateDayPlan(5, {
    morning: 'desert',
    noon: 'desertcamp',
    afternoon: 'tianti',
    evening: '明清街',
  }, { level: '高级', pressureIndex: '轻松', perDayBudget: 600, totalBudget: 3000, days: 5, breakdown: { hotel: 1200, food: 750, tickets: 360, transport: 240, backup: 450 } });
};

const getWarnings = (budget: BudgetAnalysis, days: number, preferences: string[]): string[] => {
  const warnings: string[] = [];

  if (budget.pressureIndex === '极限') {
    warnings.push('⚠️ 预算较为紧张，建议选择免费或低门票景点，多利用公共交通');
  }
  if (budget.pressureIndex === '偏紧') {
    warnings.push('💡 预算偏紧，可考虑购买景点联票节省门票开支');
  }
  if (days === 1 && !preferences.includes('低预算穷游')) {
    warnings.push('📍 一日游建议优先游览雷台汉墓和博物馆，文庙可留作拍照备选');
  }
  if (days >= 2) {
    warnings.push('🚗 天梯山石窟距市区约40公里，建议预留充足交通时间或拼车前往');
  }
  if (preferences.includes('拍照出片')) {
    warnings.push('📸 清晨和傍晚是最佳拍照时间，文庙古柏和沙漠日落都是绝佳取景地');
  }
  if (preferences.includes('亲子家庭')) {
    warnings.push('👨‍👩‍👧 沙漠公园和博物馆是亲子游的首选，建议安排在同一天');
  }
  if (budget.level === '高级') {
    warnings.push('✨ 高级预算建议选择丝路风情酒店，顶楼可俯瞰凉州夜景');
  }

  return warnings;
};

const getRestaurantIds = (budget: BudgetAnalysis): string[] => {
  const maxPrice = budget.perDayBudget * 0.4;
  return getRestaurantsByPriceRange(maxPrice)
    .slice(0, 6)
    .map(r => r.id);
};

const getHotelId = (budget: BudgetAnalysis): string => {
  const suitableHotels = getHotelsByBudget(budget.perDayBudget * 0.35);
  if (suitableHotels.length === 0) return 'jiudian';
  
  if (budget.level === '经济') {
    return suitableHotels.find(h => h.type === '经济')?.id || suitableHotels[0].id;
  } else if (budget.level === '舒适') {
    return suitableHotels.find(h => h.type === '舒适')?.id || suitableHotels[0].id;
  } else {
    return suitableHotels.find(h => h.type === '高级')?.id || 
           suitableHotels.find(h => h.type === '舒适')?.id || 
           suitableHotels[0].id;
  }
};

export const generateRoute = (
  budget: number,
  days: number,
  preferences: string[]
): GeneratedRoute => {
  const budgetAnalysis = {
    level: budget < 600 ? '经济' as BudgetLevel : budget < 1500 ? '舒适' as BudgetLevel : '高级' as BudgetLevel,
    pressureIndex: (budget / days >= 400 ? '轻松' : budget / days >= 200 ? '合理' : budget / days >= 100 ? '偏紧' : '极限') as '轻松' | '合理' | '偏紧' | '极限',
    perDayBudget: Math.round(budget / days),
    totalBudget: budget,
    days,
    breakdown: calculateBreakdown(budget, days),
  };

  let dailyPlans: DailyPlan[] = [];

  switch (days) {
    case 1:
      dailyPlans = [generateDay1(budgetAnalysis)];
      break;
    case 2:
      dailyPlans = [generateDay1(budgetAnalysis), generateDay2(budgetAnalysis)];
      break;
    case 3:
      dailyPlans = [generateDay1(budgetAnalysis), generateDay2(budgetAnalysis), generateDay3(budgetAnalysis)];
      break;
    case 4:
      dailyPlans = [generateDay1(budgetAnalysis), generateDay2(budgetAnalysis), generateDay3(budgetAnalysis), generateDay4()];
      break;
    case 5:
      dailyPlans = [generateDay1(budgetAnalysis), generateDay2(budgetAnalysis), generateDay3(budgetAnalysis), generateDay4(), generateDay5()];
      break;
    default:
      dailyPlans = [generateDay1(budgetAnalysis)];
  }

  const routeDescriptions: Record<number, string> = {
    1: '这是从雷台汉墓出发，读懂一匹铜奔马背后的汉代凉州；从博物馆的文物中，窥见丝路古城的辉煌；夜晚交给凉州明清街的烟火气，一碗三套车比任何攻略都更接近本地生活。',
    2: '从雷台汉墓到天梯山石窟，从汉唐遗韵走向山水佛光。这条路线让你在两天内，领略凉州文化的多面气质——历史深邃、古迹沧桑、而夜色温柔。',
    3: '三天时间，足以让你成为半个凉州通。从雷台汉墓的铜奔马，到天梯山的石窟佛像；从沙漠公园的大漠落日，到鸠摩罗什寺的晨钟暮鼓；从明清街的三套车到凉州夜市的灯火——这是一场从汉唐走向大漠的完整旅程。',
    4: '四天深度漫游，你将解锁凉州的完整画卷。雷台汉墓的历史、天梯山石窟的艺术、沙漠公园的壮阔、鸠摩罗什寺的禅意——每一面都是凉州，每一面都值得停留。',
    5: '五天四夜，足够把凉州当作第二故乡来体会。清晨在文庙古柏下发呆，午后在大漠绿洲骑骆驼，夜晚在明清街寻味——这不是打卡式旅行，而是一条从汉唐遗韵走向大漠风光的城市慢游路线。',
  };

  return {
    title: getPersonalityLabel(preferences, budgetAnalysis.level),
    subtitle: `「${budgetAnalysis.level}版」${days}天${budgetAnalysis.pressureIndex}型旅行`,
    city: '甘肃省武威市',
    totalBudget: budget,
    days,
    budgetLevel: budgetAnalysis.level,
    pressureIndex: budgetAnalysis.pressureIndex,
    routeTags: getRouteTags(preferences, days),
    personalityLabel: getPersonalityLabel(preferences, budgetAnalysis.level),
    dailyPlans,
    restaurantList: getRestaurantIds(budgetAnalysis),
    hotelRecommendation: getHotelId(budgetAnalysis),
    budgetBreakdown: budgetAnalysis.breakdown,
    warnings: getWarnings(budgetAnalysis, days, preferences),
    routeDescription: routeDescriptions[days] || routeDescriptions[3],
  };
};

function calculateBreakdown(budget: number, _days: number) {
  const level = budget < 600 ? '经济' : budget < 1500 ? '舒适' : '高级';
  let hotelRatio: number, foodRatio: number, ticketRatio: number, transportRatio: number, backupRatio: number;

  if (level === '经济') {
    hotelRatio = 0.30; foodRatio = 0.25; ticketRatio = 0.15; transportRatio = 0.15; backupRatio = 0.15;
  } else if (level === '舒适') {
    hotelRatio = 0.35; foodRatio = 0.25; ticketRatio = 0.15; transportRatio = 0.10; backupRatio = 0.15;
  } else {
    hotelRatio = 0.40; foodRatio = 0.25; ticketRatio = 0.12; transportRatio = 0.08; backupRatio = 0.15;
  }

  return {
    hotel: Math.round(budget * hotelRatio),
    food: Math.round(budget * foodRatio),
    tickets: Math.round(budget * ticketRatio),
    transport: Math.round(budget * transportRatio),
    backup: Math.round(budget * backupRatio),
  };
}
