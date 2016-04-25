import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';
import {AuthConfig, AuthHttp} from 'angular2-jwt';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({
        tokenName: 'jwt'
      }), http);
    },
    deps: [Http]
  })
]);