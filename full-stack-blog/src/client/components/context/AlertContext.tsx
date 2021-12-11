/** @format */

import * as React from 'react'

import SystemAlert, { ISystemAlert } from '../commons/SystemAlert'

// Basically, this context holds two states and their setter functions
// Typescript just makes it look fun
const AlertContext = React.createContext<
    [
        { [key: string]: ISystemAlert },
        React.Dispatch<React.SetStateAction<{ [key: string]: ISystemAlert }>>,
        number,
        React.Dispatch<React.SetStateAction<number>>,
    ]
>([{}, (alert) => console.log('This should never run'), -1, () => console.log('This neither')])

const AlertProvider: React.FC = ({ children }) => {
    const [alerts, setAlerts] = React.useState<{ [key: string]: ISystemAlert }>({})
    const [id, setId] = React.useState(0)

    return (
        <AlertContext.Provider value={[alerts, setAlerts, id, setId]}>
            {children}
        </AlertContext.Provider>
    )
}

const AlertContainer: React.FC = () => {
    const [alerts] = React.useContext(AlertContext)

    return (
        <div id="alerts" className={Object.keys(alerts).length ? 'mt-3 mb-n5' : ''}>
            {Object.values(alerts).map((alertData: ISystemAlert) => (
                <SystemAlert key={alertData.id} {...alertData} />
            ))}
        </div>
    )
}

export { AlertProvider, AlertContext, AlertContainer }
