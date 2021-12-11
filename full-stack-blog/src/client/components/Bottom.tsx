/** @format */

import * as React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'

interface IBottom extends RouteComponentProps {
    // footer: Promise<JSX.Element>,
    footerid: string
}

const Bottom: React.FC<IBottom> = ({ history, footerid }) => {
    const [marginBottom, setMarginBottom] = React.useState(0)
    const loc = history.location.pathname
    const donateButtonVisible = loc === '/home' || loc === '/mytimeline'

    const onEntry: IntersectionObserverCallback = (entry) => {
        for (let change of entry) {
            setMarginBottom(change.intersectionRect.height)
        }
    }

    const intersectionObserver = new IntersectionObserver(onEntry, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    })

    const mutationObserver = new MutationObserver((mutations, observer) => {
        for (let mut of mutations) {
            if (mut.type === 'childList') {
                let footer = document.getElementById(footerid)
                if (footer) {
                    observer.disconnect()
                    intersectionObserver.observe(footer)
                }
            }
        }
    })

    mutationObserver.observe(document.body, { childList: true })

    const styles = {
        marginBottom,
        zIndex: 1,
    }

    return (
        <div className="fixed-bottom d-flex flex-comlumn-reverse" style={styles}>
            <div className="ml-auto position-relative" style={{ height: 0 }}>
                {donateButtonVisible && (
                    <Link
                        to="/donate"
                        id="donate-button"
                        className="btn btn-info rounded-pill mr-md-5 mr-2"
                    >
                        Donate!
                    </Link>
                )}
            </div>
        </div>
    )
}

export default withRouter(Bottom)
