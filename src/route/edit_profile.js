import {useState, useEffect} from "react";
import {useNavigate, Routes, Route, Link, NavLink} from "react-router-dom";
import Navbar from "./component/navbar";


export default () => {
    const navigate = useNavigate()
    const [name, set_name] = useState('')
    const [lastname, set_surname] = useState('')
    const [username, set_username] = useState('')
    const [password, set_password] = useState('')
    const [apikey, set_apikey] = useState('')
    const [secret, set_secret] = useState('')
    useEffect(() => {
        if (!document.cookie) navigate('/login')
        fetch('/api/me').then(r => r.json()).then(r => {
            set_name(r.name)
            set_surname(r.lastname)
            set_username(r.username)
            set_password(r.password)
            set_apikey(r.api_key)
            set_secret(r.secret_key)
        })
    }, [])

    const update_profile = (e) => {
        e.preventDefault()
        const data = {}
        for (const t of e.target) if (t.name) data[t.name] = t.value


        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('/api/update-profile', requestOptions).then(r => r.json()).then(r => {
            if(r.success) navigate('/')
        })
    }

    return (
        <div className="container-xl">
            <Navbar></Navbar>
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
                                    <h5 className="user-name">{username}</h5>
                                    <h6 className="user-email">{name}</h6>
                                </div>
                                <div className="about">
                                    <h5>About</h5>
                                    <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human
                                        experiences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form action="/api/update-profile" method="post" onSubmit={update_profile}>
                    <div className="col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Personal Details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" className="form-control" id="fullName"
                                                   placeholder="Enter full name" value={name} name="name"
                                                   onChange={e => set_name(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Surname</label>
                                            <input type="text" className="form-control" id="eMail" placeholder="surname"
                                                   onChange={e => set_surname(e.target.value)}
                                                   name="lastname" value={lastname}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Username</label>
                                            <input type="text" className="form-control" id="phone"
                                                   onChange={e => set_username(e.target.value)}
                                                   placeholder="Username" name="username" value={username}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">Password</label>
                                            <input type="password" className="form-control" id="website"
                                                   onChange={e => set_password(e.target.value)}
                                                   placeholder="password" name="password" value={password}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">Binance</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="Street">Api key</label>
                                            <input type="name" className="form-control" id="Street" placeholder="apikey"
                                                   onChange={e => set_apikey(e.target.value)} name="api_key"
                                                   value={apikey}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">Secret key</label>
                                            <input type="name" className="form-control" id="ciTy"
                                                   onChange={e => set_secret(e.target.value)}
                                                   placeholder="secret key" name="secret_key" value={secret}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="row gutters mt-3">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" name="submit" className="btn btn-secondary"
                                                    onClick={e => navigate('/')}>Cancel
                                            </button>
                                            <button type="submit" name="submit" className="btn btn-primary">Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
