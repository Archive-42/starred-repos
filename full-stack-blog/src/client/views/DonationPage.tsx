/** @format */

import * as React from 'react'
import { StripeProvider, Elements } from 'react-stripe-elements'

import DonationForm from '../components/DonationForm'

interface IDonatePage {}

const DonatePage: React.FC<IDonatePage> = () => {
    return (
        <section className="row">
            <StripeProvider apiKey="pk_test_asMYFlt9Ea1QxqEED8gAxrMT00FyBb79XT">
                <Elements>
                    <DonationForm />
                </Elements>
            </StripeProvider>
        </section>
    )
}

export default DonatePage
