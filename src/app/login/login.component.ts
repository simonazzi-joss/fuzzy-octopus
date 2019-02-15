import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showLogin: boolean;
  public username: string;
  public password: string;

  constructor(private config: ConfigService) {
    this.showLogin = false;
  }

  ngOnInit() {
    this.config.fetchConfiguration().subscribe(
      (data) => {
        this.showLogin = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  autenticate() {
    let validAutentication = true;

    if (this.username && this.username.length > 0) {
      validAutentication = false;
      // username empty
    }
    if (this.password && this.password.length > 0) {
      validAutentication = false;
      // password empty
    }

    if (validAutentication) {
      // send request to server
    }
  }
}
