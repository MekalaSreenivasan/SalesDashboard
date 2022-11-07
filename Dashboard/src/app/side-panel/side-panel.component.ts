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
  @Input() quaterOptionsForSelection: any;
  @Output() selectedProducts = new EventEmitter<any>();
  @Output() selectedRegions = new EventEmitter<any>();
  @Output() selectedQuaters = new EventEmitter<any>();
  selectedProductOption: any;
  selectedRegionOption: any;
  selectedQuaterOption: any;
  showProductList: boolean = false;
  isAllSelected: boolean = false;
  showRegionsList: boolean = false;
  isAllRegionsSelected: boolean = false;
  showQuaterList: boolean = false;
  isAllQuatersSelected: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    //By default showing all data
    this.selectedProductOption = [this.productsOptionsForSelection[0].id];
    this.selectedRegionOption = [this.regionOptionsForSelection[0].id];
    this.selectedQuaterOption = [this.quaterOptionsForSelection[0].id]
    this.productsOptionsForSelection[0].selected = true;
    this.productsOptionsForSelection[0].disabled = true;
    this.getSelectedProduct(this.productsOptionsForSelection[0], false);
    this.regionOptionsForSelection[0].selected = true;
    this.regionOptionsForSelection[0].disabled = true;
    this.getSelectedRegion(this.regionOptionsForSelection[0], false);
    this.quaterOptionsForSelection[0].selected = true;
    this.quaterOptionsForSelection[0].disabled = true;
    this.getSelectedQuater(this.quaterOptionsForSelection[0], false);
    //By default expanding product list
    this.showProductList = true;
  }

  getSelectedProduct(selectedProduct: any, emitEvent: boolean): void {
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
          this.selectedProductOption.unshift('all');
        }
      } else {
        this.productsOptionsForSelection[0].selected = false;
        this.productsOptionsForSelection[0].disabled = false;
        if (index > -1) {
          this.selectedProductOption.splice(index, 1);
        }        
      }
    }
    this.isAllSelected = this.productsOptionsForSelection.length === this.selectedProductOption.length;
    if (emitEvent) {
      this.selectedProducts.emit(this.selectedProductOption);
    }
  }

  getSelectedRegion(selectedRegion: any, emitEvent: boolean): void {
    let index: number = -1;
    if (selectedRegion.id === 'all') {
      selectedRegion.disabled = selectedRegion.selected;
      _.map(this.regionOptionsForSelection, (product) => {
        product.selected = selectedRegion.selected;
        index = this.selectedRegionOption.indexOf(product.id);
        if (index === -1 && product.selected) {
          this.selectedRegionOption.push(product.id)
        } else if (index !== -1 && !product.selected) {
          this.selectedRegionOption.splice(index, 1);
        }
      })
    } else {
      index = this.selectedRegionOption.indexOf(selectedRegion.id);
      if (index === -1 && selectedRegion.selected) {
        this.selectedRegionOption.push(selectedRegion.id)
      } else if (index !== -1 && !selectedRegion.selected) {
        this.selectedRegionOption.splice(index, 1);
      }
      index = this.selectedRegionOption.indexOf('all');
      let selectedOptions = _.filter(this.regionOptionsForSelection, (product) => product.id !== 'all' && product.selected);
      if (selectedOptions.length === this.regionOptionsForSelection.length - 1) {
        this.regionOptionsForSelection[0].selected = true;
        this.regionOptionsForSelection[0].disabled = true;
        if (index === -1) {
          this.selectedRegionOption.unshift('all');
        }
      } else {
        this.regionOptionsForSelection[0].selected = false;
        this.regionOptionsForSelection[0].disabled = false;
        if (index > -1) {
          this.selectedRegionOption.splice(index, 1);
        }        
      }
    }
    this.isAllRegionsSelected = this.regionOptionsForSelection.length === this.selectedRegionOption.length;
    if (emitEvent) {
      this.selectedRegions.emit(this.selectedRegionOption);
    }
  }

  getSelectedQuater(selectedQuater: any, emitEvent: boolean): void {
    let index: number = -1;
    if (selectedQuater.id === 5) {
      selectedQuater.disabled = selectedQuater.selected;
      _.map(this.quaterOptionsForSelection, (quater) => {
        quater.selected = selectedQuater.selected;
        index = this.selectedQuaterOption.indexOf(quater.id);
        if (index === -1 && quater.selected) {
          this.selectedQuaterOption.push(quater.id)
        } else if (index !== -1 && !quater.selected) {
          this.selectedQuaterOption.splice(index, 1);
        }
      })
    } else {
      index = this.selectedQuaterOption.indexOf(selectedQuater.id);
      if (index === -1 && selectedQuater.selected) {
        this.selectedQuaterOption.push(selectedQuater.id)
      } else if (index !== -1 && !selectedQuater.selected) {
        this.selectedQuaterOption.splice(index, 1);
      }
      index = this.selectedQuaterOption.indexOf(5);
      let selectedOptions = _.filter(this.quaterOptionsForSelection, (quater) => quater.id !== 5 && quater.selected);
      if (selectedOptions.length === this.quaterOptionsForSelection.length - 1) {
        this.quaterOptionsForSelection[0].selected = true;
        this.quaterOptionsForSelection[0].disabled = true;
        if (index === -1) {
          this.selectedQuaterOption.unshift(5);
        }
      } else {
        this.quaterOptionsForSelection[0].selected = false;
        this.quaterOptionsForSelection[0].disabled = false;
        if (index > -1) {
          this.selectedQuaterOption.splice(index, 1);
        }        
      }
    }
    if (this.selectedQuaterOption.length === 0) {
      this.quaterOptionsForSelection[0].selected = true;
      this.quaterOptionsForSelection[0].disabled = true;
      this.selectedQuaterOption = [this.quaterOptionsForSelection[0].id];
      this.getSelectedQuater(this.quaterOptionsForSelection[0], false);
      selectedQuater.selected = true;
    }
    this.isAllQuatersSelected = this.quaterOptionsForSelection.length === this.selectedQuaterOption.length;
    if (emitEvent) {
      this.selectedQuaters.emit(this.selectedQuaterOption);
    }    
  }

  expandList(option: string): void {
    switch(option) {
      case 'product':
        this.showProductList = !this.showProductList;
        this.showRegionsList = false;
        this.showQuaterList = false;
        this.isAllSelected = this.productsOptionsForSelection.length === this.selectedProductOption.length;
        break;
      case 'region':
        this.showRegionsList = !this.showRegionsList;
        this.showProductList = false;
        this.showQuaterList = false;
        this.isAllRegionsSelected = this.regionOptionsForSelection.length === this.selectedRegionOption.length;        
        break;
      case 'quater':
        this.showQuaterList = !this.showQuaterList;
        this.showProductList = false;
        this.showRegionsList = false;
        this.isAllQuatersSelected = this.quaterOptionsForSelection.length === this.selectedQuaterOption.length;        
        break;
    }
  }

  getLabel(option: string): string {
    let label: string = ''
    switch(option) {
      case 'product': 
        label = `${this.showProductList?'-' : '+'}Products(${this.isAllSelected? 'All' : this.selectedProductOption.length})`;
        break;
      case 'region':
        label = `${this.showRegionsList?'-' : '+'}Regions(${this.isAllRegionsSelected? 'All' : this.selectedRegionOption.length})`;
        break;
      case 'quater':
        label = `${this.showQuaterList?'-' : '+'}Quater(${this.isAllQuatersSelected? 'All' : this.selectedQuaterOption.length})`;
        break;        
    }
    return label;
  }

}
