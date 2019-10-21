import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { Cities } from '../model/city';
@Component({
  selector: 'app-cities-autocomplete',
  templateUrl: './cities-autocomplete.component.html'
})
export class CitiesAutocompleteComponent implements OnInit {
  countries: any[] = [];
  name;
  constructor(
    private http: HttpClient,
    private api: ApiService) { }

  ngOnInit() {
    this.readCsvData();
  }

  readCsvData() {
    this.api.getAllCities().subscribe(
      (data: any) => this.extractData(data),
      err => this.handleError(err)
    );
  }

  private extractData(res) {
    let csvData = res;
    let lines = csvData.split(/\r\n|\n/);
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentLine = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      this.countries.push(obj);
    }
    console.log(this.countries);
    return JSON.stringify(this.countries);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return errMsg;
  }

  searchCountry(value) {
    console.log('aaaaaaaaaa ', value);
    this.api.getCurrentWeather(value).subscribe(
      (data: any) => console.log(data),
      err => this.handleError(err)
    );
  }
}
