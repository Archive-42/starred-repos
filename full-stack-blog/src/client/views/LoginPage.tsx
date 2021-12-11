/** @format */

import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

import useLogin from '../utils/useLogin'
import useSystemAlert from '../utils/useSystemAlert'
import Form from '../components/commons/Form'
import FormField from '../components/commons/FormField'

interface ILoginPage extends RouteComponentProps {
    registering?: boolean
}

const LoginPage: React.FC<ILoginPage> = ({ history, registering }) => {
    const { loginLocal, register } = useLogin()
    const { pushAlert } = useSystemAlert()

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleLogin = () => {
        if (!registering) {
            if (!email || !password) {
                setPassword('')
                return pushAlert(
                    {
                        content: 'Please check for empty fields.',
                        type: 'warning',
                    },
                    3500,
                )
            }
            loginLocal(email, password).then((success) => {
                if (success) {
                    history.push('/')
                } else {
                    setPassword('')
                    return pushAlert(
                        {
                            content:
                                "Our jabberwocky didn't like your credentials. Please try again.",
                            type: 'warning',
                        },
                        3500,
                    )
                }
            })
        } else {
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                setPassword('')
                return pushAlert(
                    {
                        content: 'Please check for empty fields.',
                        type: 'warning',
                    },
                    3500,
                )
            } else if (password !== confirmPassword) {
                setPassword('')
                setConfirmPassword('')
                return pushAlert(
                    {
                        content:
                            "We can't read your mind. Doublecheck your passwords are the same.",
                        type: 'warning',
                    },
                    3500,
                )
            }
            register(firstName + ' ' + lastName, email, password).then((success) => {
                if (success) {
                    history.push('/writeblog')
                } else {
                    return pushAlert(
                        {
                            content:
                                "Our jabberwocky didn't like your credentials. Please try again.",
                            type: 'warning',
                        },
                        3500,
                    )
                }
            })
        }
    }

    return (
        <section className="row d-flex">
            <Form
                submitText={registering ? 'Register' : 'Login'}
                action={handleLogin}
                className="col-10 col-md-8 col-lg-6 border rounded shadow-lg mt-5 mx-auto"
            >
                <p className="text-center mt-3">
                    <span className="text-danger">*</span> Marks required fields
                </p>
                {registering && (
                    <>
                        <FormField
                            required
                            autoFocus
                            state={[firstName, setFirstName]}
                            name="First Name"
                            invalidMessage="Please enter your first name"
                        />
                        <FormField
                            required
                            state={[lastName, setLastName]}
                            name="Last Name"
                            invalidMessage="Please enter your last name"
                        />
                        <hr />
                    </>
                )}
                <FormField
                    required
                    autoFocus={!registering}
                    state={[email, setEmail]}
                    name="Email"
                    type="email"
                    invalidMessage="Please enter a valid email"
                />
                <FormField
                    required
                    state={[password, setPassword]}
                    name="Password"
                    type="password"
                    pattern="^.{8,}$"
                    invalidMessage="A Password must have at least 8 characters"
                />
                {registering && (
                    <FormField
                        required
                        state={[confirmPassword, setConfirmPassword]}
                        name="Confirm Password"
                        type="password"
                    />
                )}
            </Form>
        </section>
    )
}

export default withRouter(LoginPage)
