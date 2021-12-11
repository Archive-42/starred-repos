/** @format */

import * as React from 'react'
import * as _ from 'lodash'

import { BLOGS_API } from '../utils/apis'
import useLogin from '../utils/useLogin'
import ViewBlog from '../components/ViewBlog'
import useSystemAlert from '../utils/useSystemAlert'

const HomePage: React.FC = () => {
    const [blogs, setBlogs] = React.useState<IBlog[]>([])

    const { json } = useLogin()

    const { pushAlert } = useSystemAlert()

    React.useEffect(() => {
        ;(async () => {
            try {
                let rawBlogs: IBlog[] = await json<IBlog[]>(BLOGS_API)
                setBlogs(
                    rawBlogs.map((b) => ({
                        ...b,
                        tagList: b.tags ? b.tags.split(';;') : [],
                    })),
                )
            } catch (err) {
                pushAlert(
                    {
                        content: 'It seems we are having difficulties connecting to our servers...',
                        type: 'danger',
                    },
                    5000,
                )
            }
        })()
    }, [])

    return (
        <section className="row">
            <h1 className="text-center col-12 my-5 font-italic"> All Blogs </h1>
            {_.reverse(blogs.map((blog) => <ViewBlog key={blog.id} blog={blog} preview />))}
        </section>
    )
}

export default HomePage
