# Portfolio Website using Next.JS

To run this locally, clone this repo and `cd` in the project directory

<ol>
    <li>
    <pre>echo "MONGO_URI=mongodb://localhost:27017/website
    PORT=3001
    REDIS_HOST='127.0.0.1'
    REDIS_PORT=6379
    OAUTH_CLIENT_ID='your-google-oauth-client-id'
    CLIENT_SECRET='your-google-ouath-client-secret'
    JWT_SECRET='your-jwt-secret'
    GMAIL_USER='gmail-email'
    GMAIL_PASS='gmail-pass'" > .env</pre>
    <small>(* The server uses NodeMailer to send emails to admins!)</small>
    </li>
    <li>
    Install packages with
    <pre>yarn</pre>
    </li>
    <li>
    Development server 
    <pre>yarn dev</pre>
    </li>
    <li>
    Production build
    <pre>yarn build</pre>
    </li>
    <li>
    Production server
    <pre>yarn start</pre>
    </li>
    <li>
    Cluster with PM2
    <pre>pm2 start process.json</pre>
    </li>
</ol>

## To analyse bundle sizes,
For server,
<pre>yarn run analyse-server</pre>
For clien,
<pre>yarn run analyse-client</pre>
