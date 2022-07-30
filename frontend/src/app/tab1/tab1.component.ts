import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component implements OnInit {

  dataForm: FormGroup = new FormGroup( {
    publicOrPrivate: new FormControl(0),
    PLZ: new FormControl('0000')
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
