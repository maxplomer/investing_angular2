import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    styleUrls: ['app/app.css']
})
export class AppComponent {

  trades = [
    {"company": "M", "shares": 45, "id":"09b9f5fbd4ea1555a5b5e6a3"},
    {"company": "T", "shares": 55, "id":"b5c8086b4f8eb4c491c055a4"},
    {"company": "MS", "shares": 120, "id":"583d70cbf4518d31c99b8ea3"},
    {"company": "AAPL", "shares": "5", "id":"452d7a4a6f09bc794e9b61fc"},
    {"company": "AAPL", "shares": "55", "id":"0fc0b09eb94c1264f6d2811a"},
    {"company": "W", "shares": "3", "id":"d008ab1d91e84e40f58daef0"}
  ];

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

}
