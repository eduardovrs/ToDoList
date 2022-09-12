import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import RadioButton from './src/components/RadioButton';
import Task from './src/components/Task';
import Home from './src/pages/Home';

export default function App() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />
      <Home />
    </>
  );
}
