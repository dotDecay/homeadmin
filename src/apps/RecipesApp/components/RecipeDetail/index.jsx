import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const calcUnits = ({ amount }, { servings }, servingAmount) =>
  (amount / servings) * servingAmount;

export default function RecipeDetails({ data }) {
  const [servingAmount, setServingAmount] = useState(null);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let { itemid } = useParams();

  useEffect(() => {
    fetch(`http://homeadmin.dotdecay.com/api/recipe/read_one.php?id=` + itemid)
      .then(res => res.json())
      .then(response => {
        if (response.servings) {
          response.servings = parseInt(response.servings);
        }
        setRecipeDetail(response);
        setIsLoading(false);
        if (servingAmount === null) {
          setServingAmount(response.servings);
        }
      })
      .catch(error => console.log(error));
  }, [servingAmount, itemid]);

  const handleServingAmountChange = mode => {
    switch (mode) {
      case 'increase':
        if (servingAmount !== 99) {
          setServingAmount(previousAmount => previousAmount + 1);
        }
        break;
      case 'decrease':
        if (servingAmount !== 1) {
          setServingAmount(previousAmount => previousAmount - 1);
        }
        break;
      default:
        throw new Error('missing case');
    }
  };

  return (
    <div className='recipe-details'>
      {isLoading ? (
        <p>Warte kurz. Ich lade die Rezept-Informationen für dich...</p>
      ) : (
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
            <div className='recipe-servings'>
              <div>
                <i
                  className='material-icons'
                  onClick={() => handleServingAmountChange('decrease')}
                >
                  remove
                </i>
                <span>{servingAmount}</span>
                <i
                  className='material-icons'
                  onClick={() => handleServingAmountChange('increase')}
                >
                  add
                </i>
              </div>
            </div>
            <div className='recipe-ingredients'>
              {recipeDetail.ingredients && (
                <ol>
                  {recipeDetail.ingredients.map((item, key) => {
                    return (
                      <li key={key}>
                        <span>{item.title}</span>
                        <span>
                          <span>
                            {calcUnits(item, recipeDetail, servingAmount)}
                          </span>
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
