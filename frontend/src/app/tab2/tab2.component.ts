import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import {Panel} from "../entities/Panel";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit, AfterViewInit {

  selectedFieldIndex = 0;
  @Input() data!: Panel[];

  width = 700;
  height = 250;

  graphs!: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.data)
    if (this.data == undefined) {
      return;
    }
  }

  loadData(panel: Panel[]) {
    this.data = panel;
    for (let d of this.data) {
      d.breakEvenPoint = Number(d.breakEvenPoint.toFixed(2));
    }
    this.graphs = [
      [
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[0].revenue, type: 'bar', name: 'Revenue'},
          ],
          layout: {width: this.width, height: this.height, title: "Revenue", colorway: ['#C5E1A5', '#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[0].savings, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Savings", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[0].production, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Production", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[0].co2saved, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#C5E1A5']}
        }
      ],
      [
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[1].revenue, type: 'bar', name: 'Revenue'},
          ],
          layout: {width: this.width  , height: this.height, title: "Revenue", colorway: ['#C5E1A5', '#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[1].savings, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Savings", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[1].production, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Production", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[1].co2saved, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#C5E1A5']}
        }
      ],
      [
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[2].revenue, type: 'bar', name: 'Revenue'},
          ],
          layout: {width: this.width, height: this.height, title: "Revenue", colorway: ['#C5E1A5', '#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[2].savings, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Savings", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[2].production, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Production", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[2].co2saved, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#C5E1A5']}
        }
      ],
      [
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[3].revenue, type: 'bar', name: 'Revenue'},
          ],
          layout: {width: this.width, height: this.height, title: "Revenue", colorway: ['#C5E1A5', '#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[3].savings, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Savings", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[3].production, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Production", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[3].co2saved, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#C5E1A5']}
        }
      ],
      [
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[4].revenue, type: 'bar', name: 'Revenue'},
          ],
          layout: {width: this.width, height: this.height, title: "Revenue", colorway: ['#C5E1A5', '#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[4].savings, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Savings", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[4].production, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "Production", colorway: ['#C5E1A5']}
        },
        {
          data: [
            { x: [1,2,3,4,5,6,7,8,9,10,11,12], y: this.data[4].co2saved, type: 'bar'}
          ],
          layout: {width: this.width, height: this.height, title: "CO2 saved", colorway: ['#C5E1A5']}
        }
      ]

    ]
  }


}
