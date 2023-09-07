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

  createIssue(issue: Issue): void {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  completeIssue(issue: Issue): void {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date(),
    };
    const index = this.issues.findIndex((i) => i === issue);
    this.issues[index] = selectedIssue;
  }
}
