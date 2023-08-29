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
    CarouselCaptionComponent
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
    CarouselCaptionComponent
  ]
})
export class CoreuiModule { }
