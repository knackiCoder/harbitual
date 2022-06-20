import React from 'react'
import { Link } from 'react-router-dom'

function ForgetPassword() {

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
        <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-dark" style={{backgroundImage: "url(assets/svg/components/wave-pattern-light.svg)" }}>
          <div className="flex-grow-1 p-5">
            <figure className="text-center">
              <div className="mb-4">
                <img className="avatar avatar-xl avatar-4x3" src="assets/svg/brands/mailchimp-white.svg" alt="Logo"/>
              </div>

              <blockquote className="blockquote blockquote-light">“ It has many landing page variations to choose from, which one is always a big advantage. ”</blockquote>

              <figcaption className="blockquote-footer blockquote-light">
                <div className="mb-3">
                  <img className="avatar avatar-circle" src="assets/img/160x160/img9.jpg" alt="Description" />
                </div>

                Lida Reidy
                <span className="blockquote-footer-source">Project Manager | Mailchimp</span>
              </figcaption>
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

        <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
          <div className="flex-grow-1 mx-auto" style={{maxWidth: "28rem" }}>
            <div className="text-center mb-5 mb-md-7">
              <h1 className="h2">Forgot password?</h1>
              <p>Enter your email address below and we'll get you back on track.</p>
            </div>
            <form className="js-validate needs-validation">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label" htmlFor="signupModalFormResetPasswordEmail" tabIndex="0">Your email</label>

                  <Link to={'/login'} className="form-label-link" href="page-login.html">
                    <i className="bi-chevron-left small ms-1"></i> Back to Log in
                  </Link>
                </div>

                <input type="email" className="form-control form-control-lg" name="email" id="signupModalFormResetPasswordEmail" tabIndex="1" placeholder="Enter your email address" aria-label="Enter your email address" required />
                <span className="invalid-feedback">Please enter a valid email address.</span>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>

</>
    );
}

export default ForgetPassword;