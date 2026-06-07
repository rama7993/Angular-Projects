import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider/public_api';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @ViewChild('nav') slider!: NgImageSliderComponent;
  imageObject:any[]=[];
  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 9; i++) {
      this.imageObject.push({ video: `../../assets/videos/vid_${i}.mp4`, title: `${i}.title` });
    }
  }
}
