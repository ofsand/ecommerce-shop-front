import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import {ButtonModule} from 'primeng/button';
import { FeaturesBlockComponent } from './components/features-block/features-block.component';
import { GalleryComponent } from './components/gallery/gallery.component';


@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    FeaturesBlockComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    FeaturesBlockComponent,
    GalleryComponent
  ],
})
export class UiModule {}
