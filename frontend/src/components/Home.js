import React, { Fragment, useState , useEffect } from 'react'
import {useDispatch , useSelector} from 'react-redux' ; 
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination'



import MetaData from './layout/MetaData'


import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'



const Home = ({match}) => {
  const [currentPage, setCurrentPage] = useState(1)
  
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)
  {/* set keyword to params keyword backend    */}
const keyword = match.params.keyword
  

  useEffect(() => {
      if (error) {
          return alert.error(error)
      }
      {/* pass currentpage and keyword to getpro func.    */}

      dispatch(getProducts(keyword , currentPage));

{/* Dependancies arr */}
  }, [dispatch, alert, error, , currentPage , keyword])

    function setCurrentPageNo(PageNum){
      {/* set function parameter in usestate hook    */}
      setCurrentPage(PageNum)

    }

    

    return (
       
                <Fragment>
                  {/* check if loading is true from product reducer and it is true when it send req only   */}
                   {loading ? <div className = "loader"></div> : (
                     <Fragment>
                     <MetaData title={'Enjoy Shooping Online'} />
                      
  
                      <h1 id="products_heading">Latest Products</h1>
  
      <section id="products" className="container mt-5">
        <div className="row">
          {/* returning a new array of JSX by using map array method  */}
  
           
          {products && products.map(product => (
            <div key ={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src={product.images[0].url}
                
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link to={`product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{width : `${(product.ratings/5)*100}%`}}></div>
                  </div>
                  <span id="no_of_reviews">{product.ratings}</span>
                </div>
                <p className="card-text">${product.price}</p>
                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
              </div>
            </div>
          </div>
  
          ))}
          
  
          
        </div>
      </section>
      {resPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                     </Fragment>

                   )}
                   
                    
                                </Fragment>
                            
            

       
    )
}

export default Home
