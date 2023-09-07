import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Issue } from 'src/app/issue';
import { IssuesService } from '../issues.service';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  @Output() formClose = new EventEmitter();
  suggestions: Issue[] = [];

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe((title) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }

  async addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    await this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    await this.formClose.emit();
  }
}
