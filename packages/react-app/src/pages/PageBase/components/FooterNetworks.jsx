import React from 'react';
import Telegram from '../assets/Telegram.svg';
import YouTube from '../assets/You_tube.svg';
import Subtract from '../assets/Subtract.svg';

const FooterNetworks = () => {
  return (
    <ul className="flex ml-0 mt-12 md:ml-auto mt-0">
      <li className="mr-12">
        <a href="/">
          <img src={Telegram} alt="Telegram" />
        </a>
      </li>
      <li className="mr-12">
        <a href="/">
          <img src={YouTube} alt="YouTube" />
        </a>
      </li>
      <li>
        <a href="/">
          <img src={Subtract} alt="Subtract" />
        </a>
      </li>
    </ul>
  );
};

export default FooterNetworks;
