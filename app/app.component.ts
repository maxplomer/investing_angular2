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

  newTrade = {symbol: '', number: ''};

  ngOnInit() {
    this.getTrades();
  }

  getTrades() {
    this.http.get('http://localhost:3001/api/trades')
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.trades = data},
        err => console.error(err),
        () => console.log('done')
      );
  }

  createTrade() {
    console.log('HELLOWORLD');
    this.newTrade = {symbol: '', number: ''};
  }

}
