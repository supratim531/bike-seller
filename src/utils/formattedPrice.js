export const formattedPrice = price => {
  price = Number(price);
  return price.toLocaleString("en-US");
}
