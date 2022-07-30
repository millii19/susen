import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit, AfterViewInit {

  selectedFieldIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeField(0);
  }

  changeField(index: number) {
    document.getElementById("field" + this.selectedFieldIndex)?.classList.remove("selected");
    this.selectedFieldIndex = index;
    document.getElementById("field" + this.selectedFieldIndex)?.classList.add("selected");
  }
}
