import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.css'],
})
export class InfoBlockComponent implements OnInit {
  @Input() label!: string;
  @Input() value!: number | string;
  @Input() imageSrc!: string;

  constructor() {}

  ngOnInit(): void {}

  getIconClass(): string {
    const iconMap: { [key: string]: string } = {
      'Feels Like': 'fas fa-thermometer-half',
      Pressure: 'fas fa-tachometer-alt',
      Humidity: 'fas fa-tint',
      Wind: 'fas fa-wind',
      Visibility: 'fas fa-eye',
      'UV Index': 'fas fa-sun',
      'Dew Point': 'fas fa-thermometer',
      'Cloud Cover': 'fas fa-cloud',
    };

    return iconMap[this.label] || 'fas fa-info-circle';
  }
}
