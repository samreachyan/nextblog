import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';

import Navbar from '@/components/shared/Navbar'
import Hero from '@/components/shared/Hero'

const MyApp = ({Component, pageProps}) => {
  const isHomePage = () => Component.name === 'Home'
  return (
    <div className="portfolio-app">
      <Navbar />
      
      { isHomePage() && <Hero /> }
      <div className="container">
        <Component {...pageProps} />
      </div>

      { isHomePage() && 
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      }
    </div>
  )
}

MyApp.getInitialProps = async (context) => {
  const initialProps = App.getInitialProps && await App.getInitialProps(context);

  return { pageProps: {appData: 'Hello __App Components', ...initialProps.pageProps } }
}

export default MyApp;