import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';

import { TagContextProvider } from './context';
import { AppContainer, AppInner } from '../AppContainer';
import { RecipeList, RecipeDetail, RecipeAddEdit } from './views';

const navItems = [
  {
    title: 'Rezepte',
    icon: <i className='material-icons'>local_dining</i>,
    to: '/recipes',
  },
  {
    title: 'Hinzufügen',
    icon: <i className='material-icons'>local_dining</i>,
    to: '/recipes/add',
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
              <RecipeList />
            </AppInner>
          </Route>

          <Route path={mainPath + '/details/:itemid'} exact>
            <AppInner title='Rezepte Details' backToPath='/recipes'>
              <RecipeDetail />
            </AppInner>
          </Route>

          <Route path={mainPath + '/add'} exact>
            <AppInner title='Rezept hinzufügen' backToPath='/recipes'>
              <RecipeAddEdit />
            </AppInner>
          </Route>
        </AppContainer>
      </TagContextProvider>
    </>
  );
}
