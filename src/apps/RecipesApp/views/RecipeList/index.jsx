import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RecipeCritique from '../../components/RecipeCritique';
import RecipeDifficulty from '../../components/RecipeDifficulty';
import RecipeHealthiness from '../../components/RecipeHealthiness';

function RecipeListItem({
  title,
  images,
  critique,
  healthiness,
  difficulty,
  tags,
  itemID,
}) {
  return (
    <div className='recipe-item'>
      <Link to={'/recipes/details/' + itemID} className='recipe-item-inner'>
        <div className='recipe-images'>
          {images &&
            images.map((item, key) => {
              //const altKey = title + ' Screenshot Nr. ' + (key + 1);
              const imgStyle = {
                backgroundImage: 'url(' + item + ')',
              };
              return <div key={key} style={imgStyle}></div>;
            })}
        </div>
        <div className='recipe-text'>
          <div className='recipe-title'>{title && title}</div>
          {critique && <RecipeCritique critique={critique} />}
          {healthiness && <RecipeHealthiness healthiness={healthiness} />}
          {difficulty && <RecipeDifficulty difficulty={difficulty} />}
          {tags && (
            <div className='recipe-tags'>
              {tags.map(({ title }, key) => {
                return (
                  <i key={key}>
                    <span>{title}</span>
                  </i>
                );
              })}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default function RecipeList({ data }) {
  const [recipeList, setRecipeList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://dotdecay.com/homeadmin/api/recipe/read.php',
        );
        const json = await response.json();
        setRecipeList(json.records);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className='recipe-list'>
      {loading ? (
        <p>Warte kurz. Ich lade die Rezepte für dich...</p>
      ) : (
        recipeList &&
        recipeList.map((item, key) => (
          <RecipeListItem
            key={key}
            title={item.title}
            images={item.images}
            critique={item.critique}
            healthiness={item.healthiness}
            difficulty={item.difficulty}
            tags={item.tags}
            itemID={item.id}
          />
        ))
      )}
    </div>
  );
}
