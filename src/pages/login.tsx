import React from 'react';

import { Login } from '../user/LoginForm';
import { googleLoginUrl } from '../google';

export const LoginPage: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">sign in</h5>

              <Login />

              <hr className="my-4" />

              <a
                href={googleLoginUrl}
                className="btn btn-lg btn-google btn-block text-uppercase"
              >
                <i className="fab fa-google mr-2"></i> Sign in with Google
              </a>
              {/* <button className="btn btn-lg btn-facebook btn-block text-uppercase">
                <i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
