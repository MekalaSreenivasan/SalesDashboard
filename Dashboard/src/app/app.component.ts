import { Component } from '@angular/core';
import { Utils } from './Utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  productData: any = require('../mock-data.json');
  title = 'Dashboard';
}
