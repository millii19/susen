import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {Coordinate} from "ol/coordinate";

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component implements OnInit {

  @Output() sendFormEvent = new EventEmitter<FormGroup>();
  map: Map | undefined;

  dataForm: FormGroup = new FormGroup( {
    publicOrPrivate: new FormControl(0),
    PLZ: new FormControl('1010', [Validators.required, Validators.max(9999), Validators.min(1000)]),
    budget: new FormControl('0', [Validators.required]),
    latitude: new FormControl(0),
    longitude: new FormControl(0)
  });

  constructor() { }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0,0],
        zoom: 4
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map'
    });
  }

  sendForm() {
    this.sendFormEvent.emit(this.dataForm);
  }

}
