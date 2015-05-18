import '../../main.css!';
import React from 'react';
import { Cover } from './components/cover/Cover.jsx!';


export function boot(el, context, config, mediator){
    React.render(React.createElement(Cover, {}), el);
}

boot(document.querySelector('.interactive'));