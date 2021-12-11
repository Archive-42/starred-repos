/** @format */

import * as mailgunLoader from 'mailgun-js'

const mailgun = mailgunLoader({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
})

interface IEmail {
    from: string
    to: string
    subject: string
    content: string
    hasHtml?: boolean
}

export const sendEmail = (
    { from, to, subject, content, hasHtml = false }: IEmail,
    callback?: (error: mailgunLoader.Error, body: mailgunLoader.messages.SendResponse) => void,
) => {
    mailgun.messages().send(
        {
            from,
            to,
            subject,
            text: !hasHtml ? content : undefined,
            html: hasHtml ? content : undefined,
        },
        callback,
    )
}
