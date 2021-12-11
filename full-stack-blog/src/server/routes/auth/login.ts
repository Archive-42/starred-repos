/** @format */

import { Router } from 'express'
import * as passport from 'passport'

import { CreateToken, RecoverToken } from '../../utils/security/tokens'

const router = Router()

router.post('/', passport.authenticate('local'), async (req, res) => {
    try {
        let token: string = await RecoverToken(req.user.id)
        if (!token) {
            token = await CreateToken({ authorid: req.user.id })
        }
        res.json({
            token,
            authorid: req.user.id,
            role: req.user.role,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

export default router
