import React from 'react';

export const moneyFormatter = winnings => `$${Number.parseFloat(winnings / 1000000).toFixed(2)}M`;

export const renderFlag = alpha2Code => (
  <img
    className="flag-icon"
    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.1.0/flags/4x3/${alpha2Code.toLowerCase()}.svg`}
    alt="flag"
  />
);
