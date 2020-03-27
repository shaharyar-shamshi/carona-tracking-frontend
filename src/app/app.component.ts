import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { AppService } from './services/app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit{

  public data = new Array();
  confirmedList: any;
  recoverylist: any;
  deathlist: any;
  chartOption: EChartOption;
  RecoveryChart: EChartOption
  totalConfirmed = 0;
  totalRecovered = 0;
  totalDeath = 0;
  public pieChartLabels = ['Under Treatment', 'Total Recovered', 'Total Death'];
  public pieChartData = [0,0,0];
  public pieChartType = 'pie';
  newsArticle: any;
  constructor(public appService:AppService) {

  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.getData();
    this.getHistoricalData()
  }
  getData() {
    this.appService.getIndiaData().subscribe(
      (data, err) => {
      if (err) {
        console.log("Some error occured");
        return;
      }
            this.data = data
            //this.data = [...data]]
            console.log(this.data)
            this.data.sort(function(a, b) {
              return b.totalConfirmed - a.totalConfirmed;
          });
          
          for (let value of this.data) {
              this.totalConfirmed = this.totalConfirmed + value.totalConfirmed;
              this.totalDeath = this.totalDeath + value.totalDeaths;
              this.totalRecovered = this.totalRecovered + value.totalRecovered
          }
          this.pieChartData = [this.totalConfirmed - this.totalRecovered - this.totalDeath, this.totalRecovered, this.totalDeath]
          this.pieChartData = [... this.pieChartData]
  })
  this.getNews()
}
getHistoricalData() {
  this.appService.getHistoricalData().subscribe(
    (data, err) => {
      if (err) {
        console.log("some error occurred")
        return
      }
      let confirmedList = data.cases
      this.confirmedList = confirmedList
      this.deathlist = data.deaths
      this.setconfirmChart()
    }
  )
}
setconfirmChart() {
  let horizontalAxisTotalCases = []
  let verticalAxisTotalCases = []
  let horizontalAxisRecoveryCases = []
  let verticalAxisRecoveryCases = []
  for ( let data in this.confirmedList) {
    let date = new Date(data)
    horizontalAxisTotalCases.push(date.getUTCDate() + "/" + (Number(date.getMonth()) + 1))
    verticalAxisTotalCases.push(this.confirmedList[data])
  }
  for ( let data in this.deathlist) {
    let date = new Date(data)
    horizontalAxisRecoveryCases.push(date.getUTCDate() + "/" + (Number(date.getMonth()) + 1))
    verticalAxisRecoveryCases.push(this.deathlist[data])
  }
  

  this.chartOption = {
    xAxis: {
      type: 'category',
      data: horizontalAxisTotalCases
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: verticalAxisTotalCases,
      type: 'line'
    }]
  }
  this.RecoveryChart = {
    xAxis: {
      type: 'category',
      data: horizontalAxisRecoveryCases
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: verticalAxisRecoveryCases,
      type: 'line'
    }]
  }
  }
  getNews() {
    this.appService.getNewsarticle().subscribe((data, err) => {
       if(err) {
         console.log(err)
       } else {
         this.newsArticle = data
         this.newsArticle.shift()
       }
    })
  }
  openNews(url : any) {
    window.open(url, "_blank");
  }
  openDonationpage(): any {
    window.open("https://www.feedingindia.org/donate", "_blank" )
  }
}
