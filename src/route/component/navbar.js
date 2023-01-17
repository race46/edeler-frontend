import {NavLink, useNavigate} from "react-router-dom";

export default ({remove}) => {
    const navigate = useNavigate()
    const showInput = '/' !== window.location.pathname

    return (
        <div className="row">
            <div className="col-12">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">Edeler bot</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/features">Features</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/update">Edit profile</NavLink>
                                </li>

                            </ul>
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="I'm sure" hidden={showInput}
                                       aria-label="Search" id="sure" onChange={(event => {remove(event.target.value !== "I'm sure")})}/>
                                <button className="btn btn-outline-light btn-danger" type="button" onClick={e =>{
                                    document.cookie = "";
                                    fetch('/api/logout').then(r => navigate('/login'))
                                }}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
