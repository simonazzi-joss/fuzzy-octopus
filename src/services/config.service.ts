import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private serverAddress: string;
  private configObject: any;

  constructor() {
    this.serverAddress = '127.0.0.1';

    this.fetchConfiguration();
  }

  private fetchConfiguration() {
    this.configObject = {
      user: 'Pippo',
      email: 'pippo@hotmail.com',
      menu: [
        'HOME',
        'Link 1',
        'Link 2',
        'Link Ass',
      ]
    };
  }

  public getMenuData(): Array<String> {
    return this.configObject.menu;
  }
}
