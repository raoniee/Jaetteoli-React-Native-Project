export function formatPriceWithCurrency(price) {
    const formattedPrice = price.toLocaleString();
  
    return formattedPrice + '원';
  }