import {Component, Input, OnInit} from '@angular/core';
import {WorkOrder} from "../../../../core/models/work-order";

@Component({
  selector: 'app-print-template',
  templateUrl: './print-template.component.html',
  styleUrls: ['./print-template.component.css']
})
export class PrintTemplateComponent implements OnInit {

  @Input()
  passedWorkOrder!: WorkOrder;

  constructor() { }

  ngOnInit(): void {
  }

}
