import React from 'react';
import { storiesOf, action } from '@storybook/react';


import ObjectsDisplay from './ObjectsDisplay';

let ships  = [
    { name: 'enkidu', id: 'enkidu' },
    { name: 'siduri', id: 'siduri', orders: { ready: true } },
];


storiesOf('ObjectsDisplay', module)
  .add( 'nothing', () => <ObjectsDisplay></ObjectsDisplay> )
  .add('basic', () => 
    <ObjectsDisplay objects={ships} selectObject={ action('select_object') }></ObjectsDisplay>
  );
