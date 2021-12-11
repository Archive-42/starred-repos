/** @format */

import { Router } from 'express'

import { HashPassword } from '../../utils/security/passwords'
import knextion from '../../db'
import { CreateToken } from '../../utils/security/tokens'

const router = Router()

router.post('/', async (req, res) => {
    try {
        let body = req.body
        if (!body || !body.email || !body.password || !body.name) {
            res.status(422).json('The body must have email, password, and name attributes')
        }
        let [authorid] = await knextion('authors').insert<number[]>({
            email: body.email,
            hash: HashPassword(body.password),
            name: body.name,
        })
        let token = await CreateToken({ authorid })
        res.json({
            token,
            authorid,
            role: 'guest',
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

export default router
