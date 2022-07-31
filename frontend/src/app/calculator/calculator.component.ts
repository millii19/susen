import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tab1Component } from '../tab1/tab1.component';
import { ApiService } from "../api.service";
import {Panel} from "../entities/Panel";
import {pan} from "ol/interaction/Interaction";
import {Tab2Component} from "../tab2/tab2.component";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  @Input() showFirst = true;
  form: FormGroup = new FormGroup("");
  buttonClicked = false;
  @ViewChild(Tab1Component) child: Tab1Component = new Tab1Component;
  @ViewChild(Tab2Component) child2: Tab2Component = new Tab2Component();
  panel!: Panel[];

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
    const usageQuota = form.controls["usage_quota"].value;
    this.apiService.getSimulate(budget, usageQuota, latitude, longitude).subscribe(
      panel => {
        this.panel = panel;
        this.child2.loadData(panel);
      }
    );
  }

}
