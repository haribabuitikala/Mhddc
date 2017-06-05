import {BrowserModule} from '@angular/platform-browser';
import {NgModule, animate} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {ToastrModule} from 'toastr-ng2';

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
import {NavigateService} from "./shared/navigate.service";
import {ConfigModule} from "./config/config.module";
import {ZipResults} from "./shared/zipresults";
import {AppUtilities} from "./shared/appUtilities";
import {ZipResolver} from "./zip-results/zip-resolver.service";
import {LangEnglishService} from "./shared/english";
import {SizeList} from "./door-size/sizesList";
import {CollectionService} from "./shared/data.service";
import {CollectionData} from "./collection/collection-data";
import {CollectionPopup} from "./collection/collection-popup";
import {GdoDoorSizeComponent} from './gdo-door-size/gdo-door-size.component';
import {GdoConfigComponent} from './gdo-config/gdo-config.component';
import {NavService} from "./nav/nav-service";
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ApiConstants} from "./shared/api-constants";
import {GdoOpener} from "./opener/gdoOpener";
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerServiceInfoComponent } from './customer-service-info/customer-service-info.component';
import { CartDetailsRootComponent } from './cart-details/cart-details-root.component';

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
        CollectionPopup,
        GdoDoorSizeComponent,
        GdoConfigComponent,
        ShoppingCartComponent,
        CustomerInfoComponent,
        CustomerServiceInfoComponent,
        CartDetailsRootComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2Bs3ModalModule,
        RouterModule.forRoot(appRoutes,{ useHash: true }),
        ConfigModule,
        ToastrModule.forRoot()
    ],
    providers: [
        ApiStoreService,
        NavigateService,
        ZipResults,
        AppUtilities, 
        ZipResolver,
        LangEnglishService,
        SizeList,
        CollectionService,
        CollectionData,
        NavService,
        ApiConstants,
        GdoOpener
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
