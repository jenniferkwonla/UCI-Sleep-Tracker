import {generate} from 'shortid';

export class SleepData {
  id: string;
  loggedAt: Date;

  constructor(date) {
    // Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
    this.id = generate();
    this.loggedAt = date;
  }

  summaryString(): string {
    return 'Unknown sleep data';
  }

  dateString(): string {
    return this.loggedAt.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
  }

  getLoggedAt(): Date{
    return this.loggedAt;
  }

  getLoggedAtInStr(): string {
    return this.loggedAt.toDateString();
  }
}
