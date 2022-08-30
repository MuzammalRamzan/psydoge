import React, { useState, useEffect } from 'react'
import disc from '../../assets/list-item4.png'
import One from '../../assets/1.png'
import Two from '../../assets/2.png'
import Three from '../../assets/3.png'
import Four from '../../assets/4.png'
import Five from '../../assets/5.png'
import Six from '../../assets/6.png'
import handIcon from '../../assets/hand4.png'
import { contractAddress4, abi4, tokenAddress4, tokenAbi4 } from '../../utils/constant'
import Web3 from 'web3'
import '../../styles/Hero.css'
import Slider from "react-slick";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Congratulation from '../../assets/image1.png'



function Hero() {
    let accountAd;
    const [value, setValue] = useState("")
    const [account, setAccount] = useState("Connect Wallet");
    const [button, setButton] = useState("Bet Now!")
    const [buttonState, setButtonState] = useState(false)
    const [cards, setCards] = useState()
    const [comp, setComp] = useState(true)
    const [withDraw, setWithDraw] = useState("Withdraw")
    const [mybalance, setMybalance] = useState("")
    const [cardList, setCardList] = useState([])
    const [total, setTotal] = useState()
    const [compWithdraw, setCompWithdraw] = useState(true)
    const [checkOut, setCheckOut] = useState(true)
    const [withDrawButton, setWithDrawButton] = useState("Checkout")
    const [indexes, setIndexes] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState()
    const [cardOne, setCardOne] = useState()
    const [cardTwo, setCardTwo] = useState()
    const [cardThree, setCardThree] = useState()
    const [cardFour, setCardFour] = useState()
    const [cardFive, setCardFive] = useState()
    const [cardSix, setCardSix] = useState()




    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let accounts;
    const getAccounts = async () => {
        const web3 = window.web3;
        try {
            accounts = await web3.eth.getAccounts();
            return accounts;
        } catch (error) {
            console.log("Error while fetching acounts: ", error);
            return null;
        }
    };

    const loadWeb3 = async () => {
        let isConnected = false;
        try {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                isConnected = true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                isConnected = true;
            } else {
                isConnected = false;
                console.log("Metamask is not installed, please install it on your browser to connect.");
            }
            if (isConnected === true) {
                let accounts = await getAccounts();
                accountAd = accounts[0];
                setAccount(accountAd);
                balanceOf()
            }
            imgFun();
            levelValues();
        } catch (error) {
            console.log("Error while connecting metamask", error);
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const balanceOf = async () => {
        const web3 = window.web3;
        try {
            let accounts = await getAccounts();
            accountAd = accounts[0];
            let tokenContract = new web3.eth.Contract(tokenAbi4, tokenAddress4);
            let myBalance = await tokenContract.methods.balanceOf(accountAd).call();
            let convertedBalanc = await window.web3.utils.fromWei(myBalance)
            setMybalance(convertedBalanc)
        } catch (error) {
            console.log("Error while fetching acounts: ", error);

        }
    };

    let cardNo;
    const handleClick = async () => {
        const web3 = window.web3;
        setButton("Please wait while processing...");
        setButtonState(true);
        console.log(buttonState)
        try {
            console.log(account)
            let contract = new web3.eth.Contract(abi4, contractAddress4);
            let tokenContract = new web3.eth.Contract(tokenAbi4, tokenAddress4);
            if (value >= 10 && value <= 2000) {
                await tokenContract.methods.approve(contractAddress4, web3.utils.toWei(value)).send({ from: account })
                    .then(async (output) => {
                        await contract.methods.Bet_Amount(web3.utils.toWei(value)).send({ from: account })
                            .then(async (output) => {
                                cardNo = await contract.methods.UserInfo(account).call()
                                console.log("num of cards", cardNo)
                                toast.success("Card purchase successfully");
                            }).catch((e) => {
                                console.log("response", e);
                                toast.error("Error occured while purchasing card.");
                            });
                        loadWeb3();
                    }).catch((e) => {
                        toast.error("Card purchase rejected");
                        console.log("response", e);
                    });
            } else {
                alert('Minimum Bet 10 and Maximum Bet 2000')
            }
            setValue("")
            setButtonState(false)
            setButton("Bet Now!")
        } catch (error) {
            console.log("Error while fetching acounts: ", error);

        }
    }


    const imgFun = async () => {
        const web3 = window.web3;
        try {
            let contract = new web3.eth.Contract(abi4, contractAddress4);
            const card = await contract.methods.UserInfo(accountAd).call()
            setCards(card[1])
        } catch (error) {
            console.log("Error while fetching acounts: ", error);

        }
    }

    let cardsArray = []
    let indexesArray = []
    let pricesArray = []
    const handleCard = async (e) => {
        let id = e.target.id
        const web3 = window.web3;
        try {
            let contract = new web3.eth.Contract(abi4, contractAddress4);
            const card = await contract.methods.UserInfo(account).call();
            console.log(card)
            let CardNo = card[1];
            let CardValue = card[2]
            if (cardList.length === 0) {
                cardsArray.push([CardNo[id], CardValue[id]]);
                pricesArray.push(CardNo[id]);
                indexesArray.push(id)
            } else {
                cardsArray.push([CardNo[id], CardValue[id]]);
                indexesArray.push(id)
                pricesArray.push(CardNo[id]);
            }
            let newCards = [...cards]
            newCards[id] = ""
            setCards(newCards)
            let newList = cardList.concat(cardsArray)
            let newIndexes = indexes.concat(indexesArray)
            setIndexes(newIndexes)
            setCardList(newList);
            setComp(false)

            let result = 0;
            newList.map(async (item) => {
                console.log(item)
                console.log(item)
                let v = Web3.utils.fromWei(item[1])
                let a = parseFloat(v);
                result += a;
            })
            setTotal(result);

        } catch (e) {
            console.log(e)
        }
    }

    const handleWithdraw = async () => {
        const web3 = window.web3;
        let contract = new web3.eth.Contract(abi4, contractAddress4);
        setWithDraw("Please wait while processing...")
        try {
            console.log(indexes)
            await contract.methods.withdraw(indexes).send({ from: account })
            setWithDraw("Withdraw")
            setCardList([])
            setCheckOut(false)
            setWithDraw("Bet/Withdraw Again")
            toast.success("Withdraw amount successfully");
            loadWeb3();
        } catch (e) {
            toast.error("Withdraw Rejected");
            setWithDraw("Withdraw")
            console.log(e)
        }
    }

    const handleCheckout = async () => {
        setWithDrawButton("Withdraw")
        setCompWithdraw(false)
    }

    const handleCongrats = () => {
        setCardList([])
        setIndexes([])
        setWithDraw("Withdraw")
        setComp(true)
        setCompWithdraw(true)
        setCheckOut(true)

    }

    const handleModal = (e) => {
        setShowModal(true)
        setModal(e.target.id)
    }

    const levelValues = async () => {
        const web3 = window.web3;
        try {
            let contract = new web3.eth.Contract(abi4, contractAddress4);
            let cardOne = await contract.methods.cardPrice(0).call();
            setCardOne(window.web3.utils.fromWei(cardOne))
            console.log(window.web3.utils.fromWei(cardOne))
            let cardTwo = await contract.methods.cardPrice(1).call();
            setCardTwo(window.web3.utils.fromWei(cardTwo))
            console.log(window.web3.utils.fromWei(cardTwo))
            let cardThree = await contract.methods.cardPrice(2).call();
            setCardThree(window.web3.utils.fromWei(cardThree))
            console.log(window.web3.utils.fromWei(cardThree))
            let cardFour = await contract.methods.cardPrice(3).call();
            setCardFour(window.web3.utils.fromWei(cardFour))
            console.log(window.web3.utils.fromWei(cardFour))
            let cardFive = await contract.methods.cardPrice(4).call();
            setCardFive(window.web3.utils.fromWei(cardFive))
            console.log(window.web3.utils.fromWei(cardFive))
            let cardSix = await contract.methods.cardPrice(5).call();
            setCardSix(window.web3.utils.fromWei(cardSix))
            console.log(window.web3.utils.fromWei(cardSix))
        } catch (error) {
            setCardOne("Error while fetching acounts: ", error);

        }
    }


    useEffect(() => {
        loadWeb3();
    }, []);

    return (
        <div className="lg:bg-hero-background bg-gradient-to-b from-primary to-secondary bg-no-repeat bg-contain bg-top h-1/5 none px-6 md:px-10 lg:px-14 flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-around">
            <div className="py-12 xl:py-10 2xl:w-7/12 xl:w-6/12">
                <h1 className="text-4.5xl  text-pure-white font-bold">Random Card Want?</h1>
                <ul className="list-inside flex flex-col flex-wrap my-16">
                    <div className="flex flex-row items-start mb-2 lg:items-center md:items-center sm:items-center">
                        <img src={disc} alt='icon' className="w-4 h-4 mr-4 p-0.5" />
                        <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="1">You can earn REX  token reward with challenge !</li>
                    </div>
                    <div className="flex flex-row items-start mb-2 lg:items-center md:items-center sm:items-center">
                        <img src={disc} alt='icon' className="w-4 h-4 mr-4 p-0.5" />
                        <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="2">Bet and increase your token balance.</li>
                    </div>
                    <div className="flex flex-row items-start mb-2 lg:items-center md:items-center sm:items-start">
                        <img src={disc} alt='icon' className="w-4 h-4 mr-4 sm:mt-1 p-0.5" />
                        <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="3">The pool amount of this game will be used to develop burning and special events. <strong>Good Luck!</strong></li>
                    </div>
                </ul>
                <div className="flex flex-row flex-wrap justify-center lg:justify-start md:justify-start sm-justify-start">
                    <img src={One} alt="img1" className="mr-4 mb-4 cursor-pointer" key="1" id="1" onClick={handleModal} />
                    <img src={Two} alt="img2" className="mr-4 mb-4 cursor-pointer" key="2" id="2" onClick={handleModal} />
                    <img src={Three} alt="img3" className="mr-4 mb-4 cursor-pointer" key="3" id="3" onClick={handleModal} />
                    <img src={Four} alt="img3" className="mr-4 mb-4 cursor-pointer" key="4" id="4" onClick={handleModal} />
                    <img src={Five} alt="img5" className="mr-4 mb-4 cursor-pointer" key="5" id="5" onClick={handleModal} />
                    <img src={Six} alt="img6" className="mr-4 mb-4 cursor-pointer" key="6" id="6" onClick={handleModal} />
                </div>
                {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dt-gr p-6  outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    </div>
                                    {
                                        (modal === "0") ? <img src={One} alt="img1" className="w-64 h-72" /> :
                                            (modal === "1") ? <img src={Two} alt="img2" className="w-64 h-72" /> :
                                                (modal === "2") ? <img src={Three} alt="img3" className="w-64 h-72" /> :
                                                    (modal === "3") ? <img src={Four} alt="img3" className="w-64 h-72" /> :
                                                        (modal === "4") ? <img src={Five} alt="img5" className="w-64 h-72" /> :
                                                            (modal === "5") ? <img src={Six} alt="img6" className="w-64 h-72" /> :
                                                                null
                                    }
                                    <div className="flex items-center justify-end pt-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button className="text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)} >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                <div className="flex flex-row flex-wrap justify-center lg:justify-start md:justify-start sm-justify-start mt-10">
                    {
                        cards && cards.map((item, index) => {
                            return (item === "0") ? <img src={One} alt="img1" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} /> :
                                (item === "1") ? <img src={Two} alt="img2" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} /> :
                                    (item === "2") ? <img src={Three} alt="img3" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} /> :
                                        (item === "3") ? <img src={Four} alt="img3" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} /> :
                                            (item === "4") ? <img src={Five} alt="img5" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} /> :
                                                (item === "5") ? <img src={Six} alt="img6" className="mr-4 mb-4 cursor-pointer" key={index} id={index} onClick={handleCard} /> :
                                                    null;
                        }
                        )
                    }
                </div>
                <p className="text-xl text-pure-white font-semibold mt-20">If you bet 100 REX token (min bet 10, max bet 2000)</p>
                <div className="flex flex-row align-center justify-center sm:flex-col">
                    <table className=" text-white rounded-t-lg mt-4">
                        <thead>
                            <tr className="bg-main-color4 text-left text-sm md:text-base">
                                <th className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4  border-r border-b border-black rounded-tl-lg">Type</th>
                                <th className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">Bet</th>
                                <th className="px-3 xsm:px-2 sm:px-6 border-r border-b border-black">Reward</th>
                                <th className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">Payout</th>
                                <th className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black rounded-tr-lg">Profit</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-tcolor text-left text-sm md:text-base">
                                <td className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4 border-r border-b border-black">Level 1 (WIND)</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">100</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardOne * 100}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">x-{cardOne}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardOne * 100 - 100}</td>
                                
                            </tr>
                            <tr className="bg-tcolor text-left text-sm md:text-base">
                                <td className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4  border-r border-b border-black">Level 2 (WATER)</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">100</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardTwo * 100}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">x{cardTwo}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardTwo * 100 - 100}</td>
                                
                            </tr>
                            <tr className="bg-tcolor text-left text-sm md:text-base">
                                <td className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4  border-r border-b border-black">Level 3 (FIRE)</td>
                                <td className="px-3 xsm:px-2 sm:px-6 border-r border-b border-black">100</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardThree * 100}</td>
                                <td className="px-3 xsm:px-2 sm:px-6 border-r border-b border-black">x{cardThree}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardThree * 100 - 100}</td>
                                
                            </tr>
                            <tr className="bg-tcolor text-sm md:text-base">
                                <td className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4 border-r border-b border-black">Level 4 (LIGHT)</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">100</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardFour * 100}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">x{cardFour}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardFour * 100 - 100}</td>
                                
                            </tr>
                            <tr className="bg-tcolor text-left text-sm md:text-base">
                                <td className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4 border-r border-b border-black">Level 5 (EARTH)</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">100</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardFive * 100}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">x{cardFive}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-b border-black">{cardFive * 100 - 100}</td>
                                
                            </tr>
                            <tr className="bg-tcolor text-left text-sm md:text-base">
                                <td className="px-4 py-2 xsm:px-2 sm:px-6 md:px-8 sm:py-4  border-r border-black rounded-bl-lg">Level 6 (DARK)</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-black">100</td>
                                <td className="px-3 xsm:px-2 sm:px-6 border-r border-black">{cardSix * 100}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-black">x{cardSix}</td>
                                <td className="px-3 xsm:px-2 sm:px-6  border-r border-black rounded-br-lg">{cardSix * 100 - 100}</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mb-0 xl:ml-10 2xl:ml-0">
                {
                    comp ?
                        (<div className=" mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9">
                            <h2 className="text-4xl text-main4 font-semibold">Game Rules</h2>
                            <ul className="list-inside flex flex-col flex-wrap my-12">
                                <div className="flex flex-row items-start mb-1 lg:items-center md:items-center sm:items-center">
                                    <img src={handIcon} alt='icon' className="w-9 h-9 mr-4 p-0.5" />
                                    <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="9">6 level card can be selected with random game.</li>
                                </div>
                                <div className="flex flex-row items-start mb-1 lg:items-center md:items-center sm:items-center">
                                    <img src={handIcon} alt='icon' className="w-9 h-9 mr-4 p-0.5" />
                                    <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="8">All card have different token reward value</li>
                                </div>
                                <div className="flex flex-row items-start mb-1 lg:items-center md:items-center sm:items-start">
                                    <img src={handIcon} alt='icon' className="w-9 h-9 mr-4 sm:mt-1 p-0.5" />
                                    <li className="text-pure-white text-base sm:text-lg md:text-xl lg:text-xl" key="7">Min Bet is 100 REX Token, Max Bet is 1,000 REX Token</li>
                                </div>
                            </ul>
                        </div>
                        )
                        :
                        compWithdraw ?
                            (<div className="h-auto w-12/12 mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-2 lg:py-6 md:py-6 sm:py-4 px-2 lg:px-6 md:px-6 sm:px-4">
                                <h2 className="text-4xl text-main4 font-semibold">Checkout</h2>
                                <div className="py-4 px-4 bg-dark flex flex-row justify-between mt-4">
                                    <label className="text-main4 text-xl font-semibold">Item</label>
                                    <label className="text-main4 text-xl font-semibold">Quantity</label>
                                    <label className="text-main4 text-xl font-semibold">Bet amount</label>
                                </div>
                                <div className="mt-4 overflow-auto h-56">
                                    {
                                        cardList && cardList?.map((item, index) => {
                                            return (item[0] === "0") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={One} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} REX</p></div></div> :
                                                (item[0] === "1") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Two} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} REX</p></div></div> :
                                                    (item[0] === "2") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Three} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} REX</p></div></div> :
                                                        (item[0] === "3") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Four} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} REX</p></div></div> :
                                                            (item[0] === "4") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Five} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} REX</p></div></div> :
                                                                (item[0] === "5") ? <div className="flex flex-row items-center justify-start sm:justify-start"><img src={Six} alt="img1" className="mr-4 mb-2 w-16 h-20" key={index} /><div className="ml-16 mr-24"><p className="text-white text-lg">1</p></div><div><p className="text-white text-lg mr-6"> {Web3.utils.fromWei(item[1])} REX</p></div></div> :
                                                                    null;
                                        })
                                    }
                                </div>
                            </div>
                            )
                            :
                            checkOut ?
                                (<div className=" mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9">
                                    <h2 className="text-xl msm:text-4xl sm:text-4xl text-main4 font-semibold text-start">WITHDRAW AMOUNT</h2>
                                    <Slider {...settings} className="w-96">

                                        {cardList.map(item => {
                                            return (item[0] === "0") ? <div className="flex flex-row !important items-center justify-start sm:justify-start"><img src={One} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main4 text-xl font-semibold">#2021 Wind REX </h4><h3 className="text-main4 text-xl sm:text-2xl font-bold">Level: 1 (WIND)</h3><p className="mt-6 text-main4 font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} REX</p></div></div>
                                                : (item[0] === "1") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Two} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main4 text-xl font-semibold">#2021 Water REX </h4><h3 className="text-main4 text-xl sm:text-2xl font-bold">Level: 2 (WATER)</h3><p className="mt-6 text-main4 font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} REX</p></div></div>
                                                    : (item[0] === "2") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Three} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main4 text-xl font-semibold">#2021 Fire REX </h4><h3 className="text-main4 text-xl sm:text-2xl font-bold">Level: 3 (FIRE)</h3><p className="mt-6 text-main4 font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} REX</p></div></div>
                                                        : (item[0] === "3") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Four} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main4 text-xl font-semibold">#2021 Light REX </h4><h3 className="text-main4 text-xl sm:text-2xl font-bold">Level: 4 (LIGHT)</h3><p className="mt-6 text-main4 font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} REX</p></div></div>
                                                            : (item[0] === "4") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Five} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main4 text-xl font-semibold">#2021 Earth REX </h4><h3 className="text-main4 text-xl sm:text-2xl font-bold">Level: 5 (EARTH)</h3><p className="mt-6 text-main4 font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} REX</p></div></div>
                                                                : (item[0] === "5") ? <div className="flex flex-row !important items-center justify-start sm:justify-start "><img src={Six} alt="img1" className="mr-4 mb-4 w-30 h-48 mt-6" /><div><h4 className="text-main4 text-xl font-semibold">#2021 Dark REX </h4><h3 className="text-main4 text-xl sm:text-2xl font-bold">Level: 6 (DARK)</h3><p className="mt-6 text-main4 font-semibold text-lg">Your Reward:</p><p className="text-white text-lg"> {Web3.utils.fromWei(item[1])} REX</p></div></div>
                                                                    : null

                                        })
                                        }

                                    </Slider>
                                </div>
                                ) :
                                (
                                    <div className=" mt-6 lg:mt-28 md:mt-18 sm:mt-12 bg-dt-gr py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9 flex flex-col justify-center items-center">
                                        <h2 className="text-xl msm:text-4xl sm:text-4xl text-main4 font-semibold text-start">CONGRATULATIONS</h2>
                                        <img src={Congratulation} alt="congrats" className="mt-12" />
                                    </div>
                                )

                }

                <div className=" divide-y bg-seondary-color py-8 lg:py-12 md:py-10 sm:py-9 px-8 lg:px-12 md:px-10 sm:px-9">
                    {
                        comp ?
                            <>
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <h3 className="sm:text-2xl xsm:text-lg text-main4 font-semibold">My Wallet</h3>
                                    <span className="sm:text-xl xsm:text-md text-white font-semibold">{mybalance} REX</span>
                                </div>
                                <li className=" hidden text-pure-white text-base sm:text-lg md:text-xl lg:text-xl">6 level card can be selected with random game.</li>
                                <div className="flex flex-row items-center justify-between py-4">
                                    <h3 className="sm:text-2xl xsm:text-lg text-main4 font-semibold">Bet Amount</h3>
                                    <div>
                                        <input className="bg-dt-gr text-white focus:ring-2 border border-gray-500 focus:border-gray-600 xsm:w-32 sm:w-48 md:w-40 lg:w-32  py-2 px-4 rounded mr-6" type="number" min="10" max="2000" onChange={handleChange} value={value} />
                                        <span className="sm:text-xl xsm:text-lg text-white font-semibold">REX</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="py-3 text-white">*Min bet 10 token, Max bet 2,000 token</p>
                                    <button className="bg-main-color4 px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleClick} disabled={buttonState}>{button}</button>
                                </div>
                            </>
                            :
                            compWithdraw ?

                                <div className="mt-6 flex flex-col">
                                    <hr />
                                    <div className="flex flex-row justify-between">
                                        <h3 className="sm:text-2xl xsm:text-lg md:text-lg text-main4 font-semibold my-4">Total</h3>
                                        <h3 className="sm:text-2xl xsm:text-lg md:text-lg text-white font-semibold my-4">{total}</h3>
                                    </div>
                                    <hr />
                                    <button className="bg-main-color4 px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleCheckout}>{withDrawButton}</button>
                                </div>
                                :
                                checkOut ?
                                    <div className="mt-6 flex flex-col">
                                        <p className="py-3 text-white text-center">Click withdraw button to send token to your wallet</p>
                                        <button className="bg-main-color4 px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleWithdraw} disabled={buttonState}>{withDraw}</button>
                                    </div>
                                    :
                                    <div className="mt-6 flex flex-col">
                                        <button className="bg-main-color4 px-3 rounded mt-10 w-full py-4 font-bold disabled:bg-header0" onClick={handleCongrats} disabled={buttonState}>{withDraw}</button>
                                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Hero
