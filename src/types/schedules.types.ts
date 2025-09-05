export interface ISubject {
  _id: string;
  userId: string;
  name: string;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISchedule {
  _id: string;
  date: Date;
  startTime: string
  endTime: string
  instructor: string
  location: string
  notes: string
  subjectId: string | Partial<ISubject>
  title: string
  createdAt: stringdf
  updatedAt: string
}