import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import ProductList from '../ProductList';
let denom = ""
var setDenom = function(changedenom) {
 denom = changedenom
}
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const { currentCategory } = state;


  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);
  let lastpressed;

  const handleClick = (id,) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
    lastpressed = id
  };

  return (
    <div>
      
      <h2>Choose a Category:</h2>
        <button className={"category-buttons"}
 onClick={() => {
            handleClick();
          }}>All</button>
      {categories.map((item) => (
        <button
          key={item._id}
          className={"category-buttons"}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
     <button className = {denom === "Indica" ? 'active' : ''}  onClick={() => {setDenom("Indica");
      handleClick(currentCategory)}}>indica</button>
     <button className = {denom === "Sativa" ? 'active' : ''} onClick={() => {setDenom("Sativa");
      handleClick(currentCategory)}}>Sativa</button>
     <button className = {denom === "Hybrid" ? 'active' : ''} onClick={() => {setDenom("Hybrid");
      handleClick(currentCategory)}}>Hybrid</button>
     <button onClick={() => {setDenom("");
      handleClick(currentCategory)}}>Reset</button>

       <ProductList 
        denomination={ denom }
        />
    </div>
  );
}

export default CategoryMenu;
