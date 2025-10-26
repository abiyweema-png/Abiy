import React, { useState } from 'react';
import type { View } from '../types';
import { SpeedometerIcon, PeopleIcon, JournalCheckIcon, BookIcon, MenuIcon, XIcon } from './Icons';

interface NavbarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

interface NavLinkProps {
  view: View;
  label: string;
  icon: React.ReactNode;
  activeView: View;
  onClick: (view: View) => void;
}

const logoUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX////tHC3sAAD87/PsAADtGyj98vXtFyP65uf54eL2y83tEx3//P365+r0v8L1xcjzh43sABjyeHzrABr30tT87vH2zM/0wMTuL0L2xsnoAADsCifvQVPuNkfwdG/vSlTxhYzxan/xcnb0t7x7r4hPAAADfElEQVR4nO3b6XKiQBSAYQiCCCiK8aLo7rL//xU3sC6JgRunE53n9E5Vq1L4aA4lFRKRAQAAAAAAAAAAAAAAAAAAAAAAAADgP2S/F5PA/5F+MX6MdeZZZnfZ/c/lF+PPyrycZz5dsf/M/jJ+X3J5LzP79YL+qfrN+FNsDr+4V7L/TP5xfh/b4S923+5P4w+V666s+oH84fwr7eE/+N2/3R/Fn2uf3S/b/eP8R/Y99v9/y/bY/Wb8Kfa4D5s/Jv93f1f+l9nhT/b/KfsP8b/aXq8v+1/uD+MP1e53b4T/xP5w/lT7+w/bX5j8o/xP5e31n+3/lf2D/G/e/a/2P9b/Z38GfZ3H+x/lf1d/Ff2M435H+x/pX8hfZ1P+5/hV/S/xf2/X57/G/29/J/2H2uT/pf6/8rfY3n+r/Xf2t/L/2H2+d/qf7P+N/u/s+L/p/6/y79jfz7/r/av4f+R/YD/b/YP4h/y77F/kH2x/qf7P+f/h/sK5/p/wL/NvsL+A/Y1/8n/Lf7P+FfsB/sf7L9t/4N9/X/7/w37v+FfsX+f/s/23/lP2Of/5P+f/qP8T+z7/+z/BfvL/D/sP9j/M/sv/KPsM//L/2P+h/r/8/+g/1v9q/Zf8h+/b/af1b/7/AH7Bvtz/AH+3+3/if7C/lP2pfrf7N+d/sL+1+wn5/+wv3x/hf2s/Q/2P9r/Lfsa+BPsJ+t/v/iX7F/kP2u/o/2J/Gfs8/+g/mP9T/AF7+Z/av2b/V/jf2d/f/qv6l/n/2P9t/V/sC+/hP2L/Q/mv7j/Mvsi/8A/qP9F/r/ACp9gf/0f438j+z/AP7H+7+IfsP/AOP8j/Yv9T/dvzn+y/+j/N/1L9L/ADL9l/9j+e/1v9t+wf/h/j/wL7C/9J/t/iH7E/wDuf79/Vf4H9j/9X+X/AGf9f+U/an/9P9D/AGH+N/rv8n+x/+/8T/Z/w/+b/YP8v/Lf/i/2X/o/yf4t9h//ALf1v7F/of8A/1P9/wDR/m/1X+7+yf5D/APuf7z/Fvsu//wCz/Yf7/wDhP9l/6z/T/if2P/+n+v/AK1/Qf79/8/+V/sf/8AP/5f2f8A/3P8D+yv5j/b/wCu/zL7E//AKH99/v/AJz9r/8A9/0f7H/7P/m//wAj+z//AL3+8/1/85/Y//6v8L/Fvtf/+P9j/wD7/+5/rf6H+7+LP8l//wCYP8P/AO7/Yv6n+9+Jvsu//v8Av/iX7I//APgf3H//AD+wv9/9D+1/yP7U/wD+n9X/AFv9t/oP/wBD+2/3/wAifZn/+v8Ab/3/AMl+0v8A/wBB/hf3H/7f1f7X/Q/3P8x+1f/AP6H91/v/kf2p/8A9T/ef6f+C/Zf/wC7+v/AKf/ACX7P/8A1/g/3f1b9qf/APb+p/qf7/4l+wP/APqf33+r/GvsP/8A1/of6v8AHPsT/wD7n9D/AHv8v+xf/+39D/Y/7/+Z/av/AO39T/Q/zP7D//2f7P/D/sH/AO7+v/qf7v4F9gf/APb+l/rf63+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+X/4CB4M1sW+dAAAAAElFTkSuQmCC";

const NavLink: React.FC<NavLinkProps> = ({ view, label, icon, activeView, onClick }) => (
  <li>
    <a
      onClick={() => onClick(view)}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 ${
        activeView === view
          ? 'bg-brand-purple text-white'
          : 'text-gray-300 hover:bg-brand-purple hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <SpeedometerIcon /> },
    { view: 'prospects', label: 'Prospects', icon: <PeopleIcon /> },
    { view: 'report', label: 'Daily Report', icon: <JournalCheckIcon /> },
    { view: 'guideline', label: 'Guideline', icon: <BookIcon /> },
  ];
  
  const handleNavClick = (view: View) => {
    setActiveView(view);
    setIsOpen(false);
  }

  return (
    <nav className="bg-brand-purple-dark shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white flex items-center">
               <img src={logoUrl} alt="Eyoha Digitals Logo" className="h-10 w-auto" />
               <span className="ml-3 font-bold text-xl hidden sm:block">Sales Dashboard</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.view} {...link} activeView={activeView} onClick={handleNavClick} />
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-brand-purple-dark inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
               <a
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                  activeView === link.view
                    ? 'bg-brand-purple text-white'
                    : 'text-gray-300 hover:bg-brand-purple hover:text-white'
                }`}
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
