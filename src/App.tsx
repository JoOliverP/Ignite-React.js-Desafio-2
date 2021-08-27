import { useEffect, useState } from 'react';



import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { MoviesProvider } from './MoviesContext';


export function App() {
  
  return (
    <MoviesProvider>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar />
      <Content />
    </div>
    </MoviesProvider>
  )
}