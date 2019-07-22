import React from 'react';
import {
  RouteComponentProps
} from 'react-router-dom';

interface Props extends RouteComponentProps {}

const Child2 = (props: Props): JSX.Element => {
  return (
    <div>child2 page</div>
  );
};

export default Child2;
