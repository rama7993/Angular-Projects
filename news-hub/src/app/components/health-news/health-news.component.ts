import { Component, OnInit } from '@angular/core';
import { ApiService, NewsArticle } from '../../service/api.service';

@Component({
  selector: 'app-health-news',
  templateUrl: './health-news.component.html',
  styleUrls: ['./health-news.component.css'],
})
export class HealthNewsComponent implements OnInit {
  healthNews: NewsArticle[] = [];
  loading = true;
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadHealthNews();
  }

  loadHealthNews(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getNewsByCategory('health').subscribe({
      next: (response) => {
        this.healthNews = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading health news:', error);
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
