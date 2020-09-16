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
              */