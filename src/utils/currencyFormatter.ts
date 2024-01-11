export const currencyFormatter = (amount: string) => {
  return amount.replace(/D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
