/** @format */

import * as React from 'react'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import * as moment from 'moment'

import useLogin from '../utils/useLogin'
import useSystemAlert from '../utils/useSystemAlert'
import { BLOGS_API, join } from '../utils/apis'
import TagBox from '../components/commons/TagBox'
import MarkDown from '../components/commons/MarkDown'

interface IViewBlogsPage extends RouteComponentProps<{ blogid: string }> {}

const ViewBlogPage: React.FC<IViewBlogsPage> = ({ match, history }) => {
    const { user, json } = useLogin()
    const { pushAlert } = useSystemAlert()

    let id = parseInt(match.params.blogid)
    const [blog, setBlog] = React.useState<IBlog>({
        id: null,
        authorid: null,
        authorName: '',
        content: '',
        title: '',
        tags: null,
        tagList: [],
    })

    React.useEffect(() => {
        ;(async () => {
            try {
                let rawBlog = await json<IBlog>(join(BLOGS_API, `${id}`))
                setBlog(
                    rawBlog.tags
                        ? { ...rawBlog, tagList: rawBlog.tags.split(';;') }
                        : { ...rawBlog, tagList: [] },
                )
            } catch (err) {
                pushAlert(
                    {
                        content: 'It seems this blog is being tricky. Please try again later.',
                        type: 'danger',
                    },
                    4000,
                )
            }
        })()
    }, [id])

    const handleDelete: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (confirm('Are you sure you want to delete this blog post? There is no going back...')) {
            json(join(BLOGS_API, `${id}`), 'DELETE').then(() => {
                pushAlert({ content: 'Blog deleted', type: 'warning' }, 3000)
                history.push('/')
            })
        }
    }

    return (
        <section className="row">
            <div className="col-12 d-flex flex-column">
                <article className="card my-5 shadow-lg rounded-lg">
                    <div className="card-header d-flex flex-column">
                        <div id="title" className="d-flex">
                            <h3 className="card-title ml-5 mt-2">{blog.title}</h3>
                            {user.authorid === blog.authorid && (
                                <small
                                    className="ml-2 align-self-center"
                                    style={{ fontSize: '1rem' }}
                                >
                                    &mdash;
                                    <Link to={`/edit/${blog.id}`} className="ml-2">
                                        edit
                                    </Link>
                                    ,
                                    <a onClick={handleDelete} className="ml-2" href="">
                                        delete
                                    </a>
                                </small>
                            )}
                        </div>
                        <small className="text-muted ml-auto mr-md-5">
                            by {blog.authorName}
                            {blog._created
                                ? ' — ' + moment(blog._created).format('D MMMM[,] YY')
                                : ''}
                        </small>
                        <TagBox tags={blog.tagList} />
                    </div>
                    <div className="card-body d-flex flex-column">
                        <div className="card-text text-wrap my-3 ml-3">
                            <MarkDown content={blog.content} />
                        </div>
                    </div>
                </article>
                <button className="btn bg-light my-3 mx-auto" onClick={() => history.goBack()}>
                    Go Back
                </button>
            </div>
        </section>
    )
}

export default withRouter(ViewBlogPage)
