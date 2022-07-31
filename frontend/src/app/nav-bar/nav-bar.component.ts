import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() clickEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  logoClicked() {
    this.clickEvent.emit(true);
  }

}
