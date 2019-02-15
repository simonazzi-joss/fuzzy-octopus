import { UserData, MenuLink } from './../../models/config/config.model';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: Array<MenuLink>;
  public userInfo: UserData;

  constructor(private config: ConfigService) {
    this.menuItems = [];
  }

  ngOnInit() {
    this.menuItems = this.config.getMenuData();
    this.userInfo = this.config.getUserDetail();
  }
}
