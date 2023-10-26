"use client";

import Image from 'next/image'
import App from './App';

import { BrowserRouter } from 'react-router-dom';

export default function Home() {
  return (
    <BrowserRouter>

      <App />
    </BrowserRouter>

  )
}
