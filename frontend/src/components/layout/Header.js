import React, { Fragment } from 'react'
import { Route,Link } from 'react-router-dom';
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/auth'


import '../../App.css'

const Header = () => {
  const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = ()=>{
      dispatch(logOut()) ;
    }
    
    

    

    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to= "/" className="logo1" >
          <h2 id="logo">BEST PRICE</h2>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Route render={({ history }) => <Search history={history} />} />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {user ? (<div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                
                                <span className="username">{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item logout"  to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>


                        </div>) : <Link to = "/login" className="btn" id="login_btn">Login</Link>}
        
        

        <button id="cart" className="btn"><i className="fa fa-shopping-cart" aria-hidden="true"></i><span className="ml-1" id="cart_count">2</span></button>
        
      </div>
    </nav>
        </Fragment>
    )
}

export default Header
