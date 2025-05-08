import { DrivingStatus } from '../enums/driving-status.enum';

export interface CodeTask {
  id: number;
  label: string;
  notes?: string;
  status: DrivingStatus;
}
