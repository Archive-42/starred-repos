/** @format */

import * as stripeLoader from 'stripe'

const stripe = new stripeLoader(process.env.STRIPE_SK)

export const stripeCharge = (tokenid: string, amountUSD: number, description: string) => {
    return stripe.charges.create({
        source: tokenid,
        amount: amountUSD * 100,
        currency: 'usd',
        description,
    })
}
