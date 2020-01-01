import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTags } from '../../context/TagContext';

const demo = false;

const INITIAL_STATE = {
  title: '',
  description: '',
  images: [],
  ingredients: [],
  steps: [],
  servings: 1,
  critique: null,
  healthiness: null,
  preparationTime: null,
  difficulty: null,
  nutritionalValues: {
    calories: null,
    carbohydrates: null,
    protein: null,
    fat: null,
  },
  tags: [],
};

const AMOUNT_UNITS_VOLUMES = ['l', 'dl', 'cl', 'ml'];
const AMOUNT_UNITS_WEIGHTS = ['kg', 'g'];
const AMOUNT_UNITS_KITCHEN = [
  'Prise',
  'Esslöffel',
  'Teelöffel',
  'Bund',
  'Spritzer',
  'Schuss',
  'Tropfen',
  'Messerspitze',
];
const AMOUNT_UNITS_GENERAL = [
  'Stück',
  'Dose',
  'Karton',
  'Packung',
  'Scheibe',
  'Blatt',
];

const AMOUNT_UNITS = {
  general: {
    title: 'Allgemeine Begriffe',
    items: AMOUNT_UNITS_GENERAL,
  },
  volumes: {
    title: 'Flüssigkeitsangeben',
    items: AMOUNT_UNITS_VOLUMES,
  },
  weights: {
    title: 'Gewichtsangeben',
    items: AMOUNT_UNITS_WEIGHTS,
  },
  kitchen: {
    title: 'Küchenbegriffe',
    items: AMOUNT_UNITS_KITCHEN,
  },
};

const DUMMY_INGREDIENT = {
  title: '',
  amount: 1,
  amountUnit: 'Stück',
};

export default function RecipeAddEdit() {
  const [recipe, setRecipe] = useState(INITIAL_STATE);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [step, setStep] = useState('');

  // Tags laden
  const { tags } = useTags();
  useEffect(() => {
    setAvailableTags(tags);
  }, [tags, availableTags]);

  // Falls bearbeiten dann Daten laden
  let { itemid } = useParams();
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://dotdecay.com/homeadmin/api/recipe/read_one.php?id=' + itemid,
        );
        const json = await response.json();
        console.log(json);
        setRecipe(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [itemid]);

  // submit
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    let url = 'https://dotdecay.com/homeadmin/api/recipe/create.php';
    // bearbeiten hat eine andere url
    if (itemid) {
      url = 'https://dotdecay.com/homeadmin/api/recipe/edit.php?id=' + itemid;
    }

    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(recipe),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value, type } = event.target;

    switch (type) {
      case 'number':
        setRecipe({ ...recipe, [name]: parseInt(value, 10) });
        break;
      case 'radio':
        if (value === '') {
          setRecipe({ ...recipe, [name]: null });
        } else {
          setRecipe({ ...recipe, [name]: parseInt(value, 10) });
        }
        break;
      case 'checkbox':
        setRecipe({ ...recipe, [name]: !recipe[name] });
        break;
      default:
        setRecipe({ ...recipe, [name]: value });
        break;
    }
  }
  function handleReset() {
    setRecipe(INITIAL_STATE);
  }

  function handleAddIngredient() {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { ...DUMMY_INGREDIENT, id: recipe.ingredients.length + 1 },
      ],
    });
  }

  function handleRemoveIngredient(id) {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter(dataset => dataset.id !== id),
    });
  }

  function handleAddImage() {
    setRecipe({
      ...recipe,
      images: [...recipe.images, image],
    });

    setImage('');
  }

  function handleRemoveImage(url) {
    setRecipe({
      ...recipe,
      images: recipe.images.filter(imageUrl => imageUrl !== url),
    });
  }

  function handleImageChange(event) {
    setImage(event.target.value);
  }

  function handleStepChange(event) {
    setStep(event.target.value);
  }

  function handleAddStep() {
    setRecipe({
      ...recipe,
      steps: [...recipe.steps, step],
    });

    setStep('');
  }

  function handleRemoveStep(step) {
    setRecipe({
      ...recipe,
      steps: recipe.steps.filter(recipeStep => recipeStep !== step),
    });
  }

  function handleIngredientUpdate(event) {
    const { value, name, dataset } = event.target;

    const id = parseInt(dataset.id, 10);

    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.map(ingredient => {
        if (ingredient.id === id) {
          return { ...ingredient, [name]: value };
        }

        return ingredient;
      }),
    });
  }

  function handleTagSelection(event) {
    const { value } = event.target;

    if (
      value.length === 0 ||
      !availableTags.find(dataset => dataset.title === value)
    ) {
      return;
    }

    const getTag = availableTags.find(datasetTag => datasetTag.title === value);

    setRecipe({ ...recipe, tags: [...recipe.tags, getTag] });
  }

  function handleTagRemoval(id) {
    setRecipe({
      ...recipe,
      tags: recipe.tags.filter(dataset => dataset.id !== id),
    });
  }

  function handleChangeNutritionalValues(event) {
    const { name, value } = event.target;

    setRecipe({
      ...recipe,
      nutritionalValues: {
        ...recipe.nutritionalValues,
        [name]: parseInt(value, 10),
      },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <Block>
            <label>
              Titel{' '}
              <input
                type='text'
                autoFocus={false}
                required
                name='title'
                onChange={handleChange}
                value={recipe.title}
              />
            </label>
          </Block>

          <Block>
            <label>
              Beschreibung{' '}
              <textarea
                type='text'
                required
                name='description'
                onChange={handleChange}
                value={recipe.description}
              />
            </label>
          </Block>

          <hr />

          <Block>
            {recipe.images.map(image => (
              <Fragment key={image}>
                <img src={image} width='50' height='50' alt='' />
                <button type='button' onClick={() => handleRemoveImage(image)}>
                  Bild entfernen
                </button>
              </Fragment>
            ))}

            {recipe.images.length > 0 && <br />}

            <label>
              <input
                type='url'
                placeholder='Link einfügen'
                onChange={handleImageChange}
                value={image}
              />

              <button
                type='button'
                onClick={handleAddImage}
                disabled={image.length === 0}
              >
                Bild hinzufügen
              </button>
            </label>
          </Block>

          <br />

          <Block>
            {recipe.ingredients.length > 0 && (
              <ul>
                {recipe.ingredients.map(ingredient => (
                  <li key={ingredient.id}>
                    <label>
                      Bezeichnung{' '}
                      <input
                        type='text'
                        name='title'
                        data-id={ingredient.id}
                        value={ingredient.title}
                        autoFocus={ingredient.title === ''}
                        onChange={handleIngredientUpdate}
                      />
                    </label>
                    <br />
                    <label>
                      Anzahl/Menge{' '}
                      <input
                        type='number'
                        name='amount'
                        data-id={ingredient.id}
                        value={ingredient.amount}
                        onChange={handleIngredientUpdate}
                      />
                    </label>
                    <br />
                    <label>
                      Einheit{' '}
                      {AMOUNT_UNITS && (
                        <select
                          name='amountUnit'
                          data-id={ingredient.id}
                          onChange={handleIngredientUpdate}
                        >
                          {Object.keys(AMOUNT_UNITS).map((item, i) => (
                            <optgroup label={AMOUNT_UNITS[item].title} key={i}>
                              {AMOUNT_UNITS[item].items.map((option, i2) => (
                                <option value={option} key={i2}>
                                  {option}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      )}
                    </label>

                    <br />
                    <DeleteButton
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                    />
                  </li>
                ))}
              </ul>
            )}

            {recipe.ingredients.length > 0 && <br />}

            <label>
              <button type='button' onClick={handleAddIngredient}>
                Zutat hinzufügen
              </button>
            </label>
          </Block>

          <br />

          <Block>
            {recipe.steps.length > 0 && (
              <ul>
                {recipe.steps.map(step => (
                  <li key={step}>
                    {step}{' '}
                    <DeleteButton onClick={() => handleRemoveStep(step)} />
                  </li>
                ))}
              </ul>
            )}

            {recipe.steps.length > 0 && <br />}

            <label>
              <input
                type='text'
                placeholder='Schritt einfügen'
                onChange={handleStepChange}
                value={step}
              />

              <button
                type='button'
                onClick={handleAddStep}
                disabled={step.length === 0}
              >
                Schritt hinzufügen
              </button>
            </label>
          </Block>

          <Block>
            <label>
              Portionen{' '}
              <input
                type='number'
                name='servings'
                onChange={handleChange}
                min='1'
                max='99'
                value={recipe.servings}
              />
            </label>
          </Block>

          <Block>
            <label>
              Bewertung{' '}
              <CritiqueRating
                critique={recipe.critique}
                onChange={handleChange}
              />
            </label>
          </Block>

          <Block>
            <label>
              Gesund{' '}
              <Healthiness
                healthiness={recipe.healthiness}
                onChange={handleChange}
              />
            </label>
          </Block>

          <Block>
            <label>
              Vorbereitungsdauer (min){' '}
              <input
                type='number'
                name='preparationTime'
                onChange={handleChange}
                min='0'
                max='10000'
                value={recipe.preparationTime}
              />
            </label>
          </Block>

          <Block>
            <label>
              Schwierigkeitsgrad{' '}
              <Difficulty
                difficulty={recipe.difficulty}
                onChange={handleChange}
              />
            </label>
          </Block>

          <Block>
            <label>
              Nährwerte pro Portion{' '}
              <NutritionalValues
                calories={recipe.nutritionalValues.calories}
                carbohydrates={recipe.nutritionalValues.carbohydrates}
                protein={recipe.nutritionalValues.protein}
                fat={recipe.nutritionalValues.fat}
                onChange={handleChangeNutritionalValues}
              />
            </label>
          </Block>

          <Block>
            {recipe.tags.length > 0 &&
              recipe.tags.map(tag => (
                <button
                  type='button'
                  key={tag.id}
                  onClick={() => handleTagRemoval(tag.id)}
                  title='entfernen'
                >
                  {tag.title}
                </button>
              ))}

            <label>
              {availableTags && (
                <select onChange={handleTagSelection}>
                  <option value=''>---</option>
                  {availableTags
                    .filter(
                      tag =>
                        !recipe.tags.some(
                          subElement => subElement.title === tag.title,
                        ),
                    )
                    .map(tag => (
                      <option key={tag.id}>{tag.title}</option>
                    ))}
                </select>
              )}
            </label>
          </Block>

          <hr />

          <button type='submit'>
            {loading ? 'speichert...' : 'speichern'}
          </button>

          <button type='button' onClick={handleReset}>
            zurücksetzen
          </button>
        </fieldset>
      </form>

      <br />

      {demo && (
        <textarea
          readOnly
          style={{ width: '100%', height: '250px' }}
          value={JSON.stringify(recipe, null, 2)}
        />
      )}
    </>
  );
}

function Block({ children }) {
  return <div style={{ display: 'block' }}>{children}</div>;
}

function DeleteButton({ onClick }) {
  return (
    <button type='button' onClick={onClick}>
      x
    </button>
  );
}

const healthinessOptions = [
  {
    label: 'keine Angabe',
    value: '',
  },
  {
    label: 'Ja',
    value: 3,
  },
  {
    label: 'Mittel',
    value: 2,
  },
  {
    label: 'Nein',
    value: 1,
  },
];
function Healthiness({ healthiness, onChange }) {
  return (
    <div className='healthiness-group'>
      {healthinessOptions.map(({ label, value }, i) => {
        const checked = healthiness === value;
        return (
          <label key={i}>
            {label + ' '}
            <input
              type='radio'
              name='healthiness'
              value={value}
              onChange={onChange}
              checked={checked}
            />
          </label>
        );
      })}
    </div>
  );
}

const difficultyOptions = [
  {
    label: 'keine Angabe',
    value: '',
  },
  {
    label: 'Einfach',
    value: 1,
  },
  {
    label: 'Mittel',
    value: 2,
  },
  {
    label: 'Schwer',
    value: 3,
  },
];
function Difficulty({ difficulty, onChange }) {
  return (
    <div className='difficulty-group'>
      {difficultyOptions.map(({ label, value }, i) => {
        const checked = difficulty === value;
        return (
          <label key={i}>
            {label + ' '}
            <input
              type='radio'
              name='difficulty'
              value={value}
              onChange={onChange}
              checked={checked}
            />
          </label>
        );
      })}
    </div>
  );
}

const critiqueOptions = [
  {
    label: 'nicht gekocht',
    value: '',
  },
  {
    label: 'schlecht',
    value: 1,
  },
  {
    label: 'gut',
    value: 2,
  },
  {
    label: 'spitze',
    value: 3,
  },
];
function CritiqueRating({ critique, onChange }) {
  return (
    <div className='critique-group'>
      {critiqueOptions.map(({ label, value }, i) => {
        const checked = critique === value;
        return (
          <label key={i}>
            {label + ' '}
            <input
              type='radio'
              name='critique'
              value={value}
              onChange={onChange}
              checked={checked}
            />
          </label>
        );
      })}
    </div>
  );
}

function NutritionalValues({
  calories,
  carbohydrates,
  protein,
  fat,
  onChange,
}) {
  return (
    <div className='nutritional-values-group'>
      <Block>
        <label>
          Kalorien{' '}
          <input
            type='text'
            autoFocus={false}
            name='calories'
            onChange={onChange}
            value={calories}
          />
        </label>
      </Block>

      <Block>
        <label>
          Kohlenhydrate{' '}
          <input
            type='text'
            autoFocus={false}
            name='carbohydrates'
            onChange={onChange}
            value={carbohydrates}
          />
        </label>
      </Block>

      <Block>
        <label>
          Eiweiß{' '}
          <input
            type='text'
            autoFocus={false}
            name='protein'
            onChange={onChange}
            value={protein}
          />
        </label>
      </Block>

      <Block>
        <label>
          Fett{' '}
          <input
            type='text'
            autoFocus={false}
            name='fat'
            onChange={onChange}
            value={fat}
          />
        </label>
      </Block>
    </div>
  );
}
