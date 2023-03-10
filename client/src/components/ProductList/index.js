import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
function ProductList({ denomination }) {

  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);
  function filterProducts() {
    let results;
    if (!currentCategory) {
      results = state.products.filter(
        (product) => 
        product.denomination === denomination || denomination === "",
      );
      return results
    }
    if(denomination !== "") {
      results = state.products.filter(
        (product) => product.category._id === currentCategory &&
        product.denomination === denomination,
      );
      return results

    }
    results = state.products.filter(
      (product) => product.category._id === currentCategory,
    );
      console.log(results)
    return results
  }
  return (
      <div className="my-2">
        <h2>Our Products:</h2>
          <div className="body-grid">
            {filterProducts().map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                denomination={product.denomination}
              />
            ))}
          </div>
      </div>
  );
}

export default ProductList;
