import React, { useState, useEffect } from 'react'
import axios from 'axios';
function Login1(props) {
    const [employee, setemployee] = useState({ Email: '', Password: '' });
    const apiUrl = "https://localhost:44328/api/Login";
    const Login = (e) => {
        e.preventDefault();
        debugger;
        const data = { Email: employee.Email, Password: employee.Password };
        axios.post(apiUrl, data)
            .then((result) => {
                debugger;
                console.log(result.data);
                const serializedState = JSON.stringify(result.data.UserDetails);
                var a = localStorage.setItem('myData', serializedState);
                console.log("A:", a)
                const user = result.data.UserDetails;
                console.log(result.data.message);
                if (result.data.status == '200')
                    props.history.push('/fetchProduct')
                else
                    alert('Invalid User');
            })
    };

    const onChange = (e) => {
        e.persist();
        debugger;
        setemployee({ ...employee, [e.target.name]: e.target.value });
    }
    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form onSubmit={Login} className="user">
                                            <div className="form-group">
                                                <input type="text" className="form-control" value={employee.Email} onChange={onChange} name="Email" id="Email" aria-describedby="emailHelp" placeholder="Enter User Name" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" value={employee.Password} onChange={onChange} name="Password" id="DepPasswordartment" placeholder="Password" />
                                            </div>
                                            {/* <div className="form-group">  
                          <div className="custom-control custom-checkbox small">  
                            <input type="checkbox" className="custom-control-input" id="customCheck"/>  
                            <label className="custom-control-label" for="customCheck">Remember Me</label>  
                          </div>  
                        </div> */}
                                            <button type="submit" className="btn btn-info mb-1" ><span>Login</span></button>
                                            <hr />
                                        </form>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login1