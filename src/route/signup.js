import {useNavigate} from "react-router-dom";


export default () => {
    const navigate = useNavigate()
    const submit = (event) => {
        event.preventDefault()
        const data = {}
        for(let i = 0; i < 4; i++) data[event.target[i].name] = event.target[i].value
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('/api/signup', requestOptions).then(r => r.json()).then(r => {
            if(r.success) navigate('/');
            else alert("error")
        })

    }

    return (
        <section className="text-center">
            <div className="p-5 bg-image" style={{
                backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
                height: "300px"
            }}></div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: "-100px",
                background: "hsla(0, 0%, 100%, 0.8)",
                backdropFilter: "blur(30px)"
            }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Sign up now</h2>
                            <form method="post" action="/api/signup" onSubmit={submit}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example1" className="form-control" name="name"/>
                                            <label className="form-label" htmlFor="form3Example1">First name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" className="form-control"
                                                   name="lastname"/>
                                            <label className="form-label" htmlFor="form3Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="form3Example3" className="form-control" name="username"/>
                                    <label className="form-label" htmlFor="form3Example3">Username</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form3Example4" className="form-control" name="password"/>
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>


                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Sign up
                                </button>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
