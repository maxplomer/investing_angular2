import {Injectable} from 'angular2/core';

@Injectable()
export class MyGlobalService {
  getApiDomain = () => 'http://54.187.163.195:24413';
  getAuth0ClientId = () => '66lkhr6nngfcbIpsgXRbP0fSyDWFtzbM';
  getAuth0Domain = () => 'maxplomer.auth0.com';
}

