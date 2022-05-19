import { Component, OnInit } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GlobalProgressSpinnerService} from "../global-progress-spinner.service";

@Component({
  selector: 'app-global-progress-spinner',
  templateUrl: './global-progress-spinner.component.html',
  styleUrls: ['./global-progress-spinner.component.css']
})
export class GlobalProgressSpinnerComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 500;

  constructor(
    private globalProgressSpinnerService: GlobalProgressSpinnerService,
    private dialog: MatDialog

  ) {

  }

  ngOnInit(): void {
  }

  // public initiate() {
  //   const spinnerDialogConfig = new MatDialogConfig();
  //   spinnerDialogConfig.disableClose = true;
  //   spinnerDialogConfig.autoFocus = true;
  //   spinnerDialogConfig.width = "25%";
  //   spinnerDialogConfig.position = { bottom:  'dterhytd' };
  //   const spinnerDialogRef = this.dialog.open(GlobalProgressSpinnerComponent, spinnerDialogConfig);
  // }


}
