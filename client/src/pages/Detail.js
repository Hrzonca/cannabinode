import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
         <div className="container my-1">
           <div className='single-view-grid'>
            <div className='main1'>
              <Link to="/">??? Back to Products</Link>

              <h1>{currentProduct.name}</h1>
                <div className='flex-row py-2'>
                  <h3 className={currentProduct.denomination}>{currentProduct.denomination}</h3>
                </div>
                <div>
                   <p>Size</p>
                    <ul className='individual-sizes-ul'>
                      <li>
                        <div className='sizes-inner-conatainer'>
                          <p>$ {currentProduct.price * 14}</p>
                          <div>
                            <p>1oz</p>
                          </div>
                        </div>
                      </li>
                      <li> <div className='sizes-inner-conatainer'>
                          <p>$ {currentProduct.price * 7}</p>
                          <div>
                            <p>1/2oz</p>
                          </div>
                        </div>
                      </li>
                      <li> <div className='sizes-inner-conatainer'>
                          <p>$ {currentProduct.price * 3}</p>
                          <div>
                            <p>1/8oz</p>
                          </div>
                        </div>
                      </li>
                      <li> <div className='sizes-inner-conatainer'>
                          <p>$ {currentProduct.price}</p>
                          <div>
                            <p>1g</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                </div>
                <div>
                  <p>Quantity</p>
                  <p className='quantity-button'>1</p>
                  <div className='addtocart-div'>
                      <button className="addtocart-button" onClick={addToCart}>Add to Cart</button>
                  </div>
                  <div className='addtocart-div'>
                    <button
                        disabled={!cart.find((p) => p._id === currentProduct._id)}
                        onClick={removeFromCart}
                      >
                        Remove from Cart
                      </button>
                  </div>
                </div>
                <div className='description-div'>
                  <h2>Description</h2>
                  <p className='product-description'>{currentProduct.description}</p>
                </div>

            </div>
            <div className='main2'>
              <img
                  src={`/images/${currentProduct.image}`}
                  alt={currentProduct.name}
                />
              </div>
           </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
