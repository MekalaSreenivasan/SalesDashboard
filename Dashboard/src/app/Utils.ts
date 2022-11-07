import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class Utils {
generateCheckboxOptions(list: any[], key: string): any {
  let productNames: any = this.filterOutKeys(list, [], key);
  productNames.unshift('All');
  let checkboxObject: any = [];
  _.forEach(productNames, (name) => {
      let nameToAdd: string = name.split(' ').join('');
      checkboxObject.push({
          id: nameToAdd.toLowerCase(),
          name: name,
          selected: false,
          disabled: false
      })
  })
  return checkboxObject;
}

filterYears(list: any[], key: string): any {
  let years: any = this.filterOutKeys(list, [], key);
  let checkboxObject: any = [];
  _.forEach(years, (year) => {
      checkboxObject.push({
          id: year,
          name: year,
          selected: false
      })
  });
  checkboxObject.unshift({ id: 'all', name: 'All', selected: false });
  return checkboxObject;
}

getIndividualProductDetail(list: any[], key: string, value: string|number): any {
  return _.filter(list, (item) => item[key] === value);
}

filterOutKeys(list: any[], keys: any, keyToFilter: string): any {
  _.filter(list, (item) => {
      if (item && item[keyToFilter] && !keys.includes(item[keyToFilter])) {
          keys.push(item[keyToFilter]);
      }
  })   
  return keys;     
}

calculateRevenuePerYear(list: any[], year: number, keys: any): any {
  let totalProfit: number = 0;
  let totalExpense: number = 0;
  let quantityPerYear: number = 0;
  let quantityPerMonth: any = [];
  let dataPerYear: any = this.getIndividualProductDetail(list, 'YEAR_ID', year);
  _.forEach(dataPerYear, (product) => {
      let salePrice: number = product[keys.sale_price];
      let quantity: number = product[keys.quantity];
      let actualPrice: number = product[keys.price_each];
      let expense: number = quantity * actualPrice;
      let profit: number = quantity * salePrice;
      quantityPerMonth.push({
          month: product.MONTH_ID,
          quantity: quantity
      });
      quantityPerYear += quantity;
      totalExpense += expense;
      totalProfit += profit
      product.profit = profit;
      product.expense = expense;
  });
  return {
      profit: totalProfit,
      expense: totalExpense,
      quantity_per_year: quantityPerYear,
      quantity_per_month: quantityPerMonth
  }
}

  calculateRevenueByRegionOrQuater(list: any[], region: any, keys: any, years: any, keyToCheck: string): any {
    let productProfitForRegion: number = 0;
    let productExpenseForRegion: number = 0;
    let quantityForRegion: number = 0;
    let yearWiseRegionData: any = [];
    let valueToCheck = keyToCheck === 'TERRITORY' ? region.name : region.id;
    let productListForRegion = this.getIndividualProductDetail(list, keyToCheck, valueToCheck);
    _.forEach(years, (year) => {
      if (year.name !== 'All') {
        let dataPerYear: any = this.getIndividualProductDetail(productListForRegion, 'YEAR_ID', year.id);
        let yearWiseProfit: number = 0;
        let yearWiseExpense: number = 0;
        let quantityPerYear: number = 0;
        _.forEach(dataPerYear, (product) => {
          let salePrice: number = product[keys.sale_price];
          let quantity: number = product[keys.quantity];
          let actualPrice: number = product[keys.price_each];
          let expense: number = quantity * actualPrice;
          let profit: number = quantity * salePrice;
          quantityPerYear += quantity;
          quantityForRegion += quantity;
          productProfitForRegion += profit;
          productExpenseForRegion += expense;
          yearWiseProfit += profit;
          yearWiseExpense += expense;          
        });
        yearWiseRegionData.push({
          id: year.id,
          quantity: quantityPerYear,
          profit: parseInt(yearWiseProfit.toFixed(0)),
          expense: parseInt(yearWiseExpense.toFixed(0))
        });     
      }
    })
    return {
      profit: productProfitForRegion,
      expense: productExpenseForRegion,
      quantity_per_region: quantityForRegion,
      year_wise_data: yearWiseRegionData
    }
  }

  getRandomRGB(): string {
    let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;        
  }

  getQuater(): void {
    let object: any = [{
      id: 5,
      name: 'All',
      selected: false
    }, {
      id: 1,
      name: 'Q1',
      selected: false
    }, {
      id: 2,
      name: 'Q2',
      selected: false
    }, {
      id: 3,
      name: 'Q3',
      selected: false
    }, {
      id: 4,
      name: 'Q4'
    }];
    return object;
  }
}