import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * variável que define a navbar está colapsada ou não em modo móbile
   */
  public navbarCollapse : boolean = false;
  constructor() {}
}
