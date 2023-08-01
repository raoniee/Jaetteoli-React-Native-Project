export function formatPriceWithCurrency(price) {
    if(price === undefined){
      return ''
    }
    const formattedPrice = price.toLocaleString();
  
    return formattedPrice + '원';
  }