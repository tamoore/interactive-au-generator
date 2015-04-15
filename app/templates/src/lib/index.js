let el = document.querySelector(".interactive");
el.innerHTML = mainTemplate;

import mainTemplate from '../templates/main.html.txt!text';
import angular from 'angular';
import angularMaterial from 'angular-material';
import register from 'toddmoorega/register'
import { ExampleController } from './controllers/ExampleController'



angular.module('App', ['ngMaterial']);
register('App').controller('ExampleController', ExampleController);