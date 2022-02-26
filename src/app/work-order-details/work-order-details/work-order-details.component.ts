import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WorkOrderService } from "../../core/services/work-order.service";
import { WorkOrder } from "../../core/models/work-order";

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {

  @Input()
  passedWorkOrderId: any;

  entity!: WorkOrder;

  constructor(
    private entityService: WorkOrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.passedWorkOrderId = params.get('passedId');
      if (this.passedWorkOrderId != null) {
        this.entityService.get(this.passedWorkOrderId)
        .toPromise()
        .then(data => {
          this.entity = data;
        })
      }
    });
  }
}
