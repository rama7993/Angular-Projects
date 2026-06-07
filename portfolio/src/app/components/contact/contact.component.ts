import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false,
})
export class ContactComponent implements OnInit {
  contactForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9\s\-().]{7,15}$/)],
      ],
      message: ['', Validators.required],
      consent: [false, Validators.requiredTrue],
    });

    emailjs.init({
      publicKey: 'koWsXtXLxZwtxMVdP',
      limitRate: {
        id: 'contact-form',
        throttle: 10000,
      },
    });
  }

  markFormTouched = (formGroup: UntypedFormGroup) => {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof UntypedFormGroup) {
        this.markFormTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  };

  onSubmit(): void {
    if (this.contactForm.valid) {
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message,
      };

      console.log('Template Params:', templateParams); // Debugging

      emailjs.send('service_6qsrpta', 'template_z5rh8fd', templateParams).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Email sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error);
          alert('Failed to send email. Please try again.');
        }
      );
    } else {
      this.markFormTouched(this.contactForm);
      alert('Please fill in all the required fields.');
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
