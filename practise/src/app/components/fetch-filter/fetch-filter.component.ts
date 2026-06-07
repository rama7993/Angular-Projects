import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-fetch-filter',
  templateUrl: './fetch-filter.component.html',
  styleUrls: ['./fetch-filter.component.scss'],
})
export class FetchFilterComponent implements OnInit {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.getPosts().subscribe((data) => {
  //     this.posts = data;
  //     this.filteredPosts = data;
  //   });
  // }

  ngOnInit(): void {
    this.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      },
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  onSearch() {
    const search = this.searchText?.toLowerCase() || '';

    if (!search) {
      this.filteredPosts = this.posts;
      return;
    }

    this.filteredPosts = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.body.toLowerCase().includes(search),
    );
  }
}
