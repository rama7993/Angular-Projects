import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() maxStars: number = 5;
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  
  hoverState: number = 0;

  get starsArray() {
    return Array(this.maxStars).fill(0).map((_, i) => i + 1);
  }

  onMouseEnter(star: number) {
    this.hoverState = star;
  }

  onMouseLeave() {
    this.hoverState = 0;
  }

  setRating(star: number) {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }
}
