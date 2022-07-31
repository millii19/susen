import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import {SolarProject, WindProject, WindSolarPanel} from "../entities/windSolarPanel";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit, AfterViewInit {

  selectedFieldIndex = 0;
  @Input() data!: WindSolarPanel;
  windProject: WindProject =  {
    "amount": 1,
    "amountUnit": "pcs",
    "breakEvenPoint": 9.1,
    "co2saved": [
      4,
      6,
      7,
      1,
      23,
      7,
      11,
      33,
      22,
      14,
      12,
      6
    ],
    "production": [
      5400,
      3455,
      7100,
      400,
      555,
      1233,
      2334,
      1200,
      2338,
      8344,
      4566,
      1233
    ],
    "revenue": [
      33,
      23,
      12,
      3,
      4,
      11,
      77,
      12,
      23,
      34,
      87,
      32
    ],
    "savings": [
      78,
      44,
      23,
      4,
      5,
      13,
      80,
      30,
      40,
      52,
      100,
      40
    ],
    "subType": "medium",
    "type": "wind"
  };
  solarProject: SolarProject = {"amount": 13,
  "amountUnit": "sqm",
  "breakEvenPoint": 6.7,
  "co2saved": [
    2.2,
    4,
    7,
    6,
    7,
    10,
    3,
    5,
    9,
    6,
    1,
    3
  ],
  "production": [
    43,
    12,
    66,
    23,
    34,
    55,
    36,
    18,
    33,
    27,
    31,
    62
  ],
  "revenue": [
    33,
    23,
    12,
    3,
    4,
    11,
    77,
    12,
    23,
    34,
    87,
    32
  ],
  "savings": [
    78,
    44,
    23,
    4,
    5,
    13,
    80,
    30,
    40,
    52,
    100,
    40
  ],
  "subType": "monochrystalline",
  "type": "solar"
};

  width = 700;
  height = 250;

  wind_revenue_graph = {
    data: [
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.windProject.revenue, type: 'bar', name: 'Revenue'},
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.windProject.savings, type: 'bar', name: 'Savings'}
    ],
    layout: {width: this.width*1.5, height: this.height, title: "Revenue vs Savings", colorway: ['#1b5e20', '#C5E1A5'], color: this.windProject.revenue}
  };
  wind_production_graph = {
    data: [
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.windProject.production, type: 'bar'}
    ],
    layout: {width: this.width, height: this.height, title: "Production", colorway: ['#1b5e20']}
  };
  wind_co2_graph = {
    data: [
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.windProject.co2saved, type: 'bar'}
    ],
    layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#1b5e20']}
  };

  solar_revenue_graph = {
    data: [
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.solarProject.revenue, type: 'bar', name: 'Revenue'},
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.solarProject.savings, type: 'bar', name: 'Savings'}
    ],
    layout: {width: this.width*1.5, height: this.height, title: "Revenue vs Savings", colorway: ['#1b5e20', '#C5E1A5']}
  };
  solar_production_graph = {
    data: [
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.solarProject.production, type: 'bar'}
    ],
    layout: {width: this.width, height: this.height, title: "Production", colorway: ['#1b5e20']}
  };
  solar_co2_graph = {
    data: [
      { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.solarProject.co2saved, type: 'bar'}
    ],
    layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#1b5e20']}
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.data == undefined) {
      return;
    }
    this.windProject = this.data.WindProjectValues;
    this.solarProject = this.data.SolarProjectValues;
  }


}
