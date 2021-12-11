/** @format */

import * as React from 'react'
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'

import useSystemAlert from '../utils/useSystemAlert'
import { DONATIONS_API, unauthedJson } from '../utils/apis'
import Form from './commons/Form'
import FormField from './commons/FormField'

interface IDonationForm extends ReactStripeElements.InjectedStripeProps {}

const DonationForm: React.FC<IDonationForm> = ({ stripe }) => {
    const { pushAlert } = useSystemAlert()

    const amounts = [5, 10]

    const [name, setName] = React.useState('')
    const [amount, setAmount] = React.useState<number>(5)
    const [custom, setCustom] = React.useState(false)

    React.useEffect(() => {
        if (custom && document.getElementById('CustomAmount')) {
            document.getElementById('CustomAmount').focus()
        }
    }, [custom, document.getElementById('CustomAmount')])

    const handleSubmit = async () => {
        let { token } = await stripe.createToken({
            name,
            currency: 'usd',
        })
        if (!token) {
            return pushAlert(
                { content: 'Please double check your card information', type: 'warning' },
                4000,
            )
        }
        try {
            await unauthedJson(DONATIONS_API, 'POST', { tokenid: token.id, amount, name })
            pushAlert({ content: '❤ Thank you so much for your financial support! ❤' }, 20000)
        } catch (err) {
            console.log(err)
            pushAlert(
                {
                    content:
                        'It looks like we are having difficulties receiving donations right now. 😞',
                    type: 'warning',
                },
                5000,
            )
        }
    }

    const handleRadioChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log('event!')
        console.log(e.target.value)
        if (e.target.value === 'custom') {
            setCustom(true)
        } else {
            setCustom(false)
            setAmount(parseInt(e.target.value))
        }
    }

    return (
        <Form
            action={handleSubmit}
            submitText="Donate!"
            className="col-lg-6 col-md-8 mx-4 mx-sm-auto mt-5 border rounded-lg shadow d-flex flex-column"
        >
            <h6 className="text-center text-dark font-italic mt-3 mb-n1">
                This is just a demo! But I still would not provide your real card information...
            </h6>
            <FormField
                name="Name"
                state={[name, setName]}
                required
                invalidMessage="Please enter your name. We need to know who to thank!"
            />
            <div className="form-group m-3">
                <label htmlFor="CardInfo"> Card Info </label>
                <CardElement id="CardInfo" className="p-2 border rounded form-control" />
                <small className="text-dark mt-2">
                    You can input a fake card and date as 4242424242...
                </small>
            </div>
            <div className="btn-group btn-group-toggle m-3 mx-auto" data-toggle="buttons">
                {amounts.map((amt) => (
                    <label
                        className={'btn btn-primary' + (!custom && amount === amt ? ' active' : '')}
                        key={amt}
                    >
                        <input
                            type="radio"
                            name="amount"
                            value={amt.toString()}
                            checked={!custom && amount === amt}
                            onChange={handleRadioChange}
                        />
                        ${amt}
                    </label>
                ))}
                <label className={'btn btn-primary' + (custom ? ' active' : '')}>
                    <input
                        type="radio"
                        name="amount"
                        value="custom"
                        checked={custom}
                        onChange={handleRadioChange}
                    />
                    Custom
                </label>
            </div>
            {custom && (
                <FormField
                    id="CustomAmount"
                    name="Custom Amount"
                    state={['$' + amount, (x) => setAmount(parseInt(x.slice(1)))]}
                    transform={(s) => '$' + (parseInt(s.replace('$', '')) || 0)}
                />
            )}
        </Form>
    )
}

export default injectStripe(DonationForm)
