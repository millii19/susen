import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {Icon, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector';
import {Point} from 'ol/geom';
import {fromLonLat, toLonLat} from "ol/proj";
import {Feature} from 'ol';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component implements OnInit {

  @Output() sendFormEvent = new EventEmitter<FormGroup>();
  map!: Map;

  dataForm: FormGroup = new FormGroup({
    publicOrPrivate: new FormControl(0),
    budget: new FormControl('0', [Validators.required]),
    latitude: new FormControl(0),
    longitude: new FormControl(0),
    usage_quota: new FormControl(0)
  });

  constructor() {
  }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: fromLonLat([13.54059, 47.5345646]),
        zoom: 6.5
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map'
    });

    const markers = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/marker.png'
        })
      })
    });
    this.map.addLayer(markers);

    this.map.on('click', event => {
      var marker = new Feature(new Point(event.coordinate));
      markers?.getSource()?.clear();
      markers?.getSource()?.addFeature(marker);
      this.dataForm.get("latitude")?.setValue((toLonLat(event.coordinate))[0])
      this.dataForm.get("longitude")?.setValue((toLonLat(event.coordinate))[1])
    })
  }

  sendForm() {
    this.sendFormEvent.emit(this.dataForm);
  }

}
