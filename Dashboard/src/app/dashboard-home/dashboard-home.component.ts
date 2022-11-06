import { Component, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { Utils } from '../Utils';
import * as _ from 'lodash';
import { Chart, ChartConfiguration, ChartEvent, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  @Input() productData: any;
  @ViewChild( BaseChartDirective )
  charts: QueryList<BaseChartDirective> | undefined;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: any = {
    elements: {
      line: {
        tension: 0.1
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right'
      }
    },

    plugins: {
      legend: { display: true }
    }
  };

  public barChartOptions: any = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };  

  constructor(
    private utils: Utils
  ) { }

  public productNames: any = [];
  public yearsToMap: any = [];
  public regions: any = [];
  public quater: any = [];
  public revenuAndProfitOfProducts: any = [];
  public chartData: any = [];
  public lineChartConfig: any = {};
  public barChartConfig: any = {};

  ngOnInit(): void {
    let lineChart: HTMLCanvasElement = document.getElementById('line_chart') as HTMLCanvasElement;
    let ctx = <CanvasRenderingContext2D> lineChart.getContext("2d");
    let barChart: HTMLCanvasElement = document.getElementById('bar_chart') as HTMLCanvasElement;  
    this.productNames = this.utils.generateCheckboxOptions(this.productData, 'PRODUCTLINE');
    this.yearsToMap = this.utils.filterYears(this.productData, 'YEAR_ID');
    this.regions = this.utils.generateCheckboxOptions(this.productData, 'TERRITORY');
    this.quater = this.utils.getQuater();
    console.log('Regions: ' + JSON.stringify(this.regions));
    this.calculateRevenue();
    this.configureChartDataByProductFilter();
    this.lineChartData.datasets = this.chartData.datasets;
    this.lineChartData.labels = this.chartData.labels;
    this.lineChartConfig = new Chart(ctx, {
      type: 'line',
      data: this.lineChartData,
      options: this.lineChartOptions
    });
    this.barChartConfig = new Chart(<CanvasRenderingContext2D>barChart.getContext("2d"), {
      type: 'bar',
      data: this.barChartData,
      options: this.barChartOptions
    })    
  }

  calculateRevenue(): void {
    let keys: any = {
      sale_price: 'MSRP',
      quantity: 'QUANTITYORDERED',
      price_each: 'PRICEEACH'
    }; 
    _.forEach(this.productNames, (object) => {
      let productProfit: number = 0;
      let productExpense: number = 0;
      let yearWiseSale: any = [];
      if (object.name !== 'All') {
        let productList: any = this.utils.getIndividualProductDetail(this.productData, 'PRODUCTLINE', object.name);
        //Calculating year wise revenue
        _.forEach(this.yearsToMap, (year) => {
          if (year.name !== 'All') {
            let revenue: any = this.utils.calculateRevenuePerYear(productList, year.id, keys);
            productExpense += revenue.expense;
            productProfit += revenue.profit;
            yearWiseSale.push({
              year: year.id,
              profit: revenue.profit,
              expense: revenue.expense,
              quantity_per_year: revenue.quantity_per_year,
              quantity_per_month: revenue.quantity_per_month
            });
          }
        })
        this.revenuAndProfitOfProducts.push({
          name: object.name,
          id: object.id,
          profit: parseInt(productProfit.toFixed(0)),
          expense: parseInt(productExpense.toFixed(0)),
          year_wise_data: yearWiseSale
        });
      }
    })
  }

  configureChartDataByProductFilter(productsList?: any): void {
    let labels: any = _.map(this.productNames, (product) => {
      if (productsList === undefined || productsList.includes(product.id)){
        return product.name;
      }
    })
    labels.shift();
    this.chartData = {
      datasets: [],
      labels: labels
    };
    _.forEach(this.yearsToMap, (year) => {
      if (year.id !== 'all') {
        let randomColor: string = this.utils.getRandomRGB();
        let idx: number = randomColor.lastIndexOf(')');
        let set: any = {
          data: [],
          label: year.name,
          backgroundColor: 'rgba(255,255,255,0)',
          borderColor: randomColor,
          pointBackgroundColor: randomColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: randomColor,
          fill: 'origin'       
        };
        _.forEach(this.revenuAndProfitOfProducts, (product) => {
          if (productsList === undefined || productsList.includes(product.id)) {
            let obj = _.find(product.year_wise_data, (item) => item.year === year.id);
            if (obj !== undefined) {
              set.data.push(obj.profit);
            }
          }
        });
        this.chartData.datasets.push(set);     
      }
    })
    this.configureQuantityBarChartYearly(productsList);
  }

  //Provide Option to show it Montly
  configureQuantityBarChartYearly(productList?: any): void {
    let dataSet: any = [];
    let labels: any = [];
    _.forEach(this.revenuAndProfitOfProducts, (product) => {
      if (productList === undefined || productList.includes(product.id)) {
        let objData: any = {
          data: [],
          label: product.name
        };
        _.forEach(product.year_wise_data, (yearData) => {
          objData.data.push(yearData.quantity_per_year)
          if (!labels.includes(yearData.year)) {
            labels.push(yearData.year)
          }
        })
        dataSet.push(objData);
      }
    })
    this.barChartData.datasets = dataSet;
    this.barChartData.labels = labels;
  }

  onProductSelected(data: any) {
    this.configureChartDataByProductFilter(data); 
    this.lineChartData.datasets = this.chartData.datasets;
    this.lineChartData.labels = this.chartData.labels;
    this.lineChartConfig.update();
    this.barChartConfig.update();       
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  // events
  public chartClick({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHover({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }  
}