import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeListItem({
  title,
  images,
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
          {healthiness && (
            <div className={'recipe-healthiness factor-' + healthiness}>
              <i className='material-icons'>favorite</i>
              <i className='material-icons'>favorite</i>
              <i className='material-icons'>favorite</i>
            </div>
          )}
          {difficulty && (
            <div className={'recipe-difficulty factor-' + difficulty}>
              <i></i>
              <i></i>
              <i></i>
            </div>
          )}
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dotdecay.com/homeadmin/api/recipe/read.php`)
      .then(res => res.json())
      .then(response => {
        setRecipeList(response.records);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='recipe-list'>
      {isLoading ? (
        <p>Warte kurz. Ich lade die Rezepte für dich...</p>
      ) : (
        recipeList &&
        recipeList.map((item, key) => (
          <RecipeListItem
            key={key}
            title={item.title}
            images={item.images}
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
