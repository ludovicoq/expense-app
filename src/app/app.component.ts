import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppApiService } from './core/http-api/app.api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'expense-app';
  apiText: string = 'No Response'

  constructor(private readonly testApi: AppApiService) {
    console.log('App component started');
  }
  ngOnInit(): void {
   this.getTests();
  }


  /* --------------------- P R I V A T E --------------------- */

  private getTests1(): void {
    this.testApi.getTests().subscribe(res => {
      this.apiText = res;
    }, (err) => {
      console.error('API Error: ', err);
    })
  }

  private getTests(): void {
    this.testApi.getTests().subscribe(
      {
        next : (res) => {
          this.apiText = res;
        },
        error: (err) => {
          console.error('Api Error: ', err);
        },
        complete: () => console.log('Complete Called!')
      });
  }
}
