import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Navbar from "./component/navbar";


export default () => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!document.cookie) navigate('/login')
    },[])

    return (
        <div className="container-xl">
            <Navbar></Navbar>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <h2 style={{marginTop: "20px"}}>
                            If you can reach this page, that mean it is free for you :)
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
