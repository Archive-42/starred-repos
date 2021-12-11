/** @format */

import * as React from 'react'

import { AlertContext } from '../components/context/AlertContext'
import { ISystemAlert } from '../components/commons/SystemAlert'

const useSystemAlert = () => {
    const [alerts, setAlerts, id, setId] = React.useContext(AlertContext)

    const removeAlert = (id: number) =>
        function() {
            let alert = document.getElementById(`${id}`)
            if (!alert || alert.classList.contains('alert-fadeout')) {
                return
            }
            alert.classList.add('alert-fadeout')
            setTimeout(() => {
                setAlerts((prevAlerts: { [key: string]: ISystemAlert }) => {
                    prevAlerts = { ...prevAlerts }
                    delete prevAlerts[id]
                    return prevAlerts
                })
            }, 410)
        }

    const pushAlert = (newAlert: ISystemAlert, delayms: number = 2000) => {
        setId((prevId) => {
            setAlerts((prevAlerts: { [key: string]: ISystemAlert }) => {
                if (delayms) {
                    setTimeout(() => {
                        removeAlert(prevId)()
                    }, delayms)
                }
                return {
                    ...prevAlerts,
                    [prevId]: { ...newAlert, id: prevId, remove: removeAlert(prevId) },
                }
            })
            return prevId + 1
        })
    }

    return {
        pushAlert,
    }
}

export default useSystemAlert
