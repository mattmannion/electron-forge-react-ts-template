import 'client/sass/scss';
import styles from 'client/router.module';
require('dotenv').config();
import { render } from 'react-dom';
import { MemoryRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { A } from 'client/components/A';
import { B } from 'client/components/B';

const Nav = () => (
  <div className={styles.nav}>
    <Link to='/'>A</Link>
    <Link to='/b'>B</Link>
  </div>
);

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
