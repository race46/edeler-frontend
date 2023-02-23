import Navbar from "./component/navbar";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Row_coin from "./component/row_coin";
import Running_illusion from "./component/running_illusion";


function calculateTotalProfit(running, ticker){
    let total = 0
    for(const algo of running){
        let price = ticker.find(t => t.symbol === algo.pair) || {price : '1'}
        price = price.price
        algo.profit = (algo.coin_profit * price + algo.usd_profit).toFixed(2)
        total += parseFloat(algo.profit)
    }
    return '$' + total.toFixed(2)
}

export default () => {

    const get = (key) => JSON.parse(localStorage.getItem(key))
    const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))
    const race = (url, key, setter) => fetch(url).then(r => r.json()).then(r => {
        set(key, r);
        setter(r)
    })

    const navigate = useNavigate()
    const [get_user, set_user] = useState(get('user') || {})
    const [get_account, set_account] = useState(get('account') || {total: 0, balances: []})
    const [get_ticker, set_ticker] = useState(get('ticker') || [])
    const [get_running, set_running] = useState(get('running') || [])
    const [get_remove, set_remove] = useState(true)
    const [get_total, set_total] = useState(0)

    const update = () => {
        const account = get('account')
        const ticker = get('ticker')
        if (!account || !account.balances || !ticker) return;
        let total = 0
        for (const balance of account.balances) {
            const price = ticker.find(t => t.symbol === balance.asset + 'USDT') || {price: '1.0'}
            const quantity = balance.free * 1 + balance.locked * 1
            const tt = quantity * price.price
            total  += tt
            balance.total = tt.toFixed(2)
        }
        account.total = total.toFixed(2)

        set_account(account)
    }


    useEffect(() => {
        if (!document.cookie) navigate('/login')
        race('/api/me', 'user', set_user)
        race('/api/account', 'account', set_account).then(r => update())
        race('https://api.binance.com/api/v3/ticker/price', 'ticker', set_ticker).then(r => update())
        race('/api/running-algorithms', 'running', set_running)

        update()
    }, [])

    return (
        <div className="container-xl">
            <Navbar remove={set_remove}></Navbar>
            <div className="row gutters">
                <div className="col-12">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                    <div className="user-avatar">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                             alt="Maxwell Admin"/>
                                    </div>
                                    <h4 className="user-name">{get_user.username}</h4>
                                    <h5 className="user-email">{get_user.name}</h5>
                                </div>
                                <div className="about">
                                    <h5 id="balance" style={{color: "#393f81"}}>Balance ${get_account.total}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mb-1">
                <table className="table align-middle mb-0 bg-white">
                    <tbody>
                    <Row_coin account={get_account}></Row_coin>
                    </tbody>
                </table>
            </div>

            <div className="col-12" style={{backgroundColor: "white"}}>
                <div className="d-flex justify-content-center">
                    <div className="about mt-3 mb-0">
                        <h5 style={{color: "#393f81"}}>Running Algorithms {calculateTotalProfit(get_running, get_ticker)}</h5>
                    </div>
                </div>
            </div>


            <div className="col-12">
                <table className="table align-middle mb-5 bg-white">
                    <tbody id="algo-table">
                    {get_running.map(algo => {
                        return <Running_illusion algo={algo} key={algo._id} ticker={get_ticker} remove={get_remove}
                                                 get_running={get_running} set_running={set_running}></Running_illusion>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
