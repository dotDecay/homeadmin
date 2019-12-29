import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails({ data }) {
  const [recipeDetail, setRecipeDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let { itemid } = useParams();

  useEffect(() => {
    fetch(`http://homeadmin.dotdecay.com/api/recipe/read_one.php?id=` + itemid)
      .then(res => res.json())
      .then(response => {
        setRecipeDetail(response);
        setIsLoading(false);
        console.log(response);
      })
      .catch(error => console.log(error));
  }, [itemid]);

  return (
    <div className='recipe-details'>
      {isLoading && (
        <p>Warte kurz. Ich lade die Rezept-Informationen für dich...</p>
      )}

      {recipeDetail && (
        <>
          <div className='recipe-images'>
            {recipeDetail.images &&
              recipeDetail.images.map((item, key) => {
                const imgStyle = {
                  backgroundImage: 'url(' + item + ')',
                };
                return <div key={key} style={imgStyle}></div>;
              })}
          </div>
          <div className='recipe-text'>
            <header>
              <h1 className='recipe-title'>{recipeDetail.title}</h1>
            </header>
            <div className='recipe-description'>{recipeDetail.description}</div>
            <div className='recipe-servings'>{recipeDetail.servings}</div>
            <div className='recipe-ingredients'>
              {recipeDetail.ingredients && (
                <ol>
                  {recipeDetail.ingredients.map((item, key) => {
                    return (
                      <li key={key}>
                        <span>{item.title}</span>
                        <span>
                          <span>{item.amount}</span>
                          <span>{item.amountUnit}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
            <div className='recipe-steps'>
              {recipeDetail.steps && (
                <ol>
                  {recipeDetail.steps.map((item, key) => {
                    return (
                      <li key={key}>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
