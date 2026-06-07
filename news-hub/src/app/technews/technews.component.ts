import { Component, OnInit } from '@angular/core';
import { ApiService, NewsArticle } from '../service/api.service';

@Component({
  selector: 'app-technews',
  templateUrl: './technews.component.html',
  styleUrls: ['./technews.component.css'],
})
export class TechnewsComponent implements OnInit {
  news: NewsArticle[] = [];
  loading = true;
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTechNews();
  }

  loadTechNews(): void {
    this.loading = true;
    this.error = false;

    this.apiService.getNewsByCategory('technology').subscribe({
      next: (response) => {
        this.news = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tech news:', error);
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
