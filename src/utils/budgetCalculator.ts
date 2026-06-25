export type BudgetLevel = '经济' | '舒适' | '高级';

export interface BudgetBreakdown {
  hotel: number;
  food: number;
  tickets: number;
  transport: number;
  backup: number;
}

export interface BudgetAnalysis {
  level: BudgetLevel;
  pressureIndex: '轻松' | '合理' | '偏紧' | '极限';
  perDayBudget: number;
  totalBudget: number;
  days: number;
  breakdown: BudgetBreakdown;
}

const getBudgetLevel = (budget: number): BudgetLevel => {
  if (budget < 600) return '经济';
  if (budget < 1500) return '舒适';
  return '高级';
};

const getPressureIndex = (budget: number, days: number): '轻松' | '合理' | '偏紧' | '极限' => {
  const perDay = budget / days;
  if (perDay >= 400) return '轻松';
  if (perDay >= 200) return '合理';
  if (perDay >= 100) return '偏紧';
  return '极限';
};

export const calculateBudget = (
  totalBudget: number,
  days: number,
  preferences: string[]
): BudgetAnalysis => {
  const level = getBudgetLevel(totalBudget);
  const pressureIndex = getPressureIndex(totalBudget, days);
  const perDayBudget = totalBudget / days;

  // 预算分配比例
  let hotelRatio: number;
  let foodRatio: number;
  let ticketRatio: number;
  let transportRatio: number;
  let backupRatio: number;

  if (level === '经济') {
    hotelRatio = 0.30;
    foodRatio = 0.25;
    ticketRatio = 0.15;
    transportRatio = 0.15;
    backupRatio = 0.15;
  } else if (level === '舒适') {
    hotelRatio = 0.35;
    foodRatio = 0.25;
    ticketRatio = 0.15;
    transportRatio = 0.10;
    backupRatio = 0.15;
  } else {
    hotelRatio = 0.40;
    foodRatio = 0.25;
    ticketRatio = 0.12;
    transportRatio = 0.08;
    backupRatio = 0.15;
  }

  const hotel = Math.round(totalBudget * hotelRatio);
  const food = Math.round(totalBudget * foodRatio);
  const tickets = Math.round(totalBudget * ticketRatio);
  const transport = Math.round(totalBudget * transportRatio);
  const backup = Math.round(totalBudget * backupRatio);

  return {
    level,
    pressureIndex,
    perDayBudget: Math.round(perDayBudget),
    totalBudget,
    days,
    breakdown: {
      hotel,
      food,
      tickets,
      transport,
      backup,
    },
  };
};

export const formatMoney = (amount: number): string => {
  return `¥${amount.toLocaleString()}`;
};

export const getBudgetDescription = (analysis: BudgetAnalysis): string => {
  const descriptions: Record<BudgetLevel, Record<string, string>> = {
    '经济': {
      '轻松': '预算充裕，可以舒适穷游',
      '合理': '精打细算的穷游体验',
      '偏紧': '需要精打细算',
      '极限': '极限穷游，丰俭由人',
    },
    '舒适': {
      '轻松': '宽裕的舒适旅行',
      '合理': '恰到好处的舒适体验',
      '偏紧': '追求性价比的舒适游',
      '极限': '舒适边缘的实惠选择',
    },
    '高级': {
      '轻松': '奢华深度游',
      '合理': '高品质旅行体验',
      '偏紧': '高端体验的入门选择',
      '极限': '高端体验的起步预算',
    },
  };

  return descriptions[analysis.level][analysis.pressureIndex];
};
