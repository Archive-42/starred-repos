/** @format */

import * as React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import HomePage from './views/HomePage'
import MyTimelinePage from './views/MyTimelinePage'
import LoginPage from './views/LoginPage'
import WriteBlogPage from './views/WriteBlogPage'
import ViewBlogPage from './views/ViewBlogPage'
import _404Page from './views/_404Page'
import DonationPage from './views/DonationPage'
import FeedbackPage from './views/FeedbackPage'

import { LoginProvider, LoginSubscriber } from './components/context/LoginContext'
import { AlertProvider, AlertContainer } from './components/context/AlertContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Bottom from './components/Bottom'

const App: React.FC = () => {
    let footerid = 'footer-id'

    return (
        <Router>
            <LoginProvider>
                <AlertProvider>
                    <LoginSubscriber />
                    {/* The <Bottom> component must be rendered first to allow the donate button to be clicked
                        but the main screen to be in front of an element with class .fixed-bottom */}
                    <Bottom footerid={footerid} />
                    <main role="main" className="d-flex flex-column h-100" style={{ zIndex: -2 }}>
                        <Navigation />
                        <div className="container">
                            <AlertContainer />
                            <Switch>
                                {/* General */}
                                <Route path="/home" component={HomePage} />
                                <Route path="/mytimeline" component={MyTimelinePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route
                                    path="/register"
                                    component={() => <LoginPage registering />}
                                />
                                {/* Blogs */}
                                <Route path="/view/:blogid" component={ViewBlogPage} />
                                <Route path="/edit/:blogid" component={WriteBlogPage} />
                                <Route path="/writeblog" component={WriteBlogPage} />
                                {/* Feedback and Donations */}
                                <Route path="/donate" component={DonationPage} />
                                <Route path="/feedback" component={FeedbackPage} />
                                {/* Redirects */}
                                <Redirect exact from="/" to="/home" />
                                <Route path="/" component={_404Page} />
                            </Switch>
                            <section className="row mb-5"></section>
                        </div>
                        <Footer id={footerid} />
                    </main>
                </AlertProvider>
            </LoginProvider>
        </Router>
    )
}

export default App
