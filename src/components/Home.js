import React from 'react';
import './styles.css';
import { Menu } from './Menu';

export function Home() {
  return (
    <div className="home-container">
      <div className="adr-card">
        <div className="adr-primary-text">School</div>
        <div>(noun) /sku:l/</div>
        <div>
          <ul className="adr-ul">
            <li>
              <div>I'm going to the school at six a.m morning every day</div>
            </li>
            <li>
              <div>I love my school very much</div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button className="adr-button">Xem nghĩa</button>
      </div>
      <Menu />
    </div>
  );
}
