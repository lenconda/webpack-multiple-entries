import React from 'react';
import {
  RouteComponentProps
} from 'react-router-dom';

interface Props extends RouteComponentProps {}

const Child1 = (props: Props): JSX.Element => {
  return (
    <div>child1 page</div>
  );
};

export default Child1;
