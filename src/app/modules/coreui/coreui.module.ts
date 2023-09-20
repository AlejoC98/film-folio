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
  ButtonModule,
  NavModule,
  TabsModule,
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
    ButtonModule,
    NavModule,
    TabsModule
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
    ButtonModule,
    TabsModule,
    TabsModule
  ]
})
export class CoreuiModule { }
