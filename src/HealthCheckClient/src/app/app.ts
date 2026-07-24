import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  public forecasts = signal<WeatherForecast[]>([]);

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getForecasts();
  }

  private getForecasts()
  {
    this.http.get<WeatherForecast[]>('/api/weatherforecast').subscribe(
      (result) => {
        this.forecasts.set(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  protected readonly title = signal('HealthCheckClient');
}
