import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DummyService } from 'src/services/dummy-data/dummy.service';

@Component({
  selector: 'app-infinite-scroller',
  templateUrl: './infinite-scroller.component.html',
  styleUrls: ['./infinite-scroller.component.scss'],
})
export class InfiniteScrollerComponent implements OnInit, AfterViewInit, OnDestroy {
  data: any[] = [];
  page: number = 1;
  limit: number = 20;
  loading: boolean = false;
  
  @ViewChild('scrollSentinel') scrollSentinel!: ElementRef;
  private observer!: IntersectionObserver;

  constructor(
    private dummyService: DummyService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getDummyData();
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
      root: null,
      rootMargin: '200px',
      threshold: 0
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.loading) {
        this.page++;
        this.getDummyData();
      }
    }, options);

    if (this.scrollSentinel) {
      this.observer.observe(this.scrollSentinel.nativeElement);
    }
  }

  getDummyData() {
    if (this.loading && this.data.length > 0) return; // Prevent double trigger
    this.loading = true;
    const params = {
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
    };
    this.dummyService.getDummyData(params).subscribe((resp) => {
      this.data = [...this.data, ...resp.quotes];
      this.loading = false;
    });
  }
}
