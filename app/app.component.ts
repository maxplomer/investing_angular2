
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {MyGlobalService} from './myglobal.service';

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {tokenNotExpired} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    providers: [MyGlobalService]
})
export class AppComponent {

  lock = new Auth0Lock('66lkhr6nngfcbIpsgXRbP0fSyDWFtzbM', 'maxplomer.auth0.com');

  constructor(private http:Http, private myGlobalService:MyGlobalService) { }

  apiDomain = this.myGlobalService.getApiDomain();
  trades = [];
  myTrades = [];

  newTrade = {symbol: '', number: '', checkboxState: false};
  newUser = {email: '', password: '', formAction: ''};
  currentUser = {id: '', email: '', idToken: ''};

  ngOnInit() {
    this.getTrades();
    this.login();
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
    var company = this.newTrade.symbol;
    var shares = this.newTrade.number;
    var idToken = this.currentUser.idToken;
    let body = JSON.stringify({company, shares, idToken});

    this.http.post(this.apiDomain + '/api/trades', body)
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

  // Old Auth
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

  showLoginModal() {
    this.lock.show();
  }

  login() {
    var hash = this.lock.parseHash();

    if (hash) {
      if (hash.error)
        console.log('There was an error logging in', hash.error);
      else
        this.getProfile(hash.id_token);
    } else {
      var idToken = localStorage.getItem('id_token');
      if (idToken) this.getProfile(idToken);
    }
  }

  getProfile(idToken) {
    var that = this;
    this.lock.getProfile(idToken, function(err, profile) {
      if (err) {
        console.log(err);
        return;
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', idToken);

      that.currentUser = {
        id: profile["user_id"], 
        email: profile["email"], 
        idToken: idToken
      };
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.currentUser = {id: '', email: '', idToken: ''};
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
