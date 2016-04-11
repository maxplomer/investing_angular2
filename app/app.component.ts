import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css']
})
export class AppComponent {

  constructor(private http:Http) { }

  trades = [];

  newTrade = {symbol: '', number: '', checkboxState: false};

  ngOnInit() {
    this.getTrades();
  }

  getTrades() {
    this.http.get('http://54.208.182.103/api/trades')
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.trades = data},
        err => console.error(err),
        () => console.log('done')
      );
  }

  createTrade() {
    // Need to make post request to api
    this.http.post('http://54.208.182.103/api/trades?company=' + this.newTrade.symbol + '&shares=' + this.newTrade.number + '')
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
