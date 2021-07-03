import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import Context from './Context';
import {
  fetchApiDrinks,
  fetchApiFoods,
  fetchCategoryFoods,
  fetchCategoryDrinks,
  fetchFilterFoods,
  fetchFilterDrinks } from '../services/fetchApi';
import Mock from '../services/mokcInformation';

function Provider({ children }) {
  // useStates...
  const [logout, setLogout] = useState(false);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [filterFoods, setFilterFoods] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneFilterRecipes, setDoneFilter] = useState([]);

  function getInFormations() {
    // const informationLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
    const fetchApis = async () => {
      const dataFoods = await fetchApiFoods();
      const dataDrinks = await fetchApiDrinks();
      const categoryFood = await fetchCategoryFoods();
      const categoryDrink = await fetchCategoryDrinks();
      setCategoryFoods(categoryFood);
      setFoods(dataFoods);
      setCategoryDrinks(categoryDrink);
      setDrinks(dataDrinks);
    };
    fetchApis();
    setDoneRecipes(Mock);
  }

  const clickFilterFood = (e) => {
    setCategory(e.target.innerText);
    if (e.target.innerText !== 'All') {
      setShowFilter(false);
      setFilterFoods([]);
      const getCategoryFoods = async () => {
        const data = await fetchFilterFoods(e.target.innerText);
        setFilterFoods(data);
      };
      getCategoryFoods();
    } if (category === e.target.innerText) {
      setShowFilter(true);
    } if (e.target.innerText === 'All') {
      setShowFilter(true);
    }
  };

  const clickFilterDrinks = (e) => {
    setCategory(e.target.innerText);
    if (e.target.innerText !== 'All') {
      setShowFilter(true);
      setFilterDrinks([]);
      const getCategoryDrinks = async () => {
        const data = await fetchFilterDrinks(e.target.innerText);
        setFilterDrinks(data);
      };
      getCategoryDrinks();
    } if (category === e.target.innerText) {
      setShowFilter(false);
    } if (e.target.innerText === 'All') {
      setShowFilter(false);
    }
  };

  const clickRecipeFood = (id) => {
    console.log(id);
  };

  const clickRecipeDrinks = (id) => {
    console.log(id);
  };

  const doneFilter = (e) => {
    const { innerText } = e.target;
    setDoneFilter([]);
    if (innerText === 'All') {
      setShowFilter(false);
      setDoneRecipes(Mock);
      setDoneFilter([]);
    }
    if (innerText === 'Food') {
      setShowFilter(true);
      const newRecipes = doneRecipes
        .filter((recipe) => (recipe.type === 'comida') && recipe);
      setDoneFilter(newRecipes);
    }
    if (innerText === 'Drinks') {
      setShowFilter(true);
      const newRecipes = doneRecipes
        .filter((recipe) => (recipe.type === 'bebida') && recipe);
      setDoneFilter(newRecipes);
    }
  };
  // ComponentDidMount
  useEffect(getInFormations, []);

  const dataValue = {
    logout,
    setLogout,
    foods,
    drinks,
    categoryFoods,
    categoryDrinks,
    filterFoods,
    filterDrinks,
    clickFilterFood,
    clickFilterDrinks,
    clickRecipeFood,
    clickRecipeDrinks,
    showFilter,
    email,
    setEmail,
    password,
    setPassword,
    search,
    setSearch,
    doneRecipes,
    doneFilter,
    doneFilterRecipes,
  };

  return (
    <Context.Provider value={ dataValue }>
      { children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
