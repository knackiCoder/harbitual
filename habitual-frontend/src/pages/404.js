import React from 'react'

const ErrorPage = () => {
  return (
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
      <header id="header" className="navbar navbar-expand navbar-light navbar-absolute-top">
    <div className="container">
      <nav className="navbar-nav-wrap">

        <a className="navbar-brand" href="./index.html" aria-label="Front">
          <img className="navbar-brand-logo" src="./assets/svg/logos/logo.svg" alt="Logo" />
        </a>

      </nav>
    </div>
  </header>

    <main id="content" role="main">
    <div className="container text-center">
      <div className="mb-3">
        <img className="img-fluid" src="./assets/svg/illustrations/oc-error.svg" alt="Description" style={{maxWidth: "30rem"}}/>
      </div>

      <div className="mb-4">
        <p className="fs-4 mb-0">Oops! Looks like you followed a bad link.</p>
        <p className="fs-4">If you think this is a problem with us, please <a className="link" href="">tell us</a>.</p>
      </div>

      <a className="btn btn-primary" href="./index.html">Go back home</a>
    </div>
  </main>

  <footer className="position-absolute start-0 end-0 bottom-0">
    <div className="container pb-5 content-space-b-sm-1">
      <div className="row justify-content-between align-items-center">
        <div className="col-sm mb-3 mb-sm-0">
          <p className="small mb-0">&copy; Front. 2021 Htmlstream.</p>
        </div>

        <div className="col-sm-auto">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a className="btn btn-soft-secondary btn-xs btn-icon" href="facebook.com">
                <i className="bi-facebook"></i>
              </a>
            </li>

            <li className="list-inline-item">
              <a className="btn btn-soft-secondary btn-xs btn-icon" href="google.com">
                <i className="bi-google"></i>
              </a>
            </li>

            <li className="list-inline-item">
              <a className="btn btn-soft-secondary btn-xs btn-icon" href="twitter.com">
                <i className="bi-twitter"></i>
              </a>
            </li>

            <li className="list-inline-item">
              <a className="btn btn-soft-secondary btn-xs btn-icon" href="github.com">
                <i className="bi-github"></i>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </footer>
  </div>
  )
}

export default ErrorPage