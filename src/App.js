import './App.css';
import Home from './container/home';
import Packagetwo from './container/packagetwo';
import Packagethree from './container/packagethree';
import Packagefour from './container/packagefour';
import Packagefive from './container/packagefive';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/sidebar/sidebars'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <div className="App">
          <nav>
            <ul>
              {/* <Navbar /> */}
              {/* <div style={{
              position: "fixed",
            }} > */}
              <Sidebar />
              {/* </div> */}
              {/* <li>
              <Link to="/">Home</Link>
            </li> */}
              {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li> */}
            </ul>
          </nav>

          <Switch>
            <Route path="/Packagetwo">
              <Packagetwo />
            </Route>
            <Route path="/Packagethree">
              <Packagethree />
            </Route>
            <Route path="/Packagefour">
              <Packagefour />
            </Route>
            <Route path="/Packagefive">
              <Packagefive />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router >
      {/* <ToastContainer />
      <Header />
      <Hero />
      <History /> */}
    </div>
  );
}

export default App;
