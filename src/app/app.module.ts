import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';

import {AppComponent} from './app.component';
import {appRoutes} from './routes';
import {NavComponent} from './nav/nav.component';
import {HeaderComponent} from './header/header.component';
import {BannerComponent} from './banner/banner.component';
import {TrendingNowComponent} from './trending-now/trending-now.component';
import {ApiStoreService} from "./shared/api-store.service";
import {ZipResultsComponent} from './zip-results/zip-results.component';
import {CategoryComponent} from './category/category.component';
import {ServiceRepairComponent} from './modals/service-repair/service-repair.component';
import {DoorSizeComponent} from './door-size/door-size.component';
import {CollectionComponent} from './collection/collection.component';
import {HomeComponent} from './home/home.component';
import {DesignComponent} from './design/design.component';
import {ConstructionComponent} from './construction/construction.component';
import {ColorComponent} from './color/color.component';
import {TopSectionComponent} from './top-section/top-section.component';
import {LockComponent} from './lock/lock.component';
import {GlassTypeComponent} from './glass-type/glass-type.component';
import {InstallComponent} from './install/install.component';
import {OpenerComponent} from './opener/opener.component';
import {AdditionalOptionsComponent} from './additional-options/additional-options.component';
import {DoorConfigurationComponent} from './door-configuration/door-configuration.component';
import {ThankyouComponent} from './thankyou/thankyou.component';
import {DetailsComponent} from './details/details.component';
import {ConfigComponent} from './config/config.component';
import { OpenerSelectedComponent } from './opener-selected/opener-selected.component';
import { SliderComponentComponent } from './shared/slider-component/slider-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    BannerComponent,
    TrendingNowComponent,
    ZipResultsComponent,
    CategoryComponent,
    ServiceRepairComponent,
    DoorSizeComponent,
    CollectionComponent,
    HomeComponent,
    DesignComponent,
    ConstructionComponent,
    ColorComponent,
    TopSectionComponent,
    LockComponent,
    GlassTypeComponent,
    InstallComponent,
    OpenerComponent,
    AdditionalOptionsComponent,
    DoorConfigurationComponent,
    ThankyouComponent,
    DetailsComponent,
    ConfigComponent,
    OpenerSelectedComponent,
    SliderComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiStoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
