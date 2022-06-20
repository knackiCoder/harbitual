import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '../actions/userActions';
import { Link } from  "react-router-dom";

function Register() {
    const [ passwordShown, setPasswordShown ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");

    const togglePass = () => {
        setPasswordShown(passwordShown ? false : true)
    }

    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    console.log(userRegister);

    const { error, loading } = userRegister;


    const handleRegister = (e) => {
      e.preventDefault()

      dispatch(SignIn(email, name, password))
      setEmail("")
      setName("")
      setPassword("")
    };


  return (
      <>
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
              <h1 className="h2">Welcome to Habitual</h1>
              <p>Fill out the form to get started.</p>
            </div>
            {/* End Heading */}

            {/* Form */}
            <form onSubmit={handleRegister}>

              {error && <span className="alert alert-danger" role="alert">{error}</span>}
              {/* Form */}
              <div className="mb-2">
              <label 
                  className="form-label" htmlFor="signupModalFormLoginPassword">Email</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email@site.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
          />
                {error && <span className="invalid-feedback">{error}</span>}
              </div>
               {/* End Form */}

               {/* Form */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                <label 
                  className="form-label" htmlFor="signupModalFormLoginPassword">Name</label>
                </div>

                <div className="input-group input-group-merge">
                <input
                  className="form-control form-control-lg"
                  type="name"
                  placeholder="Your name"
                  value={name}
                  id="signupModalFormLoginPassword" 
                  onChange={(e) => setName(e.target.value)}
            />
                </div>

                {error && <span className="invalid-feedback">{error}</span>}

              </div>

              {/* Form */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                <label 
                  className="form-label" htmlFor="signupModalFormLoginPassword">Password</label>
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

                {error && <span className="invalid-feedback">{error}</span>}
              </div>

              {/* <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="signupHeroFormPrivacyCheck" name="signupFormPrivacyCheck" required />
                <label className="form-check-label small" htmlFor="signupHeroFormPrivacyCheck"> By submitting this form I have read and acknowledged the <a href="./page-privacy.html">Privacy Policy</a></label>
                <span className="invalid-feedback">Please accept our Privacy Policy.</span>
              </div> */}

              
              {/* End Form */}

              <div className="d-grid mb-3">
                <button disabled={loading} type="submit" className="btn btn-primary btn-lg">Sign Up</button>
              </div>

              <div className="text-center">
                <p>Already have an account? <Link to={'/login'} className="link" href="page-signup.html">Log in here</Link></p>
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

export default Register