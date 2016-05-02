import {bootstrap}    from 'angular2/platform/browser';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {APP_BASE_HREF} from 'angular2/router';

bootstrap(AppComponent, [
  HTTP_PROVIDERS, 
  provide(APP_BASE_HREF, {useValue : '/' });
]);