import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { saga } from './saga';
import { key, countryReducer } from './reducer';
import { actions } from './actions';
import { selectCountry, selectLoading, selectError } from './selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { PageWrapper } from 'app/components/PageWrapper';
import { useParams } from 'react-router-dom';
import { Link } from 'app/components/Link';

export function Country() {
  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });
  const { id } = useParams<{ id: string }>();

  const country = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchCountry(id));
  }, [dispatch, id]);

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator small />}
      <Link to={'/countries/'}> {`<- Back to all countries`}</Link>
      {country ? (
        <CountryCard>
          <h1>Country: {country.name}</h1>
          <Currency> Currency: {country.currencyCode}</Currency>
        </CountryCard>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : null}
    </PageWrapper>
  );
}
const CountryCard = styled.div`
  margin-top: 1rem;
  border-radius: 4px;
  border: 1px solid slategray;
  padding: 1rem;
`;

const Currency = styled.div`
  color: black;
`;
const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div``;
