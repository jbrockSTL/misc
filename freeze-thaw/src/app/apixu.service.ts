import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApixuService {
  constructor(private http: HttpClient) {}

  getWeather(location) {
    return this.http.get(
      "https://api.weatherstack.com/current?access_key=7d943ce723d7ddea226fd1806a40fb60&units=f&query=" +
        location
    );
  }
}
