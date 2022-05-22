import {Subcontractor} from "./subcontractor";

export interface SubcontractorGroup {
  id: number;
  subcontractors: Subcontractor[];
  entityName: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}
