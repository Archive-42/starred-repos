/** @format */

import { Router } from 'express'

import { stripeCharge } from '../../utils/apis/stripe'

const router = Router()

router.post('/', async (req, res) => {
    let { tokenid, amount, name }: { tokenid: string; amount: string; name: string } = req.body
    let donation = await stripeCharge(tokenid, parseInt(amount), 'Donation by: ' + name)
    if (!donation) {
        res.status(400).json('Failed to create charge')
    }
    res.status(200).json('success')
})

export default router
