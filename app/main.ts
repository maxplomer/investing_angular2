import {bootstrap}    from 'angular2/platform/browser';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';
import {Component, View, provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';


bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provide(AuthHttp, { 
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
  })
]);