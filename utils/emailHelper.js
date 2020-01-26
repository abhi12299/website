const errorCodes = require('../constants/errorCodes');
const { sendEmailToAdmins } = require('../mailer');

module.exports = async (code, data, req) => {
    let subject = 'Portfolio Dashboard Warning!', body;

    switch (code) {
        case errorCodes[0]: // notadmin 
            // this will never happen coz passport will handle it
            body = `
                <p>Hello from Portfolio Dashboard!</p>
                <p>
                    A recent attempt was made to login to the dashboard from
                    an email that isn't registered as administrator. The details
                    of the event are as follows:
                    <ul>
                        <li>Time: ${new Date().toLocaleString()}</li>
                        <li>MongoDB Object ID: ${data._id}</li>
                        <li>Session ID: ${data.sessionId}</li>
                        <li>Endpoint: ${req.path}</li>
                        <li>IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</li>
                    </ul>
                </p>
                <p>For more details, please check the server logs.</p>
            `;
            break;
        case errorCodes[1]: // session not found
            body = `
                <p>Hello from Portfolio Dashboard!</p>
                <p>
                    A recent login attempt to dashboard was observed
                    with a failure because of non existent session.
                    The details of the event are as follows:
                    <ul>
                        <li>Time: ${new Date().toLocaleString()}</li>
                        <li>Email: ${data.email}</li>
                        <li>Session ID: ${data.sessionId}</li>
                        <li>Endpoint: ${req.path}</li>
                        <li>IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</li>
                    </ul>
                </p>
                <p>For more details, please check the server logs.</p>
            `;
            break;
        case errorCodes[2]: // session timeout
        body = `
            <p>Hello from Portfolio Dashboard!</p>
            <p>
                A recent login attempt to dashboard was observed
                with a failure because of an expired session.
                The details of the event are as follows:
                <ul>
                    <li>Time: ${new Date().toLocaleString()}</li>
                    <li>Email: ${data.email}</li>
                    <li>Session ID: ${data.sessionId}</li>
                    <li>Endpoint: ${req.path}</li>
                    <li>IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</li>
                </ul>
            </p>
            <p>For more details, please check the server logs.</p>
        `;
            break;
        default:
            return;
    }

    await sendEmailToAdmins(subject, body);
}
