import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/productDetails'
import Login from './components/Login'
import Register from './components/Register'
import { loadUser } from './actions/auth'

import store from './store'


function App() {
  useEffect(() => {
    store.dispatch(loadUser()) } , [])

  

  
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          </div>
          
        
          <Footer />
        
      </div>
    </Router>
  );
}

export default App ;
