/** @format */

import { Router } from 'express'

import knextion from '../../db'
import { isUser, isAdmin, BearerStrategy } from '../../middlewares/authCheckpoints'
// tags(id, name, _created)

let router = Router()

router.use(BearerStrategy())

router.get('/:id?', async (req, res) => {
    let id: number = parseInt(req.params.id)
    try {
        if (id) {
            res.status(200).json(
                (await knextion('tags')
                    .where({ id })
                    .select())[0],
            )
        } else {
            res.status(200).json(await knextion('tags').select())
        }
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.get('/findlike/:tagpart', isUser, async (req, res) => {
    let tagpart: string = req.params.tagpart
    let maxResults = parseInt(req.body.maxResults) || 7
    try {
        let query = knextion('tags')
            .where('name', 'like', '%' + tagpart + '%')
            .orWhere('name', 'like', tagpart + '%')
            .limit(maxResults)
            .select<ITag[]>('name')
        res.status(200).json((await query).map((tag) => tag.name))
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.post('/', isUser, async (req, res) => {
    try {
        let { tag, tags }: { tag: string; tags: string[] } = req.body
        if (!tags && !tag) {
            return res.status(422).json('Missing `tag` or `tags` in body')
        } else if (!tags) {
            tags = [tag]
        } else {
            tags = [...tags, tag]
        }

        let query = knextion('tags').insert(
            tags.map((name) => {
                name
            }),
        )
        // The only current way to ignore duplicate insert errors
        await knextion.raw(query.toQuery().replace('insert', 'insert ignore'))

        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.put('/:id', isAdmin, async (req, res) => {
    let id: number = req.params.id
    let name: string = req.body.name
    if (!id || !name) {
        return res.status(422).json('Invalid `id` on endpoint or missing `name` in body')
    }
    try {
        await knextion('tags')
            .where({ id })
            .update({ name })
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.delete('/:id', isAdmin, async (req, res) => {
    let id: number = req.params.id
    if (!id) {
        return res.status(422).json('Invalid `id` on endpoint')
    }
    try {
        await knextion('blogs_tags')
            .where({ tagid: id })
            .del()
        await knextion('tags')
            .where({ id })
            .del()
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

export default router
