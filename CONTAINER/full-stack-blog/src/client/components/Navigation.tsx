/** @format */

import * as React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import useLogin from '../utils/useLogin'

interface INavigation extends RouteComponentProps {}

const Navigation: React.FC<INavigation> = ({ history }) => {
    const { logout, isLoggedIn } = useLogin()
    const [expanded, setExpanded] = React.useState(false)

    const handleLogout: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        logout()
        setExpanded(false)
        history.push('/')
    }

    const handleButtonClicked: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.currentTarget.blur()
        setExpanded(false)
    }

    return (
        <Navbar expand="sm" expanded={expanded} bg="dark" variant="dark">
            <Navbar.Brand className={'my-1 mx-sm-3' + (expanded ? ' mx-auto' : '')}>
                <LinkContainer to="/home">
                    <Button onClick={handleButtonClicked} variant="dark">
                        Home
                    </Button>
                </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle
                onClick={() => setExpanded(!expanded)}
                aria-controls="basic-navbar-nav"
                className="ml-n5"
            />
            <Navbar.Collapse>
                {isLoggedIn ? (
                    <>
                        <Nav className="align-items-center mr-auto">
                            <LinkContainer to="/mytimeline" className="my-1 mx-3">
                                <Button onClick={handleButtonClicked} variant="dark">
                                    My Timeline
                                </Button>
                            </LinkContainer>
                            <LinkContainer to="/writeblog" className="my-1 mx-3">
                                <Button onClick={handleButtonClicked} variant="dark">
                                    New Blog
                                </Button>
                            </LinkContainer>
                        </Nav>
                        <Nav className="align-items-center">
                            <Button variant="dark" className="my-1 mx-3" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Nav>
                    </>
                ) : (
                    <Nav className="align-items-center ml-auto">
                        <LinkContainer to="/login" className="my-1 mx-3 ml-sm-auto">
                            <Button onClick={handleButtonClicked} variant="dark">
                                Login
                            </Button>
                        </LinkContainer>
                        <LinkContainer to="/register" className="my-1 mx-3">
                            <Button onClick={handleButtonClicked} variant="dark">
                                Register
                            </Button>
                        </LinkContainer>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation)
