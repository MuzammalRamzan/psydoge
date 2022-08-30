
import React, { useState } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import './sidebars.css';
import logo from '../../assets//logo.png';

function Navbarr() {
    const [toggle, setToggle] = useState(false)
    let history = useHistory();

    function home() {
        history.push("/");
    }
    function historyy() {
        history.push("/History");
    }
    function hero() {
        history.push("/Hero");
    }
    function help() {
        // history.push("/");
        try {
            // document.getElementById('contacts').scrollIntoView();
            // window.open("https://arbitech-solutions.business.site/", '_blank');
            // window.open("https://arbitech-solutions.business.site/")
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
            style={{
                position: "fixed",
                backgroundColor: "#222",
            }} >
            {/* <SideNav.Toggle /> */}
            <SideNav.Toggle onClick={handleToggle} />

            <div id={toggle ? "show" : "hide"} className="toggleDiv">
                <img src={logo} width="40px" style={{
                    padding: "0",
                    // marginRight: "5px",
                    // marginTop: "15px"
                }} onClick={home} />
                <img src={logo} width="40px" style={{
                    padding: "0",
                    // marginRight: "5px",
                    // marginTop: "15px"
                }} onClick={historyy} />
                <img src={logo} width="40px" style={{
                    padding: "0",
                    // marginRight: "5px",
                    // marginTop: "15px"
                }} onClick={hero} />
                {/* <img src={REX} width="40px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={Packagefour} />
                <img src={CARDANO} width="40px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={Packagefive} /> */}
            </div>

            <SideNav.Nav defaultSelected="home" className="navLinks">
                <NavItem eventKey="home" onClick={home}>
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText >
                        {/* <li>
                            <Link to="/"> */}
                        Home
                        {/* </Link>
                        </li> */}
                    </NavText>
                </NavItem>
                {/* <NavItem eventKey="Locking" onClick={withoutlocking}>
                    <NavIcon>
                        <i className="fas fa-lock-alt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Locking
                    </NavText>
                </NavItem> */}
                <NavItem eventKey="withoutLocking" onClick={historyy}>
                    <NavIcon>
                        <i className="fas fa-lock-open-alt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        {/* <li>
                            <Link to="/without"> */}
                        History
                        {/* </Link>
                        </li> */}
                    </NavText>
                </NavItem>
                <NavItem eventKey="help" onClick={hero}>
                    <NavIcon>
                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                        <i class="far fa-question-circle" style={{ fontSize: '1.9em' }} />
                    </NavIcon>
                    <NavText >
                        {/* <li>
                            <Link to="/"> */}
                        Hero
                        {/* </Link>
                        </li> */}
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>

    );
}
export default Navbarr;




