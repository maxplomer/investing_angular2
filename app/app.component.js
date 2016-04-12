System.register(['angular2/core', 'angular2/http', './myglobal.service'], function(exports_1, context_1) {
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
    var core_1, http_1, myglobal_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (myglobal_service_1_1) {
                myglobal_service_1 = myglobal_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(http, myGlobalService) {
                    this.http = http;
                    this.myGlobalService = myGlobalService;
                    this.apiDomain = this.myGlobalService.getApiDomain();
                    this.trades = [];
                    this.newTrade = { symbol: '', number: '', checkboxState: false };
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getTrades();
                };
                AppComponent.prototype.getTrades = function () {
                    var _this = this;
                    this.http.get(this.apiDomain + '/api/trades')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.trades = data; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
                };
                AppComponent.prototype.createTrade = function () {
                    // Need to make post request to api
                    this.http.post(this.apiDomain + '/api/trades?company=' + this.newTrade.symbol + '&shares=' + this.newTrade.number + '')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { console.log(data); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
                    // Reset form
                    this.newTrade = { symbol: '', number: '', checkboxState: false };
                    this.getTrades();
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