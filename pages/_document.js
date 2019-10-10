import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet='utf-8' />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1'
                    />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='57x57' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-57x57_ocno0r.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='60x60' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-60x60_tmlaan.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='72x72' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-72x72_lolczk.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='76x76' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-76x76_dpxrkd.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='114x114' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-114x114_kzbhil.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='120x120' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-120x120_euveav.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='144x144' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727630/portfolio/favicon/ms-icon-144x144_x7fgjz.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='152x152' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-152x152_stgkbj.png' />
                    <link crossOrigin='anonymous' rel='apple-touch-icon' sizes='180x180' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727631/portfolio/favicon/apple-icon-180x180_saos91.png' />
                    <link crossOrigin='anonymous' rel='icon' type='image/png' sizes='192x192' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727632/portfolio/favicon/android-icon-192x192_dwhykb.png' />
                    <link crossOrigin='anonymous' rel='icon' type='image/png' sizes='32x32' href='https://res.cloudinary.com/dmzk3uux3/image/upload/v1570727630/portfolio/favicon/favicon-32x32_q88vxt.png' />
                    <link crossOrigin='anonymous' rel='icon' type='image/png' sizes='96x96' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727630/portfolio/favicon/favicon-96x96_eh6cm6.png' />
                    <link crossOrigin='anonymous' rel='icon' type='image/png' sizes='16x16' href='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727630/portfolio/favicon/favicon-16x16_hsfzpc.png' />
                    <link crossOrigin='anonymous' rel='manifest' href='https://res.cloudinary.com/dmzk3uux3/raw/upload/v1570727632/portfolio/favicon/manifest_phvyhd.json' />
                    <meta name='msapplication-TileColor' content='#ffffff' />
                    <meta crossOrigin='anonymous' name='msapplication-TileImage' content='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570727630/portfolio/favicon/ms-icon-144x144_x7fgjz.png' />
                    <meta name='theme-color' content='#ffffff' />
                    <meta name='Description' content='Abhishek Mehandiratta Portfolio' />
                    <link type='stylesheet' href='../node_modules/font-awesome/css/font-awesome.css'/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* to remove preloader */}
                    <script dangerouslySetInnerHTML={{__html: `
                        function loaded() {
                            document.body.classList.add('loaded');            
                        }
                        setTimeout(loaded, 5000);
                        window.addEventListener('load', loaded);
                    `}}>
                    </script>
                </body>
            </Html>
        )
    }
}

export default MyDocument;
