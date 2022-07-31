import {Component, OnInit} from '@angular/core';
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Susen';
  showFirstPage = true;

  ngOnInit(): void {
  }

  buttonClicked(btnClicked: boolean) {
    this.showFirstPage = btnClicked;
  }
}
