import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


export default () => {
    const [disable, set_disable] = useState(false)
    const [hide, set_hide] = useState(true)
    const navigate = useNavigate()
    const handle_login = (event) => {
        event.preventDefault()
        set_disable(true)
        const data = {}
        for (const t of event.target) if (t.name) data[t.name] = t.value
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('/api/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success) navigate('/')
                else {
                    set_disable(false)
                    set_hide(false)
                }
            }).catch(err => navigate('/bruteforce'))

    }
    return (
        <section className="vh-100" style={{backgroundColor: "#9A616D"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: "1rem"}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/40/95/f1/kahramanmaras-madalya.jpg"
                                        alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}}/>
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form method="post" onSubmit={handle_login}>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                                                <span className="h1 fw-bold mb-0">Edeler Bot</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}
                                                hidden={!hide}>Sign into
                                                your account</h5>
                                            <div className="p-3 mb-2 bg-danger text-white rounded" hidden={hide}>Invalid
                                                Login Credentials
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" name="username" id="form2Example17"
                                                       disabled={disable}
                                                       className="form-control form-control-lg"/>
                                                <label className="form-label" htmlFor="form2Example17">Username</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example27" disabled={disable}
                                                       className="form-control form-control-lg" name="password"/>
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block w-100"
                                                        disabled={disable} type="submit">Login
                                                </button>
                                            </div>

                                            <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an
                                                account? <a href="/signup"
                                                            style={{color: "#393f81"}}>Register here</a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
