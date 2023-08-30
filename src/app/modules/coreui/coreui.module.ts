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
  ModalModule,
  ListGroupModule
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
    ModalModule,
    ListGroupModule
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
    ModalModule,
    ListGroupModule
  ]
})
export class CoreuiModule { }
