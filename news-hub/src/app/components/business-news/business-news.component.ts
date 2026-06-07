import { Component, OnInit } from '@angular/core';
import { ApiService, NewsArticle } from '../../service/api.service';

@Component({
  selector: 'app-business-news',
  templateUrl: './business-news.component.html',
  styleUrls: ['./business-news.component.css'],
})
export class BusinessNewsComponent implements OnInit {
  businessNews: NewsArticle[] = [];
  loading = true;
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBusinessNews();
  }

  loadBusinessNews(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getNewsByCategory('business').subscribe({
      next: (response) => {
        this.businessNews = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading business news:', error);
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
