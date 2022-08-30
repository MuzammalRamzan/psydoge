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
// import bitcointransparent from '../src/folfer/swap/bitcoinminner.png'
// import bsw from '../src/folder1/swap/bsw.png'
// import preview from '../src/folder2/swap/preview.png'
// import CARDANO from '../src/folder4/swap/CARDANO.png'
// import REX from '../src/folder3/swap/REX.png'
// import bitcointransparent from '../src/folder1/swap/bitcoinminner.png'
// import bitcointransparent from '../src/folder1/swap/bitcoinminner.png'
import './sidebars.css';
import logo from '../../assets/logo.png'
import btclogo from '../../assets/btc-bet-logo.png';
import bswlogo from '../../assets/bsw-bet-logo.png';
import xrplogo from '../../assets/5187250_0-removebg-preview.png';
import rexlogo from '../../assets/REX LOGO.png';
import adalogo from '../../assets/ADA LOGO.png';




function Navbarr() {
    const [toggle, setToggle] = useState(false)

    let history = useHistory();

    function home() {
        history.push("/");
    }

    function Packagetwo() {
        history.push("/Packagetwo");
    }

    function Packagethree() {
        history.push("/Packagethree");
    }
    function Packagefour() {
        history.push("/Packagefour");
    }
    function Packagefive() {
        history.push("/Packagefive");
    }

    // function Packagefour() {
    //     history.push("/Packagefour");
    // }

    // function Packagefive() {
    //     history.push("/Packagefive");
    // }

    function help() {
        // history.push("/");
        try {
            document.getElementById('contacts').scrollIntoView();
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
            }}
            style={{
                position: "fixed",
                backgroundColor: "#222",
            }}
            className="controlNav"
        >
            <SideNav.Toggle onClick={handleToggle} />
            <div id={toggle ? "show" : "hide"} className="toggleDiv">
                <img src={btclogo} width="45px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={home} />
                <img src={bswlogo} width="40px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={Packagetwo} />
                <img src={xrplogo} width="40px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={Packagethree} />
                <img src={rexlogo} width="40px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={Packagefour} />
                <img src={adalogo} width="40px" style={{
                    padding: "0",
                    marginRight: "5px",
                    marginTop: "15px"
                }} onClick={Packagefive} />
            </div>
            <SideNav.Nav defaultSelected="home" className="navLinks">
                <NavItem eventKey="home" onClick={home} >
                    <NavIcon>
                        <img src={btclogo} style={{
                            padding: "0",
                            margin: "0",
                        }} width="40"/>
                    </NavIcon>
                    <NavText >
                        BTCB Miners
                    </NavText>
                </NavItem>
                <NavItem eventKey="withoutLocking" onClick={Packagetwo} >
                    <NavIcon>
                        <img src={bswlogo} style={{
                            padding: "0",
                            margin: "0",
                        }} width="40"/>
                    </NavIcon>
                    <NavText>
                        BSW Miners
                    </NavText>
                </NavItem>
                <NavItem eventKey="help" onClick={Packagethree} >
                    <NavIcon>
                        <img src={xrplogo} style={{
                            padding: "0",
                            margin: "0"
                        }} width="45"/>
                    </NavIcon>
                    <NavText >
                        XRP Miners
                    </NavText>
                </NavItem>
                <NavItem eventKey="Packagefour" onClick={Packagefour} >
                    <NavIcon>
                        <img src={rexlogo} style={{
                            padding: "0",
                            margin: "0"
                        }} width="45"/>

                    </NavIcon>
                    <NavText >
                        Rex Miners
                    </NavText>
                </NavItem>
                <NavItem eventKey="Packagefive" onClick={Packagefive} >
                    <NavIcon>
                        <img src={adalogo} style={{
                            padding: "0",
                            margin: "0"
                        }} width="45"/>
                    </NavIcon>
                    <NavText >
                        ADA Miners
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}
export default Navbarr;




