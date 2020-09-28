/*
const { isLoginActive } = this.state;
        //const current = isLoginActive ? "Register" : "Login";
<div classname="login">
                  <div classname="container">
                      {isLoginActive && (<Login containerRef={(ref) => this.current = ref}/>)}
                      {!isLoginActive && (<Register containerRef={(ref) => this.current = ref}/>)}
                  </div>
              </div>

              <div classname="changebtn">
                <div>
                    {isLoginActive && (<button onClick={this.changeState}>Don't have an account?</button>)}
                    {!isLoginActive && (<button onClick={this.changeState}>Already have an account?</button>)}
                </div>
              </div>


<ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </ul>


              
<li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        User
                    </Link>
                </li>

                <li className="nav-item">
                    <a href="#" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>



render() {
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Type your user name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Type your password"/>
                    </div>
                </div>
            </div>
            <div classname="footer">
                <button type="button" className="btn">Login</button>
            </div>
        </div>
    }





render() {
        return <div className="base-container"  ref={this.props.containerRef}>
            <div className="header">Register</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" placeholder="Type your user name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Type your email address"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Type your password"/>
                    </div>
                </div>
            </div>
            <div classname="footer">
                <button type="button" className="btn">Register</button>
            </div>
        </div>
    }
              

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .header {
        font-size: 48px;
        font-family: "Open Sans", sans-serif;
    }

    .content {
        display: flex;
        flex-direction: column;

        .form {
            margin-top: 2em;
            display: flex;
            flex-direction: column;
            align-items: center;

            .form-group {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: fit-content;
                label {
                    font-size: 20px;
                }

                input {
                    margin-top: 6px;
                    min-width: 18em;
                    height: 40px;
                    padding: 0px 10px;
                    font-size: 16px;
                    font-family: "Open Sans", sans-serif;
                    background-color: #f3f3f3;
                    border: 0;
                    border-radius: 4px;
                    margin-bottom: 31px;
                    transition: all 250ms ease-in-out;
                    &:focus {
                        outline: none;
                        box-shadow: 0px 0px 12px 0.8px #0e81ce96;
                    }
                }
            }
        }
    }

    .footer {
        margin-top: 3em;
    }
}    

<img alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />

input {
            margin-top: 6px;
            min-width: 18em;
            height: 40px;
            padding: 0px 10px;
            font-size: 16px;
            font-family: 'roboto', sans-serif;
            background-color: #f3f3f3;
            width: 320px;
            border: 0;
            border-radius: 4px;
            margin-bottom: 10px;
            transition: all 250ms ease-in-out;
            &:focus {
                outline: none;
                box-shadow: 0px 0px 12px 0.8px #0e81ce96;
            }
        }
*/