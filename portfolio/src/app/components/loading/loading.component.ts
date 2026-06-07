import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: false,

  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading = true;

  ngOnInit() {
    // Simulate loading time
    setTimeout(() => {
      this.hideLoading();
    }, 2000);
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  hideLoading() {
    this.isLoading = false;
    // Remove loading screen from DOM after fade out
    setTimeout(() => {
      const loadingElement = document.querySelector('app-loading');
      if (loadingElement) {
        loadingElement.remove();
      }
    }, 500);
  }
}
