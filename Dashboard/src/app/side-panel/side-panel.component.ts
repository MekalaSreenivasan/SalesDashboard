import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})

export class SidePanelComponent implements OnInit {
  @Input() productsOptionsForSelection: any;
  @Input() regionOptionsForSelection: any;
  @Output() selectedProducts = new EventEmitter<any>();
  selectedProductOption: any;
  selectedRegionOption: any;
  
  constructor() { }

  ngOnInit(): void {
    //By default showing all data
    this.selectedProductOption = [this.productsOptionsForSelection[0].id];
    this.selectedRegionOption = [this.regionOptionsForSelection[0].id];
    this.productsOptionsForSelection[0].selected = true;
    this.productsOptionsForSelection[0].disabled = true;
    this.getSelectedProduct(this.productsOptionsForSelection[0])
  }

  getSelectedProduct(selectedProduct: any): void {
    let index: number = -1;
    if (selectedProduct.id === 'all') {
      selectedProduct.disabled = selectedProduct.selected;
      _.map(this.productsOptionsForSelection, (product) => {
        product.selected = selectedProduct.selected;
        index = this.selectedProductOption.indexOf(product.id);
        if (index === -1 && product.selected) {
          this.selectedProductOption.push(product.id)
        } else if (index !== -1 && !product.selected) {
          this.selectedProductOption.splice(index, 1);
        }
      })
    } else {
      index = this.selectedProductOption.indexOf(selectedProduct.id);
      selectedProduct.selected = selectedProduct.selected;
      if (index === -1 && selectedProduct.selected) {
        this.selectedProductOption.push(selectedProduct.id)
      } else if (index !== -1 && !selectedProduct.selected) {
        this.selectedProductOption.splice(index, 1);
      }
      index = this.selectedProductOption.indexOf('all');
      let selectedOptions = _.filter(this.productsOptionsForSelection, (product) => product.id !== 'all' && product.selected);
      if (selectedOptions.length === this.productsOptionsForSelection.length - 1) {
        this.productsOptionsForSelection[0].selected = true;
        this.productsOptionsForSelection[0].disabled = true;
        if (index === -1) {
          this.selectedProductOption.push('all');
        }
      } else {
        this.productsOptionsForSelection[0].selected = false;
        this.productsOptionsForSelection[0].disabled = false;
        if (index > -1) {
          this.selectedProductOption.splice(index, 1);
        }        
      }
    }
    this.selectedProducts.emit(this.selectedProductOption);
  }

  getSelectedTimeLine(selectedYear: any) {

  }

}
