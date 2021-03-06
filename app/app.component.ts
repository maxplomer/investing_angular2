
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {MyGlobalService} from './myglobal.service';

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {tokenNotExpired} from 'angular2-jwt';
import {ROUTER_PROVIDERS, Location} from 'angular2/router';

declare var Auth0Lock;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    providers: [MyGlobalService, ROUTER_PROVIDERS]
})

export class AppComponent {
  auth0ClientId = this.myGlobalService.getAuth0ClientId();
  auth0Domain = this.myGlobalService.getAuth0Domain();
  lock = new Auth0Lock(this.auth0ClientId, this.auth0Domain);

  constructor(
    private http:Http, 
    private myGlobalService:MyGlobalService, 
    private location:Location
  ) { }

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

  updateTrades() {
    this.getTrades();
    if (this.loggedIn()) {
      this.getMyTrades();
    }
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

  getMyTrades() {
    var idToken = this.currentUser.idToken;
    var id = this.currentUser.id;

    this.http.get(this.apiDomain + '/api/my_trades?id=' + id + '&idToken=' + idToken + '')
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.myTrades = data},
        err => console.error(err),
        () => console.log('done')
      );
  }

  createTrade() {
    var company = this.newTrade.symbol;
    var shares = this.newTrade.number;
    var idToken = this.currentUser.idToken;
    var id = this.currentUser.id;
    let body = JSON.stringify({company, shares, idToken, id});

    this.http.post(this.apiDomain + '/api/trades', body)
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.checkForError(data) },
        err => console.error(err),
        () => this.updateTrades()
      );

    // Reset form
    this.newTrade = {symbol: '', number: '', checkboxState: false};
  }

  checkForError(data) {
    if (data['error']) {
      alert('Error: ' + data['error']);
    }
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

      that.getMyTrades();
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.currentUser = {id: '', email: '', idToken: ''};
    location.hash = '';
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
