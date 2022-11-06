import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})

export class SidePanelComponent implements OnInit {
  @Input() productsOptionsForDropDown: any;
  @Input() timeLineOptionsForDropDown: any;
  selectedProductOption: any;
  selectedTimelineOption: any;
  
  constructor() { }

  ngOnInit(): void {
    this.selectedProductOption = this.productsOptionsForDropDown[0];
    this.selectedTimelineOption = this.timeLineOptionsForDropDown[0];
  }

}
