import React from 'react';
import { Root, Head } from 'react-static';

import './app.css';

import TheState from './components/theState';

export default function App() {
  return (
    <Root>
      <Head>
        <meta charSet="UTF-8" />          
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Commutron Time</title>

        <meta name="application-name" content="Commutron Time" />

        <meta name="theme-color" content="#2f2f2f" />

        <meta name="description" content="Clock" />
        <meta name="rating" content="General" />

        <link rel="manifest" href="/manifest.json"></link>

        <link rel="icon" sizes="192x192" href="/timer-circle-192.png" />

        <link rel="apple-touch-icon" href="/timer-circle-512.png" color="white" />

        <link rel="mask-icon" href="/timer-circle.svg" color="white" />
      </Head>
      <TheState />
    </Root>
  )
}