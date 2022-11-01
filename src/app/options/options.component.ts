import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.less']
})
export class OptionsComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  a() {
    debugger
  }
}
