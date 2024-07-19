import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customValidator } from './custom-validator';

@Component({
  selector: 'app-assign7',
  templateUrl: './assign7.component.html',
  styleUrls: ['./assign7.component.css'],
})
export class Assign7Component implements OnInit {
  projectForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        customValidator.invalidProjectName,
        customValidator.asyncInvalidProjectName,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('critical'),
    });
  }
  onSaveProject() {
    console.log(this.projectForm.value);
  }
}
