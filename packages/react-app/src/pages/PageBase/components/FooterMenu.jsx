import React from 'react';

const FooterMenu = () => {
  return (
    <ul className="flex text-white uppercase font-bold text-xs ml-0 md:ml-20">
      <li className="mr-8">
        <a href="/"> main </a>
      </li>
      <li className="mr-8">
        <a href="/"> about </a>
      </li>
      <li className="mr-12">
        <a href="/"> shop </a>
      </li>
      <li>
        <a href="/"> get szn </a>
      </li>
    </ul>
  );
};

export default FooterMenu;
