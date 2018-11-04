import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuItems: Array<String>;

  constructor(private config: ConfigService) {
    this.menuItems = [];
  }

  ngOnInit() {
    this.menuItems = this.config.getMenuData();
  }
}
