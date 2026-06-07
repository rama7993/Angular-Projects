import { UnsplashService } from './../unsplash.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {


  constructor(private unsplash: UnsplashService) {

  }
  videos: any[] = [];
  MainVid: any;
  title: any;
  author: any;

  ngOnInit(): void {
    this.getJsonVideos();
    this.init();
  }

  init() {
    this.MainVid = document.querySelector(".main_video .Vid video");
    this.title = document.querySelector(".main_video .Vid .title");
    this.author = document.querySelector(".main_video .Vid .author");
  }

  getJsonVideos() {
    this.unsplash.getVideos().subscribe(
      (resp: any) => {
        console.log(resp)
        this.videos = resp;
      }
    );
  }

  onVideoClick(e: any) {
    console.log(e);
    let src, text, auth;

    if (e.path.length == 9) {
      src = e.path[0].children[0].getAttribute('src');
      text = e.path[0].children[1].children[0].innerHTML;
      auth = e.path[0].children[1].children[1].innerHTML;
    }
    else if (e.path.length == 10) {
      src = e.path[1].children[0].getAttribute('src');
      text = e.path[1].children[1].children[0].innerHTML;
      auth = e.path[1].children[1].children[1].innerHTML;
    }
    else if (e.path.length == 11) {
      src = e.path[2].children[0].getAttribute('src');
      text = e.path[2].children[1].children[0].innerHTML;
      auth = e.path[2].children[1].children[1].innerHTML;
    }
    this.MainVid.src = src;
    this.title.innerHTML = text;
    this.author.innerHTML = auth;
  }

  deleteVideo(idx: number) {
    this.videos.splice(idx, 1);
    this.MainVid.src = '';
    this.title.innerHTML = '';
    this.author.innerHTML = '';
  }

}
