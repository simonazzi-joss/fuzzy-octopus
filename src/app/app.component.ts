import { Component } from '@angular/core';
import { ConfigService } from 'src/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'fuzzy-octopus';

  public isUserActive:boolean;
  public showLogin: boolean;
  public username: string;
  public password: string;

  constructor(private config: ConfigService) {
    this.showLogin = false; // prob useless
    this.isUserActive = false;
  }

  ngOnInit() {
    this.config.fetchConfiguration().subscribe(
      (data) => {
        setTimeout(() => {
          this.showLogin = true;
          this.isUserActive = true;
        }, 1000);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  autenticate() {
    let validAutentication = true;

    if (this.username && this.username.length === 0) {
      validAutentication = false;
      // username empty
    }
    if (this.password && this.password.length === 0) {
      validAutentication = false;
      // password empty
    }

    if (validAutentication) {
      // send request to server
      this.showLogin = false;
      setTimeout(() => {
        this.isUserActive = true;
      }, 1000);
    }
  }
}
