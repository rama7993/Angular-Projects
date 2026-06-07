import { Component, OnInit } from '@angular/core';
import { ApiService, NewsArticle } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  topHeadingDisplay: NewsArticle[] = [];
  loading = true;
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTopHeadlines();
  }

  loadTopHeadlines(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getTopHeadlines().subscribe({
      next: (response) => {
        this.topHeadingDisplay = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading top headlines:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  removeShimmer(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.classList.remove('shimmer');
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
