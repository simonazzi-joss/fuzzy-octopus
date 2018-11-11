import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: any;

  constructor() { }

  ngOnInit() {
    this.user = {};
    this.user.name = 'test';
  }

}
