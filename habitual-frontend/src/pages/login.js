import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from "react-router-dom"
import { SignUp } from '../actions/userActions';
import useAuth from '../hooks/useAuth';

function Login() {
  const { user } = useAuth()
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordShown, setPasswordShown ] = useState(false);
  
    const togglePass = () => {
        setPasswordShown(passwordShown ? false : true)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()


    const from = location.state?.path ||  "/"
    console.log(from)
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error } = userLogin;

    const handleLogin = (e) => {
      e.preventDefault()

      try {
        dispatch(SignUp(email, password));
        setEmail("")
        setPassword("")
      } catch (error) {
        console.log(error)
      }
    
    }

    useEffect(() => {
      if(user) {
        navigate(from, { replace: true });
      }
    }, [user])

  return (
      <>
    <header id="header" className="navbar navbar-expand navbar-light navbar-absolute-top">
    <div className="container-fluid">
      <nav className="navbar-nav-wrap">
        
        <a className="navbar-brand d-none d-lg-flex" href="index.html" aria-label="Front">
          <img className="navbar-brand-logo" src="assets/svg/logos/logo-white.svg" alt="Logo" />
        </a>


        <a className="navbar-brand d-flex d-lg-none" href="index.html" aria-label="Front">
          <img className="navbar-brand-logo" src="assets/svg/logos/logo.svg" alt="Logo" />
        </a>

        <div className="ms-auto">
          <a className="link link-sm link-secondary" href="index.html">
            <i className="bi-chevron-left small ms-1"></i> Go to main
          </a>
        </div>
      </nav>
    </div>
  </header>

  <main id="content" role="main" className="flex-grow-1">
    <div className="container-fluid">
        <div className="row">
        <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-dark" style={{backgroundImage: "url(assets/svg/components/wave-pattern-light.svg)"}}>

        <div className="flex-grow-1 p-5">
        <figure className="text-center">
        <div className="mb-4">
                <img className="avatar avatar-xl avatar-4x3" src="assets/svg/brands/mailchimp-white.svg" alt="Logo" />

                <blockquote className="blockquote blockquote-light">“ It has many landing page variations to choose from, which one is always a big advantage. ”</blockquote>
                
                <figcaption className="blockquote-footer blockquote-light">
                <div className="mb-3">
                  <img className="avatar avatar-circle" src="assets/img/160x160/img9.jpg" alt="circle" />
                </div>

                Lida Reidy
                <span className="blockquote-footer-source">Project Manager | Mailchimp</span>
              </figcaption>
                </div>
            </figure>

            <div className="position-absolute start-0 end-0 bottom-0 text-center p-5">
              <div className="row justify-content-center">
                <div className="col text-center py-3">
                  <img className="avatar avatar-lg avatar-4x3" src="assets/svg/brands/fitbit-white.svg" alt="Logo" />
                </div>
                

                <div className="col text-center py-3">
                  <img className="avatar avatar-lg avatar-4x3" src="assets/svg/brands/business-insider-white.svg" alt="Logo" />
                </div>
                

                <div className="col text-center py-3">
                  <img className="avatar avatar-lg avatar-4x3" src="assets/svg/brands/capsule-white.svg" alt="Logo" />
              </div>
            </div>
        </div>
        </div>
     </div>
     {/* End of column */}

     <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
          <div className="flex-grow-1 mx-auto" style={{maxWidth: "28rem"}}>
             {/* Heading */}
            <div className="text-center mb-5 mb-md-7">
              <h1 className="h2">Welcome back</h1>
              <p>Login to manage your account.</p>
            </div>
            {/* End Heading */}

            {/* Form */}
            <form onSubmit={handleLogin}>
            {error && <span className="alert alert-danger" role="alert">{error}</span>}
              <div className="mb-4">
              <label 
                  className="form-label" htmlFor="signupModalFormLoginPassword">Email</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email@site.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          />
              </div>
               {/* End Form */}

               {/* Form */}
               <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                <label 
                  className="form-label" htmlFor="signupModalFormLoginPassword">Password</label>

                <Link to={'/forget-password'} className="form-label-link" href="page-reset-password.html">Forgot Password?</Link>
                </div>

                <div className="input-group input-group-merge">
                  <input
                    className="form-control form-control-lg"
                    type={passwordShown ? "text" : "password"} 
                    placeholder="8+ characters required" 
                    minLength="6" 
                    value={password}
                    id="signupModalFormLoginPassword" 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  
                    <i id="changePassIcon" onClick={togglePass}className="input-group-append input-group-text bi-eye"></i>
                </div>
                </div>
              {/* End Form */}

              <div className="d-grid mb-3">
                <button disabled={loading} type="submit" className="btn btn-primary btn-lg">Login</button>
              </div>

              <div className="text-center">
                <p>Don't have an account yet? <Link to={'/register'} className="link" href="/">Sign up here</Link></p>
              </div>
            </form>
             {/* End Form */}
          </div>
        </div>
    </div>
  </div>
  </main>
  </>
  )
}

export default Login