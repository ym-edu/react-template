import React from 'react';
import ReactDOM from 'react-dom';

import "./main.scss";

import element from './app/utils/util';
import Component from './app/app';

if (element) {
  ReactDOM.render(<Component name="World" />, element);
}
