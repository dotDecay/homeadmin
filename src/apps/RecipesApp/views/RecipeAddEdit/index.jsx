import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

const INITIAL_STATE = {
  title: '',
  description: '',
  images: [],
  ingredients: [],
  steps: [],
  servings: 1,
  critique: false,
  healthiness: -1,
  tags: [],
};

const DUMMY_INGREDIENT = {
  title: '',
  amount: 0,
  amountUnit: 'Stück',
};

const availableTags = [
  { id: 1, title: 'Weihnachten' },
  { id: 2, title: 'Abendessen' },
];

function App() {
  const [recipe, setRecipe] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [step, setStep] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert(JSON.stringify(recipe));
      setLoading(false);
    }, 1500);
  }

  function handleChange(event) {
    const { name, value, type } = event.target;

    switch (type) {
      case 'number':
      case 'radio':
        setRecipe({ ...recipe, [name]: parseInt(value, 10) });
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

    setRecipe({ ...recipe, tags: [...recipe.tags, value] });
  }

  function handleTagRemoval(title) {
    setRecipe({
      ...recipe,
      tags: recipe.tags.filter(dataset => dataset !== title),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend>
          <h1>Rezept hinzufügen</h1>{' '}
        </legend>
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
              <input
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
                      <select name='unit'>
                        <option>Stück</option>
                      </select>
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
              Bewertung <CritiqueRating onChange={handleChange} />
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
                max='20'
              />
            </label>
          </Block>

          <Block>
            <label>
              Vorbereitungsdauer (min){' '}
              <input
                type='number'
                name='prepTime'
                onChange={handleChange}
                min='0'
                max='1200'
              />
            </label>
          </Block>

          <Block>
            Gesund <HealthRating onChange={handleChange} />
          </Block>

          <Block>
            {recipe.tags.length > 0 &&
              recipe.tags.map(tag => (
                <button
                  type='button'
                  key={tag}
                  onClick={() => handleTagRemoval(tag)}
                  title='entfernen'
                >
                  {tag}
                </button>
              ))}

            <label>
              Tags hinzufügen{' '}
              <datalist id='tag-list'>
                {availableTags
                  .filter(tag => !recipe.tags.includes(tag.title))
                  .map(tag => (
                    <option key={tag.title}>{tag.title}</option>
                  ))}
              </datalist>
              <input
                type='text'
                list='tag-list'
                onChange={handleTagSelection}
              />
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

      <textarea
        readOnly
        style={{ width: '100%', height: '250px' }}
        value={JSON.stringify(recipe, null, 2)}
      />
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

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

function HealthRating({ onChange }) {
  return (
    <>
      <label>
        keine Angabe{' '}
        <input
          type='radio'
          name='healthRating'
          value='-1'
          onChange={onChange}
        />
      </label>

      <label>
        ja{' '}
        <input type='radio' name='healthRating' value='3' onChange={onChange} />
      </label>

      <label>
        mittel{' '}
        <input type='radio' name='healthRating' value='2' onChange={onChange} />
      </label>

      <label>
        nein{' '}
        <input type='radio' name='healthRating' value='1' onChange={onChange} />
      </label>
    </>
  );
}

function CritiqueRating({ onChange }) {
  return (
    <>
      <label>
        nicht gekocht{' '}
        <input type='radio' name='critique' value='-1' onChange={onChange} />
      </label>

      <label>
        schlecht{' '}
        <input type='radio' name='critique' value='1' onChange={onChange} />
      </label>

      <label>
        gut <input type='radio' name='critique' value='2' onChange={onChange} />
      </label>

      <label>
        spitze{' '}
        <input type='radio' name='critique' value='3' onChange={onChange} />
      </label>
    </>
  );
}
