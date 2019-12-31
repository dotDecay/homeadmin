import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';

import { TagContextProvider } from './context';
import { AppContainer, AppInner } from '../AppContainer';
import { RecipeList, RecipeDetail } from './components';

const recipeList = require('./apiTests/recipesOverview.json');
const recipeDetail = require('./apiTests/recipeDetail.json');

//const recipeListApp = require('http://homeadmin.dotdecay.com/api/recipe/read.php');
//console.log(recipeListApp);

const navItems = [
  {
    title: 'Rezepte',
    icon: <i className='material-icons'>local_dining</i>,
    to: '/recipes',
  },
  {
    title: 'Details',
    icon: <i className='material-icons'>local_dining</i>,
    to: '/recipes/details/2',
  },
];

export default function RecipesApp({ mainPath }) {
  return (
    <>
      <Helmet>
        <title>Rezepte</title>
        <meta name='theme-color' content='#20222e' />
      </Helmet>
      <TagContextProvider>
        <AppContainer navItems={navItems} className='recipe-app'>
          <Route path={mainPath} exact>
            <AppInner title='Rezepte'>
              <RecipeList data={recipeList.recipes} />
            </AppInner>
          </Route>

          <Route path={mainPath + '/details/:itemid'} exact>
            <AppInner title='Rezepte Details' backToPath='/recipes'>
              <RecipeDetail data={recipeDetail.recipe} />
            </AppInner>
          </Route>
        </AppContainer>
      </TagContextProvider>
    </>
  );
}
