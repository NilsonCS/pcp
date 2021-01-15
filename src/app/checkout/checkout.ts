export interface Checkout {
    "checkoutId": number,
    "cartId": number,
    "paymentDetailsId": number,
    "date": Date,
    "total": number,
    "contact": string,
    "address": string
}