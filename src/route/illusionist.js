import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "./component/navbar";

export default () => {
    const {id} = useParams()
    const [algo, set_algo] = useState({})
    useEffect(() => {
        fetch('/api/illusionist/' + id).then(r => r.json()).then(r => {
            const min = Math.ceil((Date.now() - (parseInt(r._id.substring(0, 8), 16) * 1000))/1000/60)
            r.date = `${Math.floor(min/60/24)}d ${Math.floor(min/60) % 24}h ${min%60}m`
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
                            </div>
                            <div className="card-body ">
                                <h5 className="card-title mb-4">Order list {algo.date}</h5>

                                <tbody>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src='https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/128/binance-coin.png'
                                                className="rounded-circle"
                                                alt=""
                                                style={{width: "45px", height: "45px"}}
                                            />
                                            <div className="ms-3">
                                                <p className="fw-bold mb-1">{algo.pair}</p>
                                                <p className="text-muted mb-0">${algo.amount}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">{'devamke'} free</p>
                                        <p className="text-muted mb-0">{'lclkfsdalkfjsda'} locked</p>
                                    </td>
                                </tr>

                                </tbody>
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