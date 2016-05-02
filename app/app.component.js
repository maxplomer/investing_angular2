System.register(['./myglobal.service', 'angular2/core', 'angular2/http', 'angular2-jwt', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var myglobal_service_1, core_1, http_1, angular2_jwt_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (myglobal_service_1_1) {
                myglobal_service_1 = myglobal_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, myGlobalService, location) {
                    this.http = http;
                    this.myGlobalService = myGlobalService;
                    this.location = location;
                    this.auth0ClientId = this.myGlobalService.getAuth0ClientId();
                    this.auth0Domain = this.myGlobalService.getAuth0Domain();
                    this.lock = new Auth0Lock(this.auth0ClientId, this.auth0Domain);
                    this.apiDomain = this.myGlobalService.getApiDomain();
                    this.trades = [];
                    this.myTrades = [];
                    this.newTrade = { symbol: '', number: '', checkboxState: false };
                    this.newUser = { email: '', password: '', formAction: '' };
                    this.currentUser = { id: '', email: '', idToken: '' };
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getTrades();
                    this.login();
                };
                AppComponent.prototype.updateTrades = function () {
                    this.getTrades();
                    if (this.loggedIn()) {
                        this.getMyTrades();
                    }
                };
                AppComponent.prototype.getTrades = function () {
                    var _this = this;
                    this.http.get(this.apiDomain + '/api/trades')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.trades = data; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
                };
                AppComponent.prototype.getMyTrades = function () {
                    var _this = this;
                    var idToken = this.currentUser.idToken;
                    var id = this.currentUser.id;
                    this.http.get(this.apiDomain + '/api/my_trades?id=' + id + '&idToken=' + idToken + '')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.myTrades = data; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
                };
                AppComponent.prototype.createTrade = function () {
                    var _this = this;
                    var company = this.newTrade.symbol;
                    var shares = this.newTrade.number;
                    var idToken = this.currentUser.idToken;
                    var id = this.currentUser.id;
                    var body = JSON.stringify({ company: company, shares: shares, idToken: idToken, id: id });
                    this.http.post(this.apiDomain + '/api/trades', body)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { console.log(data); }, function (err) { return console.error(err); }, function () { return _this.updateTrades(); });
                    // Reset form
                    this.newTrade = { symbol: '', number: '', checkboxState: false };
                };
                // Auth
                AppComponent.prototype.showLoginModal = function () {
                    this.lock.show();
                };
                AppComponent.prototype.login = function () {
                    var hash = this.lock.parseHash();
                    if (hash) {
                        if (hash.error)
                            console.log('There was an error logging in', hash.error);
                        else
                            this.getProfile(hash.id_token);
                    }
                    else {
                        var idToken = localStorage.getItem('id_token');
                        if (idToken)
                            this.getProfile(idToken);
                    }
                };
                AppComponent.prototype.getProfile = function (idToken) {
                    var that = this;
                    this.lock.getProfile(idToken, function (err, profile) {
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
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this.currentUser = { id: '', email: '', idToken: '' };
                    location.hash = '';
                };
                AppComponent.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        styleUrls: ['app/app.css'],
                        providers: [myglobal_service_1.MyGlobalService, router_1.ROUTER_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, myglobal_service_1.MyGlobalService, router_1.Location])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map