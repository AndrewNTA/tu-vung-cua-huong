import React from 'react';
import IconHome from '../icons/icon-home.png';
import IconNote from '../icons/icon-note.png';
import IconHeart from '../icons/icon-heart.png';
import IconLabel from '../icons/icon-label.png';

export function Menu() {
  return (
    <div className="adr-menu">
      <img src={IconHome} className="adr-menu-icon" alt="home" />
      <img src={IconNote} className="adr-menu-icon" alt="note" />
      <img src={IconHeart} className="adr-menu-icon" alt="heart" />
      <img src={IconLabel} className="adr-menu-icon" alt="label" />
    </div>
  );
}
