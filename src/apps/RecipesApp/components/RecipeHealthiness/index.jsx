import React from 'react';

const MAX_HEALTHINESS = 3;

const icons = [...new Array(MAX_HEALTHINESS)].map((_, index) => (
  <i key={index} className='material-icons'>
    favorite
  </i>
));

export default function RecipeHealthiness({ healthiness = MAX_HEALTHINESS }) {
  return (
    <div
      className={`recipe-healthiness factor-${
        healthiness > MAX_HEALTHINESS ? MAX_HEALTHINESS : healthiness
      }`}
    >
      {icons}
    </div>
  );
}
