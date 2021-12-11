/** @format */

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import useSystemAlert from '../utils/useSystemAlert'
import useLogin from '../utils/useLogin'
import { FEEDBACK_API, join } from '../utils/apis'
import Form from '../components/commons/Form'
import FormField from '../components/commons/FormField'

interface IFeedbackPage extends RouteComponentProps {}

const FeedbackPage: React.FC<IFeedbackPage> = ({ history }) => {
    const { json, isLoggedIn } = useLogin()
    const { pushAlert } = useSystemAlert()

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [subject, setSubject] = React.useState('')
    const [content, setContent] = React.useState('')

    if (!isLoggedIn) {
        pushAlert({ content: 'Please log in to send us feedback.' }, 5000)
        history.push('/login')
        return <></>
    }

    React.useEffect(() => {
        document.getElementById('Name').focus()
    }, [])

    const handleForm = async () => {
        if (!name.length || !email.length || !subject.length || !content.length) {
            return pushAlert(
                { content: 'Please double check all your fields are filled out.', type: 'warning' },
                7000,
            )
        }
        try {
            await json(join(FEEDBACK_API, 'spam-me'), 'POST', {
                from: `${name} <${email}>`,
                subject,
                content,
                hasHtml: false,
            })
        } catch (err) {
            pushAlert(
                {
                    content:
                        'Sorry, we are having issues with getting your feedback. Please try again later.',
                    type: 'danger',
                },
                7000,
            )
        }
        pushAlert({ content: 'Thanks for your feedback!' }, 5000)
        history.push('/')
    }

    return (
        <section className="row">
            <Form
                submitText="Send feedback"
                action={handleForm}
                className="mt-5 mb-4 col-xl-8 col-lg-10 mx-auto border rounded-lg shadow"
            >
                <FormField name="Name" state={[name, setName]} />
                <FormField name="Email" state={[email, setEmail]} />
                <FormField name="Subject" state={[subject, setSubject]} />
                <FormField name="Content" state={[content, setContent]} type="textarea" />
            </Form>
        </section>
    )
}

export default withRouter(FeedbackPage)
