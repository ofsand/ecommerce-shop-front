import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  selectedImage: string;;
  
  @Input() images: string[];

  ngOnInit(): void {
    if(this.hasImages()) {
      this.selectedImage = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    if(this.hasImages()) {
      this.selectedImage = imageUrl;
    }
  }

  hasImages() {
    return this.images?.length >0;
  }
}
