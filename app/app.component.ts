
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {MyGlobalService} from './myglobal.service';

import {bootstrap} from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    providers: [MyGlobalService]
})
export class AppComponent {

  lock = new Auth0Lock('66lkhr6nngfcbIpsgXRbP0fSyDWFtzbM', 'maxplomer.auth0.com');
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http:Http, private myGlobalService:MyGlobalService) { }

  apiDomain = this.myGlobalService.getApiDomain();

  trades = [];

  newTrade = {symbol: '', number: '', checkboxState: false};
  newUser = {email: '', password: '', formAction: ''};

  ngOnInit() {
    this.getTrades();
  }

  getTrades() {
    this.http.get(this.apiDomain + '/api/trades')
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.trades = data},
        err => console.error(err),
        () => console.log('done')
      );
  }

  createTrade() {
    // Need to make post request to api
    this.http.post(this.apiDomain + '/api/trades?company=' + this.newTrade.symbol + '&shares=' + this.newTrade.number + '')
      .map((res:Response) => res.json())
      .subscribe(
        data => { console.log(data) },
        err => console.error(err),
        () => console.log('done')
      );

    // Reset form
    this.newTrade = {symbol: '', number: '', checkboxState: false};
    
    this.getTrades();
  }

  // Auth
  submitAuthForm () {
    switch(this.newUser.formAction) {
      case 'login':
        this.login()
        break;
      case 'register':
        this.register(this.newUser.email, this.newUser.password);
        break;
      default:
        console.log("submitAuthForm called without formAction")
    }

    // Reset form
    this.newUser = {email: '', password: '', formAction: ''};
  }

  register(email, password) {
    let body = JSON.stringify({ email, password });
    this.http.post(this.apiDomain + '/api/users', body)
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().id_token);
          // Fade out Login menu and call API with AuthHTTP to get show user's trades and info
        },
        error => {
          console.log(error.text());
        }
      );
  }

  // Auth

  login() {
    this.lock.show();
    var hash = this.lock.parseHash();
    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.lock.getProfile(hash.id_token, function(err, profile) {
          if (err) {
            console.log(err);
            return;
          }
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', hash.id_token);
        });
    }
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
