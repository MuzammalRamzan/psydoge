import './container.css';
import Header from '../components/packagetwo/Header';
import Hero from '../components/packagetwo/Hero';
import History from '../components/packagetwo/History';
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