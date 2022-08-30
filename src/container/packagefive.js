import './container.css';
import Header from '../components/packagefive/Header';
import Hero from '../components/packagefive/Hero';
import History from '../components/packagefive/History';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div className="containerc" >
            <ToastContainer />
            <Header />
            <Hero />
            <History />
        </div >
    );
}

export default App;