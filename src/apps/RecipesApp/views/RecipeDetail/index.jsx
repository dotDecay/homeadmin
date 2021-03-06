import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RecipeCritique from '../../components/RecipeCritique';
import RecipeDifficulty from '../../components/RecipeDifficulty';
import RecipeHealthiness from '../../components/RecipeHealthiness';

const calcUnits = ({ amount }, { servings }, servingAmount) =>
  (amount / servings) * servingAmount;

export default function RecipeDetails({ data }) {
  const [servingAmount, setServingAmount] = useState(null);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  let { itemid } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://dotdecay.com/homeadmin/api/recipe/read_one.php?id=' + itemid,
        );

        const json = await response.json();

        if (json.servings) {
          json.servings = parseInt(json.servings);
        }
        setRecipeDetail(json);
        setServingAmount(previousAmount => {
          if (!previousAmount) {
            return json.servings;
          }

          return previousAmount;
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [itemid]);

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
      {loading ? (
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
            {recipeDetail.healthiness && (
              <RecipeHealthiness healthiness={recipeDetail.healthiness} />
            )}
            {recipeDetail.difficulty && (
              <RecipeDifficulty difficulty={recipeDetail.difficulty} />
            )}
            <header>
              <h1 className='recipe-title'>{recipeDetail.title}</h1>
              {recipeDetail.critique && (
                <RecipeCritique critique={recipeDetail.critique} />
              )}
            </header>
            {recipeDetail.description && (
              <div className='recipe-description'>
                {recipeDetail.description}
              </div>
            )}
            {recipeDetail.tags && (
              <div className='recipe-tags'>
                {recipeDetail.tags.map(({ title }, key) => {
                  return (
                    <i key={key}>
                      <span>{title}</span>
                    </i>
                  );
                })}
              </div>
            )}
            {recipeDetail.preparationTime && (
              <div className='recipe-preparation-time'>
                <i className='material-icons'>timelapse</i>
                <span>
                  <b>Zubereitungszeit:</b>
                  <span>{recipeDetail.preparationTime} Min</span>
                </span>
              </div>
            )}
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
            {recipeDetail.nutritionalValues && (
              <div className='recipe-nutritional-values'>
                <i className='material-icons'>pie_chart</i>
                <span>
                  <b>Kalorien:</b>
                  {recipeDetail.nutritionalValues.calories !== null &&
                  typeof recipeDetail.nutritionalValues.calories !== 'undefined'
                    ? recipeDetail.nutritionalValues.calories + ' kcal'
                    : 'k.A.'}
                </span>
                <span>
                  <b>Kohlenhydrate:</b>
                  {recipeDetail.nutritionalValues.carbohydrates !== null &&
                  typeof recipeDetail.nutritionalValues.carbohydrates !==
                    'undefined'
                    ? recipeDetail.nutritionalValues.carbohydrates + ' g'
                    : 'k.A.'}
                </span>
                <span>
                  <b>Eiweiß:</b>
                  {recipeDetail.nutritionalValues.protein !== null &&
                  typeof recipeDetail.nutritionalValues.protein !== 'undefined'
                    ? recipeDetail.nutritionalValues.protein + ' g'
                    : 'k.A.'}
                </span>
                <span>
                  <b>Fett:</b>
                  {recipeDetail.nutritionalValues.fat !== null &&
                  typeof recipeDetail.nutritionalValues.fat !== 'undefined'
                    ? recipeDetail.nutritionalValues.fat + ' g'
                    : 'k.A.'}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
