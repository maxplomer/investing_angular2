import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {MyGlobalService} from './myglobal.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css'],
    providers: [MyGlobalService]
})
export class AppComponent {
  constructor(private http:Http, private myGlobalService:MyGlobalService) { }

  apiDomain = this.myGlobalService.getApiDomain();

  trades = [];

  newTrade = {symbol: '', number: '', checkboxState: false};
  newUser = {email: '', password: ''};

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

}
