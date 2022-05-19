import { Component } from '@angular/core';
import {GlobalProgressSpinnerService} from "./shared/progress-spinner/global-progress-spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'els-wo-manager';

  constructor(
    public globalProgressSpinnerService: GlobalProgressSpinnerService,
  ) { }

}
