const convertToSubCurrency = (amount: number, factor: number = 100) => {
  return Math.floor(amount * factor)
}

export default convertToSubCurrency;