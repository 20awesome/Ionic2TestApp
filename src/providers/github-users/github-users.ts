import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the GithubUsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
// GithubUsers
export class Companies {
  githubApiUrl = 'https://api.github.com';
  companyUrl = 'http://avalon.avalonfaltd.com:3090/'

  public PushedCompany = new EventEmitter<any>();
  private static handleError(error: Response) {
    // console.error(error);
    // console.log(error.json().error)
    return Observable.throw(error.json().error || 'Server error');
  }

  constructor(public http: Http) { }

  // Load all github users
  PushedCompanyData(value) {
    console.log(value)
    this.PushedCompany.emit(value);
  }


  changeCompany(companyName, companyGoods, token?): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (token) {
      headers.append('Authentication-Token', token);
    }

    let params: any = { companyGoods: companyGoods };

    return this.http.put(`${this.companyUrl}companies/${companyName}`, JSON.stringify(params), { headers })
      .map((response: Response) => response.json().success)
      .catch(Companies.handleError)

  }

  addCompany(companyName, companyGoods, token?): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (token) {
      headers.append('Authentication-Token', token);
    }
    let params: any = { companyName: companyName, companyGoods: companyGoods };
    return this.http.post(`${this.companyUrl}companies`, JSON.stringify(params), { headers })
      .map((response: Response) => response.json().success)
      .catch(Companies.handleError)
  }

  getCompanyByName(companyName, token?): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (token) {
      headers.append('Authentication-Token', token);
    }
    // let params: any = {};

    let options = new RequestOptions({
      headers: headers,
    });
    return this.http.get(`${this.companyUrl}companies/${companyName}`, options)
      .map((response: Response) => response.json().success)
      .catch(Companies.handleError)
  }

  getCompanies(token?): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (token) {
      headers.append('Authentication-Token', token);
    }
    // let params: any = {};

    let options = new RequestOptions({
      headers: headers,
    });
    return this.http.get(`${this.companyUrl}companies`, options)
      .map((response: Response) => response.json().success)
      .catch(Companies.handleError)
  }


  deleteCompany(companyName, token?): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (token) {
      headers.append('Authentication-Token', token);
    }

    return this.http.delete(`${this.companyUrl}companies/${companyName}`, { headers })
      .map((response: Response) => response.json().success)
      .catch(Companies.handleError);
  }




}
