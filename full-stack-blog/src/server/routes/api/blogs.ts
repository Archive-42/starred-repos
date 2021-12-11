/** @format */

import { Router } from 'express'

import knextion from '../../db'
import { isUser, BearerStrategy } from '../../middlewares/authCheckpoints'
// blogs(id, title, content, authorid, _created)

let router = Router()

router.use(BearerStrategy())

router.get('/:id?', async (req, res) => {
    let id: number = req.params.id
    let authorid: number
    if (req.query && req.query.authorid) {
        authorid = parseInt(req.query.authorid)
    }

    try {
        let baseQuery = knextion({ b: 'blogs' }) // Grab all blog data
            .leftJoin({ bt: 'blogs_tags' }, 'b.id', '=', 'bt.blogid')
            .leftJoin({ t: 'tags' }, 't.id', '=', 'bt.tagid') // Grab the tags as a ';;'-separated string
            .join({ a: 'authors' }, 'a.id', '=', 'b.authorid') // Get the authorName
            .select('b.*', {
                authorName: 'a.name',
                tags: knextion.raw('GROUP_CONCAT(?? separator ";;")', ['t.name']),
            })

        if (authorid) {
            baseQuery = baseQuery.where({ 'b.authorid': authorid })
        }

        if (id) {
            let blog: IBlog = (await baseQuery.where('b.id', '=', id))[0]
            res.status(200).json(blog)
        } else {
            let blogs: IBlog[] = await baseQuery.groupBy('b.id')
            res.status(200).json(blogs)
        }
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.post('/', isUser, async (req, res) => {
    try {
        let {
            title,
            content,
            authorid,
            tags,
        }: { title: string; content: string; authorid: number; tags: string[] } = req.body
        let blogid = (await knextion('blogs').insert({ title, content, authorid }))[0]
        if (tags) {
            await knextion.raw(
                knextion('tags')
                    .insert(tags.reduce((obj, tag) => ({ ...obj, name: tag.toLowerCase() }), {}))
                    .toQuery()
                    .replace('insert', 'insert ignore'), // ignore duplicate inserts
            )
            let tagids = await knextion('tags')
                .whereIn('name', tags)
                .select<Array<{ id: number }>>('id')
            await knextion('blogs_tags').insert(
                tagids.map((tagid) => ({ tagid: tagid.id, blogid })),
            )
        }
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.put('/:id', isUser, async (req, res) => {
    try {
        let {
            title,
            content,
            authorid,
        }: { title: string; content: string; authorid: number } = req.body
        await knextion('blogs')
            .where('id', req.params.id)
            .update({
                title,
                content,
                authorid,
            })
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.put('/:id/addtags', isUser, async (req, res) => {
    try {
        let tags: string[] = req.body.tags
        let blogid: number = parseInt(req.params.id)
        await knextion.raw(
            knextion('tags')
                .insert(tags.reduce((obj, tag) => ({ ...obj, name: tag.toLowerCase() }), {}))
                .toQuery()
                .replace('insert', 'insert ignore'),
        )
        let tagids = await knextion('tags')
            .whereIn('name', tags)
            .select<Array<{ id: number }>>('id')
        await knextion.raw(
            knextion('blogs_tags')
                .insert(tagids.map((tagid) => ({ tagid: tagid.id, blogid })))
                .toQuery()
                .replace('insert', 'insert ignore'),
        )
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.put('/:id/removetags', isUser, async (req, res) => {
    try {
        let tags: string[] = req.body.tags
        let blogid: number = parseInt(req.params.id)
        let tagids = await knextion('tags')
            .whereIn('name', tags)
            .select<Array<{ id: number }>>('id')
        await knextion('blogs_tags')
            .where({ blogid })
            .whereIn('tagid', tagids.map((obj) => obj.id))
            .del()
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.delete('/:id', isUser, async (req, res) => {
    let id = req.params.id
    try {
        await knextion('blogs_tags')
            .where('blogid', id)
            .del()
        await knextion('blogs')
            .where('id', id)
            .del()
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

export default router
