/** @format */

import * as bcrypt from 'bcrypt'

export const ComparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}

export const HashPassword = (password: string) => {
    let saltRounds = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, saltRounds)
}
