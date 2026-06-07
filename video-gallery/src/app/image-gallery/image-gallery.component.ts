import { UnsplashService } from './../unsplash.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  images: any[] = [];

  MainImg: any;
  title: any;
  author: any;
  more: any;

  constructor(private unsplash: UnsplashService) { }

  ngOnInit(): void {
    this.imagesArray();
    this.init();
    console.log(this.images);
  }
  init() {
    this.MainImg = document.querySelector(".main_image .Img img");
    this.title = document.querySelector(".main_image .Img .title");
    this.author = document.querySelector(".main_image .Img .author");
    this.more = document.querySelector(".main_image .Img .d-flex a");
  }

  imagesArray() {
    this.unsplash.getImages().subscribe(
      (resp: any) => {
        console.log(resp);
        this.images = resp.articles;
      }
    )
  }
  onImageClick(e: any) {
    console.log(e);
    let src, text, auth, read;

    if (e.path.length == 9) {
      src = e.path[0].children[0].getAttribute('src');
      text = e.path[0].children[1].children[0].innerHTML;
      auth = e.path[0].children[1].children[1].innerHTML;
      read = e.path[0].children[1].children[2].href;
    }
    else if (e.path.length == 10) {
      src = e.path[1].children[0].getAttribute('src');
      text = e.path[1].children[1].children[0].innerHTML;
      auth = e.path[1].children[1].children[1].innerHTML;
      read = e.path[1].children[1].children[2].href;
    }
    else if (e.path.length == 11) {
      src = e.path[2].children[0].getAttribute('src');
      text = e.path[2].children[1].children[0].innerHTML;
      auth = e.path[2].children[1].children[1].innerHTML;
      read = e.path[2].children[1].children[2].href;
    }

    this.MainImg.src = src;
    this.title.innerHTML = text;
    this.author.innerHTML = auth;
    this.more.href = read;
  }
}
