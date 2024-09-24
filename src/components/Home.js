import React from 'react';
import './styles.css';
import { Menu } from './Menu';

export function Home() {
  return (
    <div className="home-container">
      <div className="adr-card">
        <div className="adr-primary-text">School</div>
        <div>(noun) /sku:l/</div>
        <div>Related words: class</div>
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
      <div className='adr-button-group'>
        <button className="adr-button btn-outline">Back</button>
        <button className="adr-button">Next</button>
      </div>
      <div className='adr-divider'/>
      <div className='adr-row'>
        <button className="adr-button btn-full">Xem nghĩa</button>
      </div>
      <div className='adr-row'>
        <button className="adr-button btn-full">Đã thuộc</button>
      </div>
      <div className='adr-row'>
        <button className="adr-button btn-full">Quan tâm</button>
      </div>
      <Menu />
    </div>
  );
}
