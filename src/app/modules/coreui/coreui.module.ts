import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NavbarComponent, 
  ContainerComponent, 
  NavbarNavComponent, 
  NavItemComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselIndicatorsComponent,
  CarouselCaptionComponent,
  CardComponent,
  CardBodyComponent,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IconModule,
    NavbarComponent,
    ContainerComponent,
    NavbarNavComponent,
    NavItemComponent,
    CarouselComponent,
    CarouselControlComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselIndicatorsComponent,
    CarouselCaptionComponent,
    CardComponent,
    CardBodyComponent,
  ],
  exports: [
    IconModule,
    NavbarComponent,
    ContainerComponent,
    NavbarNavComponent,
    NavItemComponent,
    CarouselComponent,
    CarouselControlComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselIndicatorsComponent,
    CarouselCaptionComponent,
    CardComponent,
    CardBodyComponent,
  ]
})
export class CoreuiModule { }
