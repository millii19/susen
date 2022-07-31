import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tab1Component } from '../tab1/tab1.component';
import { ApiService } from "../api.service";
import {WindSolarPanel} from "../entities/windSolarPanel";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  showFirst = true;
  form: FormGroup = new FormGroup("");
  buttonClicked = false;
  @ViewChild(Tab1Component) child: Tab1Component = new Tab1Component;
  windSolarPanel!: WindSolarPanel;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onTabChange() {
    if (this.showFirst) {
      this.child.sendForm();
    }
    this.showFirst = !this.showFirst;
  }

  getForm(form: FormGroup) {
    this.form = form;
    const budget = form.controls["budget"].value;
    const latitude = form.controls["latitude"].value;
    const longitude = form.controls["longitude"].value;
    this.apiService.getSimulate(budget, latitude, longitude).subscribe(
      windSolarPanel => {
        this.windSolarPanel = windSolarPanel;
      }
    );
  }

}
