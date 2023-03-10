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
// eslint-disable-next-line
var clicked = ""
var setDenom = function(changedenom) {
 denom = changedenom
}
// eslint-disable-next-line
var hideConent = function(element) {
  console.log(element)
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
  // eslint-disable-next-line
  let lastpressed;

  const handleClick = (id,) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
    lastpressed = id
  };

  return (
      <div className='category-container'>
        <h2>Choose a Category:</h2>
        <ul className='filter-ul'>
            <button className={"category-buttons"}
    onClick={() => {
                handleClick();
              }}>All</button>
          {categories.map((item) => (
            <li>
              <button
                key={item._id}
                onClick={() => {
                  handleClick(item._id);
                }}
                className = {currentCategory === item._id ? 'category-buttons active' : 'category-buttons'}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
     <h2>Filter by Denomination:</h2>
      <ul className='filter-ul'>
        <li>
          <button className = {denom === "Indica" ? 'filter-button active' : 'filter-button'}  onClick={() => {setDenom("Indica");
            handleClick(currentCategory)}}>Indica</button>
        </li>
        <li>
          <button className = {denom === "Sativa" ? 'filter-button active' : 'filter-button'} onClick={() => {setDenom("Sativa");
            handleClick(currentCategory)}}>Sativa</button>
        </li>
        <li>
          <button className = {denom === "Hybrid" ? 'filter-button active' : 'filter-button'} onClick={() => {setDenom("Hybrid");
            handleClick(currentCategory)}}>Hybrid</button>
        </li>
        <li>
          <button className={"filter-button"} onClick={() => {setDenom("");
            handleClick(currentCategory)}}>Reset</button>
        </li>
      </ul>
       <ProductList 
        denomination={ denom }
        />
    </div>
  );
}

export default CategoryMenu;
