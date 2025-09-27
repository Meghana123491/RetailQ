// Currency conversion utility for USD to INR
const USD_TO_INR_RATE = 83.15; // Approximate rate, in real app this would be fetched from API

export const convertToINR = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_INR_RATE * 100) / 100;
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// In a real app, this would be a user preference
export const formatPrice = (usdAmount: number, currency: 'USD' | 'INR' = 'INR') => {
  if (currency === 'INR') {
    return formatINR(convertToINR(usdAmount));
  }
  return formatUSD(usdAmount);
};