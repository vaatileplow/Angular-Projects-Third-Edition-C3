import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Issue } from 'src/app/issue';
import { IssuesService } from '../issues.service';
import { IssueForm } from '../issue-form';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.titleExistsValidator()],
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

  titleExistsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const issue: Issue | undefined =
        this.issueService.getIssueFromTitle(value);

      if (!issue) {
        return null;
      }

      return { titleExists: true };
    };
  }
}
