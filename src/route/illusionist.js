import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "./component/navbar";

function getCurrenPrice(algo) {
    if (!algo || !algo.pair) return ''
    const ticker = JSON.parse(localStorage.getItem("ticker"))
    const price = ticker.find(o => o.symbol === algo.pair)
    return price.price
}

function getDate(id) {
    const min = Math.ceil((Date.now() - (parseInt(id.substring(0, 8), 16) * 1000)) / 1000 / 60)
    return `${Math.floor(min / 60 / 24)}d ${Math.floor(min / 60) % 24}h ${min % 60}m`
}

function calculateProfit(order, price, algo) {
    if(order.buy) return '----'
    const rate = ((price/order.buying*100 - 100)).toFixed(2)


    return <span style={{color: rate>0?'green': 'red'}}>%{rate} </span>
}

function getImageUrl(algo){
    if(!algo || !algo.pair) return ''
    const pair = JSON.parse(localStorage.getItem('account')).balances.find(b => b.asset + 'USDT' === algo.pair)
    if(!pair) return ''
    return pair.image
}
function getFixedSelling(buying, selling) {
    const b = buying.toString()
    if (!b.includes(".")) return selling.toFixed(0)
    return selling.toFixed(b.split('.')[1].length)
}

function getRow(algo) {
    if (!algo.orders) return (<></>)
    return (
        algo.orders.map(o => {
            return <tr key={o._id}>
                <td>
                    <div className="d-flex align-items-center">
                        <img
                            src={getImageUrl(algo)}
                            className="rounded-circle"
                            alt=""
                            style={{width: "45px", height: "45px"}}
                        />
                        <div className="ms-3">
                            <p className="fw-bold mb-1"
                               style={{color: o.buy ? 'green' : 'red'}}>{o.buy ? 'BUY - ' : 'SELL - '}</p>
                            <p className="text-muted mb-0">{calculateProfit(o, getCurrenPrice(algo), algo)}</p>
                        </div>
                    </div>
                </td>
                <td className="mb-3">
                    <p className="fw-normal mb-1"><span style={{color: 'green'}}>${o.buying}</span> - <span
                        style={{color: 'red'}}>${getFixedSelling(o.buying, o.selling)}</span></p>
                    <p className="text-muted mb-0">{getDate(o._id)}</p>
                </td>
            </tr>

        })
    )
}


export default () => {
    const {id} = useParams()
    const [algo, set_algo] = useState({})
    useEffect(() => {
        fetch('/api/illusionist/' + id).then(r => r.json()).then(r => {
            const min = Math.ceil((Date.now() - (parseInt(r._id.substring(0, 8), 16) * 1000)) / 1000 / 60)
            r.date = `${Math.floor(min / 60 / 24)}d ${Math.floor(min / 60) % 24}h ${min % 60}m`
            document.querySelectorAll('input')[1].value = r.max_count
            set_algo(r)
        })
    }, [])
    return (
        <div className="container-xl">
            <Navbar/>
            <div className="row mt-3">
                <div className="col-12">
                    <form action="#" method="post" onSubmit={e => {
                        e.preventDefault()
                    }}>
                        <div className="card">
                            <div className="card-header bg-body d-flex">
                                <img
                                    src="https://media.istockphoto.com/id/953432540/photo/magician-or-illusionist-is-showing-magic-trick-blue-stage-light-in-background.jpg?b=1&s=612x612&w=0&k=20&c=pVJmSv70_Q2qhVvoZKuJYjo5-4gbbcUk-zchoeSfAko="
                                    className="rounded-circle"
                                    alt=""
                                    style={{width: "80px", height: "80px"}}
                                />
                                <div>
                                    <h4 className="m-3">{algo.pair} ${algo.amount}</h4>
                                    <h6 className="mx-3">ILLUSIONIST Algorithm</h6>
                                </div>
                                <div style={{height:"100%"}} className="mt-3"> <input type="number" min="0" step="1"  className="form-control" style={{width: "85px", fontSize:"1.2em"}} onChange={(e) => {
                                    if(!e.target.value) return
                                    console.log(id, e.target.value)
                                    fetch(`/api/illusionist/${id}/update-max-count/${e.target.value}`)
                                }} /></div>
                            </div>
                            <div className="card-body ">

                                <h5 className="card-title ">Order list {algo.date}</h5>
                                <h5 className="card-title mb-4">${getCurrenPrice(algo)}</h5>

                                <table>
                                    <tbody>
                                    {getRow(algo)}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
