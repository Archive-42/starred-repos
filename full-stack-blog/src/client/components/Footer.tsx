/** @format */

import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface IFooter {
    id: string
}

const Footer: React.FC<IFooter> = ({ id }) => {
    return (
        <footer className="footer mt-auto py-3 bg-dark" id={id}>
            <section className="row d-flex w-100 mx-auto justify-content-center">
                <div
                    className="col-12 col-md-3 d-flex flex-column text-md-left text-center"
                    id="contacts"
                >
                    <NavLink to="/feedback">Send Feedback!</NavLink>
                    <NavLink to="/feedback">Spam us with messages!</NavLink>
                    <NavLink to="/feedback">Send us your credit card information and SSN!</NavLink>
                </div>
                <div
                    className="col-12 col-md-3 d-flex flex-column text-md-left text-center"
                    id="contacts"
                >
                    <NavLink to="#">Lorem Ipsum</NavLink>
                    <NavLink to="#">Lorem Ipsum</NavLink>
                    <NavLink to="#">Lorem Ipsum</NavLink>
                </div>
            </section>
        </footer>
    )
}

export default Footer
