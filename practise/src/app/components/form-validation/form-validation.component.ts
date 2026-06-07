import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent implements OnInit {
  formData = {
    username: '',
    email: '',
    password: '',
  };

  errors: { [key: string]: string } = {
    username: '',
    email: '',
    password: '',
  };

  submitted = false;

  constructor() {}

  ngOnInit(): void {}

  validateField(field: 'username' | 'email' | 'password') {
    this.errors[field] = '';

    if (field === 'username') {
      if (!this.formData.username) {
        this.errors['username'] = 'Username is required.';
      } else if (this.formData.username.length < 3) {
        this.errors['username'] = 'Username must be at least 3 characters.';
      }
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.formData.email) {
        this.errors['email'] = 'Email is required.';
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors['email'] = 'Invalid email format.';
      }
    }

    if (field === 'password') {
      if (!this.formData.password) {
        this.errors['password'] = 'Password is required.';
      } else if (this.formData.password.length < 6) {
        this.errors['password'] = 'Password must be at least 6 characters.';
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    this.validateField('username');
    this.validateField('email');
    this.validateField('password');

    if (
      !this.errors['username'] &&
      !this.errors['email'] &&
      !this.errors['password']
    ) {
      alert('Form submitted successfully!');
      // Reset form
      this.formData = { username: '', email: '', password: '' };
      this.submitted = false;
    }
  }
}
