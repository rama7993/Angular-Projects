import { Component, OnInit } from '@angular/core';
import { ApiService, NewsArticle } from '../../service/api.service';

@Component({
  selector: 'app-sports-news',
  templateUrl: './sports-news.component.html',
  styleUrls: ['./sports-news.component.css'],
})
export class SportsNewsComponent implements OnInit {
  sportsNews: NewsArticle[] = [];
  loading = true;
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadSportsNews();
  }

  loadSportsNews(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getNewsByCategory('sports').subscribe({
      next: (response) => {
        this.sportsNews = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sports news:', error);
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
