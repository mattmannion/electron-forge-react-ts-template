import 'client/sass/scss/bs';
import 'client/sass/scss';
require('dotenv').config();
import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { A } from 'client/app/A/A';
import { B } from 'client/app/B/B';

const Nav = () => (
  <div className='nav'>
    <Link to='/'>A</Link>
    <Link to='/b'>B</Link>
  </div>
);

createRoot(document.getElementById('root')).render(
  <Router>
    <Nav />
    <Routes>
      <Route path='/' Component={A} />
      <Route path='/b' Component={B} />
    </Routes>
  </Router>
);
