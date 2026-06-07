import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  url = 'https://dummy-json.mock.beeceptor.com/users';
  searchForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getData();
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  trackByFn(idx: number, user: any) {
    return user.id;
  }

  getData() {
    fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then((data) => {
        this.users = data;
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  addUser(event: Event) {
    event.preventDefault();

    if (!this.searchForm.valid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const { id, name, company } = this.searchForm.value;
    const newUser = {
      id: id.trim() || `user-${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
    };

    this.users = [newUser, ...this.users];
    this.searchForm.reset();
  }

  deleteUser(userId: string) {
    this.users = this.users.filter(
      (user) => String(user.id) !== String(userId),
    );
  }
}
