import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-custom',
  templateUrl: './infinite-scroll-custom.component.html',
  styleUrls: ['./infinite-scroll-custom.component.scss']
})
export class InfiniteScrollCustomComponent implements OnInit, AfterViewInit, OnDestroy {
  items: string[] = [];
  isLoading: boolean = false;
  page: number = 1;
  private readonly itemsPerPage = 20;
  
  @ViewChild('scrollSentinel') scrollSentinel!: ElementRef;
  private observer!: IntersectionObserver;

  ngOnInit() {
    this.loadMoreItems();
  }

  ngAfterViewInit() {
    this.setupObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '200px', // trigger 200px before the end
      threshold: 0
    };

    this.observer = new IntersectionObserver(([entry]) => {
      // Fetch more items when sentinel enters viewport
      if (entry.isIntersecting && !this.isLoading) {
        this.loadMoreItems();
      }
    }, options);

    if (this.scrollSentinel) {
      this.observer.observe(this.scrollSentinel.nativeElement);
    }
  }

  loadMoreItems() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      const newItems = Array.from({ length: this.itemsPerPage }).map(
        (_, i) => `Item ${(this.page - 1) * this.itemsPerPage + i + 1}`
      );
      this.items = [...this.items, ...newItems];
      this.page++;
      this.isLoading = false;
    }, 800);
  }
}
