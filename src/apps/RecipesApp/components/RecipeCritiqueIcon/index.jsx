import React from 'react';

export default function RecipeCritiqueIcon({ critiqueValue }) {
  let critiqueIcon = null;

  if (critiqueValue === 1) {
    critiqueIcon = <i className='material-icons bad'>mood_bad</i>;
  } else if (critiqueValue === 2) {
    critiqueIcon = <i className='material-icons good'>sentiment_satisfied</i>;
  } else if (critiqueValue === 3) {
    critiqueIcon = <i className='material-icons best'>mood</i>;
  }

  return critiqueIcon ? (
    <div className='recipe-critique-icon'>{critiqueIcon}</div>
  ) : null;
}
