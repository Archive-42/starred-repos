/** @format */

import * as React from 'react'

import useLogin from '../utils/useLogin'
import useSystemAlert from '../utils/useSystemAlert'
import ViewBlog from '../components/ViewBlog'
import { BLOGS_API } from '../utils/apis'

const MyTimelinePage: React.FC = () => {
    const { user, json } = useLogin()
    const { pushAlert } = useSystemAlert()

    const [blogs, setBlogs] = React.useState<IBlog[]>([])

    React.useEffect(() => {
        ;(async () => {
            try {
                let raw = await json<IBlog[]>(`${BLOGS_API}?authorid=${user.authorid}`)
                setBlogs(raw)
            } catch (err) {
                pushAlert(
                    {
                        content:
                            'It seems we are having difficulties communicating with the server deities. Please try again later.',
                        type: 'danger',
                    },
                    5000,
                )
            }
        })()
    }, [user.authorid])

    return (
        <section className="row">
            <h1 className="col-12 text-center font-italic my-5">Your Blogs</h1>
            {blogs.map((blog) => (
                <ViewBlog key={blog.id} blog={blog} />
            ))}
        </section>
    )
}

export default MyTimelinePage
