import { Injectable } from '@angular/core';
import { Issue } from './issue';

//Mock data for init
import { issues } from 'src/assets/mock-issues';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues: Issue[] = issues;

  constructor() {}

  getPendingIssues(): Issue[] {
    return this.issues.filter((issue) => !issue.completed);
  }
}
