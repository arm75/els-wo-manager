import {Component, Input, OnInit} from '@angular/core';
import {WorkOrder} from "../../../../core/models/work-order";
import {WorkOrderService} from "../../../../core/services/work-order.service";

@Component({
  selector: 'app-print-template',
  templateUrl: './print-template.component.html',
  styleUrls: ['./print-template.component.css']
})
export class PrintTemplateComponent implements OnInit {

  data: any;
  passedWorkOrder!: WorkOrder;
  dataLoaded: boolean = false;

  @Input()
  passedWOId: any;

  constructor(
    private entityService: WorkOrderService
  ) { }

  ngOnInit() {
    this.setupComponent().finally(() => {});
  }

  async setupComponent() {
    await this.entityService.get(this.passedWOId)
      .toPromise()
      .then(data => { this.passedWorkOrder = data; })
      .finally(() => { this.dataLoaded = true; });
  }

}
