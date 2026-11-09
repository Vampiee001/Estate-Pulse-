export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP';

export const CURRENCY_RATES: Record<Currency, { rateToAED: number; symbol: string; prefix: boolean }> = {
  AED: { rateToAED: 1, symbol: 'AED', prefix: false },
  USD: { rateToAED: 3.6725, symbol: '$', prefix: true },
  EUR: { rateToAED: 3.98, symbol: '€', prefix: true },
  GBP: { rateToAED: 4.65, symbol: '£', prefix: true },
};

export function formatPrice(aedAmount: number, currency: Currency = 'AED'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.AED;
  const converted = Math.round(aedAmount / info.rateToAED);

  const formattedNum = converted.toLocaleString();
  if (info.prefix) {
    return `${info.symbol}${formattedNum}`;
  }
  return `${formattedNum} ${info.symbol}`;
}

export function formatCurrencyShort(aedAmount: number, currency: Currency = 'AED'): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.AED;
  const converted = aedAmount / info.rateToAED;

  if (converted >= 1_000_000) {
    const millions = (converted / 1_000_000).toFixed(2).replace(/\.00$/, '');
    return info.prefix ? `${info.symbol}${millions}M` : `${millions}M ${info.symbol}`;
  }
  if (converted >= 1_000) {
    const thousands = Math.round(converted / 1_000);
    return info.prefix ? `${info.symbol}${thousands}K` : `${thousands}K ${info.symbol}`;
  }

  return formatPrice(aedAmount, currency);
}

export function createWhatsAppUrl(phoneNumber: string = '+971501234567', message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function calculateDaysRemaining(targetDateStr: string, baseDateStr: string = '2026-04-16'): number {
  const target = new Date(targetDateStr);
  const base = new Date(baseDateStr);
  const diffTime = target.getTime() - base.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
