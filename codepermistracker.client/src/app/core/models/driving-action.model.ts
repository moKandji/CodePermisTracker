import { DrivingStatus } from '../enums/driving-status.enum';

export interface DrivingAction {
  id: number;
  label: string;
  notes?: string;
  date?: string;
  status: DrivingStatus;
}
