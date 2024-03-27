import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BurgerAppComponent } from "./burger-app/burger-app.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BurgerAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
