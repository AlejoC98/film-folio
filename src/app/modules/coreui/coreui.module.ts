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
  ListGroupModule,
  BadgeModule,
  ButtonModule
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
    ListGroupModule,
    BadgeModule,
    ButtonModule
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
    ListGroupModule,
    BadgeModule,
    ButtonModule
  ]
})
export class CoreuiModule { }
