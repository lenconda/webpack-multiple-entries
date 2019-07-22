import React, { Suspense } from 'react';
import {
	Route
} from 'react-router';
import {
	HashRouter as Router
} from 'react-router-dom';

interface Props {}

const Child1 = React.lazy(() => import('./pages/child1/Child1'));
const Child2 = React.lazy(() => import('./pages/child2/Child2'));

const App = (props: Props): JSX.Element => {
	return (
		<div>
			<p>Page 1</p>
			<section>
				<Suspense fallback={null}>
					<Router>
						<Route path={'/child1'} component={Child1}/>
						<Route path={'/child2'} component={Child2}/>
					</Router>
				</Suspense>
			</section>
		</div>
	);
};

export default App;
