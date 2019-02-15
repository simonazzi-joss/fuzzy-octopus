import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { Configuration, MenuLink } from 'src/models/config/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configProviderURL: string;
  private configObject: Configuration;

  constructor(private http: HttpClient) {
    this.configProviderURL = environment.host + '/assets/fakebe/configuration.json';
  }

  /* Create a connection to the server */
  private getFromServer(data) {
    return this.http.get( this.configProviderURL );
  }
  private postToServer(data) {
    return this.http.post( this.configProviderURL, data);
  }

  /* fetch all the configuration info from the server */
  public fetchConfiguration() {
    const observe = this.getFromServer('conf');

    observe.subscribe((data: Configuration) => { this.configObject = data; });

    return observe;
  }

  /* Fetch elements from the configurations obj */

  public getMenuData(): Array<MenuLink> {
    return this.configObject.menues;
  }

  public getUserDetail() {
    return this.configObject.userData;
  }

}
