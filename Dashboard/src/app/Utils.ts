import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class Utils {
    filterProductNames(list: any[], key: string) {
        let productNames: any = this.filterOutKeys(list, [], key);
        productNames.unshift('All');
        let menuObject: any = [];
        _.forEach(productNames, (name) => {
            let nameToAdd: string = name.split(' ').join('');
            menuObject.push({
                id: nameToAdd.toLowerCase(),
                name: name
            })
        })
        return menuObject;
    }

    filterYears(list: any[], key: string) {
        let years: any = this.filterOutKeys(list, [], key);
        let menuObject: any = [];
        _.forEach(years, (year) => {
            menuObject.push({
                id: year,
                name: year
            })
        });
        menuObject.unshift({ id: 'all', name: 'All' });
        return menuObject;
    }

    getIndividualProductDetail(list: any[], key: string, value: string|number) {
        return _.filter(list, (item) => item[key] === value);
    }

    filterOutKeys(list: any[], keys: any, keyToFilter: string) {
        _.filter(list, (item) => {
            if (item && item[keyToFilter] && !keys.includes(item[keyToFilter])) {
                keys.push(item[keyToFilter]);
            }
        })   
        return keys;     
    }

    calculateRevenuePerYear(list: any[], year: number, keys: any) {
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

    getRandomRGB() {
        /*let roundValue = Math.round, rndmValue = Math.random, maxNum = 255;
        return `rgba(${roundValue(rndmValue()*maxNum)}, ${roundValue(rndmValue()*maxNum)}, ${roundValue(rndmValue()*maxNum)})`;*/
        let color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        return color;        
    }
}