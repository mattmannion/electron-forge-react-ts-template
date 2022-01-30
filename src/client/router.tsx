import './sass/scss/index.scss';
require('dotenv').config();
import { render } from 'react-dom';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { A } from 'client/components/A';
import { B } from 'client/components/B';

export function Nav() {
  return (
    <div className='nav'>
      <Link to='/'>A</Link>
      <Link to='/b'>B</Link>
    </div>
  );
}

render(
  <Router>
    <Nav />
    <Switch>
      <Route exact path='/' component={A} />
      <Route exact path='/b' component={B} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
