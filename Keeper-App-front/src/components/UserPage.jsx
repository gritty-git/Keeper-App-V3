import React from "react";
import Header from "./Header";
import Footer from "./Footer";
function UserPage(props){

    return (
        <div className="">
            
            <Header username={'-!'} logout={props.logout}/>
            <div className="row m-5 form-holder userpage">
                <div className="col-sm-5">
                    <h1>Login</h1>
                    
                    <div className="card">
                        <div className="card-body">
                        
                            <form action="/" method="POST" className="validate" onSubmit={props.loginclick}>
                                <div className="form-group">
                                <label htmlFor="username" >Username</label>
                                <input type="text" name="username" id="usernamelogin" placeholder="Username" value={props.loginuser.username} onChange={props.loginuserchange} required />
                                </div>
                                <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="passwordlogin" placeholder="Password" value={props.loginuser.password} onChange={props.loginuserchange} required />
                                </div>
                                <button type="submit" className="btn btn-dark">Login</button>
                            </form>
                            {(props.wrongloggedin) && <div>
                                Wrong Login Credentials!! Try Logging in again OR Signup as a new user!
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <h1>Register</h1>
                    <div className="card">
                        <div className="card-body">

                        
                        <form action="/" method="POST" className="validate" onSubmit={props.formsubmit}>
                            <div className="form-group">
                            <label htmlFor="username" >Username</label>
                            <input type="text" name="username" id="usernamesignup" placeholder="Username" value={props.user.username} onChange={props.userchange} required />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="passwordsignup" placeholder="Password" value={props.user.password} onChange={props.userchange} required />
                            </div>
                            <button type="submit" className="btn btn-dark">Register</button>
                        </form>
                        {(props.repeateduser) && <div>
                                Username Already Exists!!
                            </div>}        
                        </div>
                    </div>
                </div> 
            </div>
            <Footer/>
        </div>
    )
}



export default UserPage;