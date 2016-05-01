System.register(['./myglobal.service', 'angular2/core', 'angular2/http', 'angular2-jwt'], function(exports_1, context_1) {
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
    var myglobal_service_1, core_1, http_1, angular2_jwt_1;
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
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, myGlobalService) {
                    this.http = http;
                    this.myGlobalService = myGlobalService;
                    this.lock = new Auth0Lock('66lkhr6nngfcbIpsgXRbP0fSyDWFtzbM', 'maxplomer.auth0.com');
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
                AppComponent.prototype.getTrades = function () {
                    var _this = this;
                    this.http.get(this.apiDomain + '/api/trades')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.trades = data; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
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
                        .subscribe(function (data) { console.log(data); }, function (err) { return console.error(err); }, function () { return _this.getTrades(); });
                    // Reset form
                    this.newTrade = { symbol: '', number: '', checkboxState: false };
                };
                // Old Auth
                AppComponent.prototype.submitAuthForm = function () {
                    switch (this.newUser.formAction) {
                        case 'login':
                            this.login();
                            break;
                        case 'register':
                            this.register(this.newUser.email, this.newUser.password);
                            break;
                        default:
                            console.log("submitAuthForm called without formAction");
                    }
                    // Reset form
                    this.newUser = { email: '', password: '', formAction: '' };
                };
                AppComponent.prototype.register = function (email, password) {
                    var body = JSON.stringify({ email: email, password: password });
                    this.http.post(this.apiDomain + '/api/users', body)
                        .subscribe(function (response) {
                        localStorage.setItem('jwt', response.json().id_token);
                        // Fade out Login menu and call API with AuthHTTP to get show user's trades and info
                    }, function (error) {
                        console.log(error.text());
                    });
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
                    });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('profile');
                    localStorage.removeItem('id_token');
                    this.currentUser = { id: '', email: '', idToken: '' };
                };
                AppComponent.prototype.loggedIn = function () {
                    return angular2_jwt_1.tokenNotExpired();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        styleUrls: ['app/app.css'],
                        providers: [myglobal_service_1.MyGlobalService]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, myglobal_service_1.MyGlobalService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map