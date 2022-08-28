import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import {ButtonModule} from 'primeng/button';
import { FeaturesBlockComponent } from '../../../products/src/lib/components/features-block/features-block.component';


@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    FeaturesBlockComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    FeaturesBlockComponent
  ],
})
export class UiModule {}
