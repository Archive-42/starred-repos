/** @format */

import { Router } from 'express'

import knextion from '../../db'
import { BearerStrategy, isUser, isAdmin } from '../../middlewares/authCheckpoints'
// authors(id, name, email, hash, role, _created)

let router = Router()

router.use(BearerStrategy())

// Just poking some fun at my instructor =P
// This will get removed in the next section :(
router.get('/find-luke-lolololol', async (req, res) => {
    try {
        let allLukes = await knextion('authors')
            .where('name', '=', 'Luke Skywalker')
            .select()
        console.log(allLukes)
        if (allLukes.length) {
            res.status(200).json(allLukes[0])
        } else {
            let id: number[] = await knextion('authors').insert({
                name: 'Luke Skywalker',
                email: 'lkskywalker@jediacademy.edu',
            })
            res.status(200).json(
                (await knextion('authors')
                    .where({ id })
                    .select())[0],
            )
        }
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.get('/:id?', isUser, async (req, res) => {
    let id: number = parseInt(req.params.id)
    if (id === NaN) {
        return res.status(422).json('Invalid `id`')
    }
    try {
        if (id) {
            let [author] = await knextion('authors')
                .where({ id })
                .select<IAuthor[]>()
            delete author.hash
            res.status(200).json(author)
        } else {
            let authors = await knextion('authors').select<IAuthor[]>()
            res.status(200).json(authors.map((a) => ({ ...a, hash: undefined })))
        }
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    let { name, email }: { name: string; email: string } = req.body
    if (!name || !email) {
        return res.status(422).json('Missing `name` or `email` in body')
    }
    try {
        await knextion('authors').insert({ name, email })
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.put('/:id', isUser, async (req, res) => {
    let { name, email }: { name: string; email: string } = req.body
    if (!name && !email) {
        return res.status(422).json('Missing `name` or `email` in body')
    }
    let id: number = parseInt(req.params.id)
    if (!id) {
        return res.status(422).json('Invalid `id`')
    }
    try {
        await knextion('authors')
            .where({ id })
            .update({ name, email })
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.delete('/:id', isAdmin, async (req, res) => {
    let id: string = req.params.id
    if (!parseInt(id)) {
        return res.status(422).json('Invalid `id`')
    }
    try {
        await knextion('blogs_tags')
            .join('blogs', { 'blogs.authorid': id })
            .where('blogs_tags.blogid', '=', 'blogs.id')
            .del()
        await knextion('blogs')
            .where({ authorid: id })
            .del()
        await knextion('tokens')
            .where({ authorid: id })
            .del()
        await knextion('authors')
            .where({ id })
            .del()
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

export default router
