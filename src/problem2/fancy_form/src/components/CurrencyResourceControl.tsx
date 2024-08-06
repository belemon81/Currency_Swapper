export interface Currency {
    currency: string,
    date: Date,
    price: number
}

export interface Amount {
    currencyType: Currency,
    amount: number
}

export const swapCurrency = (from: Amount, type: Currency): number => {
    return from.amount / from.currencyType.price * type.price
}