import React from 'react';
import {shallow} from 'enzyme'
import { render } from '@testing-library/react';
import App from './App';


describe ('First React component test with Enzyme', () => {
test('renders learn react link', () => {
  shallow(<App />)
  });
});

