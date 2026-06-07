import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, NewsArticle } from '../../service/api.service';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.css'],
})
export class SearchNewsComponent implements OnInit {
  searchForm: FormGroup;
  searchResults: NewsArticle[] = [];
  loading = false;
  error = false;
  hasSearched = false;

  // Independent filters
  selectedCategory = '';
  selectedCountry = 'in';

  categories = [
    { value: '', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'politics', label: 'Politics' },
  ];

  countries = [
    { value: 'in', label: 'India' },
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
  ];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    // Load initial news based on default filters
    this.loadNewsByFilters();
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.performSearch();
    }
  }

  onCategoryChange(): void {
    this.loadNewsByFilters();
  }

  onCountryChange(): void {
    this.loadNewsByFilters();
  }

  performSearch(): void {
    const query = this.searchForm.get('query')?.value;
    this.loading = true;
    this.error = false;
    this.hasSearched = true;

    this.apiService.searchNews(query).subscribe({
      next: (response) => {
        this.searchResults = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching news:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  loadNewsByFilters(): void {
    this.loading = true;
    this.error = false;
    this.hasSearched = false;

    if (this.selectedCategory) {
      // Load news by category
      this.apiService.getNewsByCategory(this.selectedCategory).subscribe({
        next: (response) => {
          this.searchResults = response.articles;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading category news:', error);
          this.error = true;
          this.loading = false;
        },
      });
    } else {
      // Load top headlines for selected country
      this.apiService.getNewsByCountry(this.selectedCountry).subscribe({
        next: (response) => {
          this.searchResults = response.articles;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading country news:', error);
          this.error = true;
          this.loading = false;
        },
      });
    }
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.searchResults = [];
    this.hasSearched = false;
    this.error = false;
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedCountry = 'in';
    this.loadNewsByFilters();
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
