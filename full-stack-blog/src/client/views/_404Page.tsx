/** @format */

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface I_404Page extends RouteComponentProps {}

const _404Page: React.FC<I_404Page> = ({ history }) => {
    return (
        <section className="row d-flex mt-5">
            <h1 style={{ fontSize: '6rem' }} className="col-12 text-center">
                404 Page not found!
            </h1>
            <h2 className="col-12 text-center my-3">
                Sorry. We were not able to find that page ¯\_(ツ)_/¯
            </h2>
            <button className="btn btn-info mt-4 mx-auto" onClick={() => history.goBack()}>
                Go Back
            </button>
        </section>
    )
}

export default withRouter(_404Page)
