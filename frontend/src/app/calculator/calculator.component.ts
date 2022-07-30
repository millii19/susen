import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  selectedTabIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  onTabChange() {
    this.selectedTabIndex = (this.selectedTabIndex+1) % 3;    
  }

}
