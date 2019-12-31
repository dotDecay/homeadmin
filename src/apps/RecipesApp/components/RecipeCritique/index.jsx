import React from 'react';

const MAX_CRITIQUE = 3;

let icon = null;

export default function RecipeCritique({ critique = MAX_CRITIQUE }) {
  if (critique === 1) {
    icon = <i className='material-icons bad'>mood_bad</i>;
  } else if (critique === 2) {
    icon = <i className='material-icons good'>sentiment_satisfied</i>;
  } else if (critique === 3) {
    icon = <i className='material-icons best'>mood</i>;
  }

  return icon ? <div className='recipe-critique-icon'>{icon}</div> : null;
}
