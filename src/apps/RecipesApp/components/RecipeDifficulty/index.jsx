import React from 'react';

const MAX_DIFFICULTY = 3;

const icons = [...new Array(MAX_DIFFICULTY)].map((_, index) => (
  <i key={index} />
));

export default function RecipeDifficulty({ difficulty = MAX_DIFFICULTY }) {
  return (
    <div
      className={`recipe-difficulty factor-${
        difficulty > MAX_DIFFICULTY ? MAX_DIFFICULTY : difficulty
      }`}
    >
      {icons}
    </div>
  );
}
