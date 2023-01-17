import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Navbar from "./component/navbar";


export default () => {
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const data = {}
        for (const i of e.target) if (i.value) data[i.name] = i.value
        const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, "body": JSON.stringify(data)};
        fetch('/api/illusionist', options).then(r => navigate('/'))
    }

    const [get_rs, set_rs] = useState([])
    const [get_enabled, set_enabled] = useState(true)
    useEffect(() => {
        if (!document.cookie) navigate('/login')
        fetch('/api/rs-list').then(r => r.json()).then(r => set_rs(r))
    }, [])
    return (
        <div className="container-xl">
            <Navbar></Navbar>
            <div className="row mt-5">
                <div className="col-12">
                    <form action="/illusionist" method="post" onSubmit={e => handleSubmit(e)}>
                        <div className="card">
                            <div className="card-header bg-body d-flex">
                                <img
                                    src="https://media.istockphoto.com/id/953432540/photo/magician-or-illusionist-is-showing-magic-trick-blue-stage-light-in-background.jpg?b=1&s=612x612&w=0&k=20&c=pVJmSv70_Q2qhVvoZKuJYjo5-4gbbcUk-zchoeSfAko="
                                    className="rounded-circle"
                                    alt=""
                                    style={{width: "80px", height: "80px"}}
                                />
                                <h4 className="m-3">ILLUSIONIST Algorithm</h4>
                            </div>
                            <div className="card-body ">
                                <h5 className="card-title mb-4">🎩 Hokus Pokus! Now your money has gone 🎩</h5>

                                <div className="d-flex justify-content-around">
                                    <select required className="form-select w-25 m-1"
                                            aria-label="Default select example" id="illusionist-select"
                                            name="pair-provider"
                                            onChange={e => set_enabled(false)}
                                    >
                                        <option hidden>Select coin and provider</option>
                                        {get_rs.map(rs => {
                                            return (
                                                <option key={rs.pair + ' ' + rs.provider}
                                                        value={rs.pair + ' ' + rs.provider}>{rs.pair + ' ' + rs.provider}</option>
                                            )
                                        })}
                                    </select>

                                    <input required type="number" step="0.001"
                                           className="form-control w-25 m-1 mobile-first"
                                           placeholder="shrink percentage" name="shrink" min="0" max="1"/>
                                    <input required type="number" className="form-control w-25 m-1 mobile-first"
                                           step="0.01" min="10" placeholder="amount for one order" name="amount"/>
                                    <button disabled={get_enabled} type="submit"
                                            className="btn btn-danger m-1 w-25 mobile-first"
                                            id="illusionist-submit">Confirm
                                    </button>
                                </div>
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
