import './container.css';
import Header from '../components/packagethree/Header';
import Hero from '../components/packagethree/Hero';
import History from '../components/packagethree/History';
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