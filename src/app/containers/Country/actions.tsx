import { createAction } from '@reduxjs/toolkit';
import { Country } from 'types/Country';

const fetchCountry = createAction('FETCH_COUNTRY_REQUEST', (id: string) => {
  return {
    payload: {
      id,
    },
  };
});

const fetchCountrySuccess = createAction(
  'FETCH_COUNTRY_SUCCESS',
  (country: Country) => {
    return {
      payload: {
        country,
      },
    };
  },
);

const fetchCountryError = createAction('FETCH_COUNTRY_ERROR', error => {
  return {
    payload: {
      error,
    },
  };
});

export const actions = {
  fetchCountry,
  fetchCountrySuccess,
  fetchCountryError,
};
