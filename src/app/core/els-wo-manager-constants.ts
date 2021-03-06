import {WorkOrderStatus} from "./types/work-order-status";

export class ElsWoManagerConstants {

  public static userRolesSelectArray: any = [
    { value:'ROLE_SUPER_ADMIN', name:'Super Admin' },
    { value:'ROLE_ADMIN', name:'Admin' },
    { value:'ROLE_USER', name:'User' }
  ];

  public static inProgressWorkOrderStatusFilterArray: any = [
    { value:WorkOrderStatus.OPEN, name:'OPEN Work Orders' },
    { value:WorkOrderStatus.PENDING, name:'PENDING Work Orders' },
  ]

  public static processingWorkOrderStatusFilterArray: any = [
    { value:WorkOrderStatus.COMPLETE, name:'COMPLETE Work Orders' },
    { value:WorkOrderStatus.CLOSED, name:'CLOSED Work Orders' },
    { value:WorkOrderStatus.ERROR, name:'ERROR Work Orders' },
    { value:WorkOrderStatus.RETRY, name:'RETRY Work Orders' },
  ]

  public static historyWorkOrderStatusFilterArray: any = [
    { value:WorkOrderStatus.CANCELLED, name:'CANCELLED Work Orders' },
    { value:WorkOrderStatus.PROCESSED, name:'PROCESSED Work Orders' }
  ]




  public static hoursSelectArray: any = [
    { value:0, name:'0' },
    { value:1, name:'1' },
    { value:2, name:'2' },
    { value:3, name:'3' },
    { value:4, name:'4' },
    { value:5, name:'5' },
    { value:6, name:'6' },
    { value:7, name:'7' },
    { value:8, name:'8' },
    { value:9, name:'9' },
    { value:10, name:'10' },
    { value:11, name:'11' },
    { value:12, name:'12' },
    { value:13, name:'13' },
    { value:14, name:'14' },
    { value:15, name:'15' },
    { value:16, name:'16' },
    { value:17, name:'17' },
    { value:18, name:'18' },
    { value:19, name:'19' },
    { value:20, name:'20' },
    { value:21, name:'21' },
    { value:22, name:'22' },
    { value:23, name:'23' }
  ];

  public static minutesSelectArray: any = [
    { value: 0, name:'00' },
    { value: 0.25, name:':15' },
    { value: 0.5, name:':30' },
    { value: 0.75, name:':45' }
  ];

  public static usStatesSelectArray: any = [
    { value:'AL', name:'Alabama' },
    { value:'AK', name:'Alaska' },
    { value:'AZ', name:'Arizona' },
    { value:'AR', name:'Arkansas' },
    { value:'CA', name:'California' },
    { value:'CO', name:'Colorado' },
    { value:'CT', name:'Connecticut' },
    { value:'DE', name:'Delaware' },
    { value:'DC', name:'District Of Columbia' },
    { value:'FL', name:'Florida' },
    { value:'GA', name:'Georgia' },
    { value:'HI', name:'Hawaii' },
    { value:'ID', name:'Idaho' },
    { value:'IL', name:'Illinois' },
    { value:'IN', name:'Indiana' },
    { value:'IA', name:'Iowa' },
    { value:'KS', name:'Kansas' },
    { value:'KY', name:'Kentucky' },
    { value:'LA', name:'Louisiana' },
    { value:'ME', name:'Maine' },
    { value:'MD', name:'Maryland' },
    { value:'MA', name:'Massachusetts' },
    { value:'MI', name:'Michigan' },
    { value:'MN', name:'Minnesota' },
    { value:'MS', name:'Mississippi' },
    { value:'MO', name:'Missouri' },
    { value:'MT', name:'Montana' },
    { value:'NE', name:'Nebraska' },
    { value:'NV', name:'Nevada' },
    { value:'NH', name:'New Hampshire' },
    { value:'NJ', name:'New Jersey' },
    { value:'NM', name:'New Mexico' },
    { value:'NY', name:'New York' },
    { value:'NC', name:'North Carolina' },
    { value:'ND', name:'North Dakota' },
    { value:'OH', name:'Ohio' },
    { value:'OK', name:'Oklahoma' },
    { value:'OR', name:'Oregon' },
    { value:'PA', name:'Pennsylvania' },
    { value:'RI', name:'Rhode Island' },
    { value:'SC', name:'South Carolina' },
    { value:'SD', name:'South Dakota' },
    { value:'TN', name:'Tennessee' },
    { value:'TX', name:'Texas' },
    { value:'UT', name:'Utah' },
    { value:'VT', name:'Vermont' },
    { value:'VA', name:'Virginia' },
    { value:'WA', name:'Washington' },
    { value:'WV', name:'West Virginia' },
    { value:'WI', name:'Wisconsin' },
    { value:'WY', name:'Wyoming' },
  ];
}
