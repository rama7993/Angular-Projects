import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  constructor() { }

  MainVid: any;
  title: any;

  ngOnInit(): void {
    this.MainVid = document.querySelector(".main_video .Vid video");
    this.title = document.querySelector(".main_video .Vid .title");
  }

  onVdoClick(e: any) {
    console.log(e);
    const src = e.path[1].firstChild.getAttribute('src');
    const text = e.path[1].lastChild.innerHTML;
    this.MainVid.src = src;
    this.title.innerHTML = text;
  }
}
