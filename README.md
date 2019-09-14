# Portfolio Website using Next.JS

To run this locally, clone this repo and `cd` in the project directory

<ol>
    <li>
    <pre>echo "MONGO_URI=mongodb://localhost:27017/website" > .env</pre>
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
    <pre>pm3 start process.json</pre>
    </li>
</ol>

## To analyse bundle sizes,
For server,
<pre>yarn run analyse-server</pre>
For clien,
<pre>yarn run analyse-client</pre>
