import React from 'react';
import { Link } from 'react-router-dom';

const HeaderMenu = () => {
  return (
    <ul className="flex-grow flex flex-row justify-end text-white uppercase font-bold text-xs ml-0 md:ml-20 space-x-8">
      <li>
        <Link to="/">main</Link>
      </li>
      <li>
        <Link to="/store/management">store management</Link>
      </li>
      <li>
        <Link to="/store/create">publish game</Link>
      </li>
    </ul>
  );
};

export default HeaderMenu;
