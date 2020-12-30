import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApixuService } from "../apixu.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService
  ) {}

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""],
      temperature: ["null"]
    });
  }

  sendToAPIXU(formValues) {
    this.apixuService.getWeather(formValues.location).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }
}