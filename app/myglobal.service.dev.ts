import {Injectable} from 'angular2/core';

@Injectable()
export class MyGlobalService {
  getApiDomain = () => "http://localhost:3001";
}

