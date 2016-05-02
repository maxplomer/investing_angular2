import {Injectable} from 'angular2/core';

@Injectable()
export class MyGlobalService {
  getApiDomain = () => 'http://localhost:3001';
  getAuth0ClientId = () => '66lkhr6nngfcbIpsgXRbP0fSyDWFtzbM';
  getAuth0Domain = () => 'maxplomer.auth0.com';
}

