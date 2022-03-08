import { Component, OnInit } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {WorkOrderDeleteComponent} from "../../../admin/dialogs/work-order-delete/work-order-delete.component";

@Component({
  selector: 'app-global-progress-spinner',
  templateUrl: './global-progress-spinner.component.html',
  styleUrls: ['./global-progress-spinner.component.css']
})
export class GlobalProgressSpinnerComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

  public initiate() {
    const spinnerDialogConfig = new MatDialogConfig();
    spinnerDialogConfig.disableClose = true;
    spinnerDialogConfig.autoFocus = true;
    spinnerDialogConfig.width = "25%";
    spinnerDialogConfig.position = { bottom:  'dterhytd' };
    const spinnerDialogRef = this.dialog.open(GlobalProgressSpinnerComponent, spinnerDialogConfig);
  }


}
