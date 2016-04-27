import {bootstrap}    from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS
]);