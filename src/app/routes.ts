import {Routes} from '@angular/router';
import {BannerComponent} from "./banner/banner.component";
import {ZipResultsComponent} from "./zip-results/zip-results.component";
import {CategoryComponent} from "./category/category.component";
import {DoorSizeComponent} from "./door-size/door-size.component";
import {CollectionComponent} from "./collection/collection.component";
import {HomeComponent} from "./home/home.component";
import {ThankyouComponent} from "./thankyou/thankyou.component";
import {ZipResolver} from "./zip-results/zip-resolver.service";
import {GdoDoorSizeComponent} from "./gdo-door-size/gdo-door-size.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {CustomerServiceInfoComponent} from './customer-service-info/customer-service-info.component';
import { Four04Component } from './Four04Component';


export const appRoutes: Routes = [
    { path: 'banner', component: BannerComponent },
    {
        path: 'zipResults/:zip',
        component: ZipResultsComponent
    },
    { path: 'category', component: CategoryComponent },
    { path: 'doorSize', component: DoorSizeComponent },
    { path: 'collection', component: CollectionComponent },
    { path: 'home', component: HomeComponent },
    { path: 'shoppingCart', component: ShoppingCartComponent },
    { path: 'shoppingCart/confirm', component: ShoppingCartComponent, data: { 'openmodal': true } },
    { path: 'customer-info', component: CustomerInfoComponent },
    { path: 'customer-service-info', component: CustomerServiceInfoComponent },
    { path: 'thankyou', component: ThankyouComponent },
    // gdo flow
    { path: 'gdoDoorSize', component: GdoDoorSizeComponent },
    { path: '', redirectTo: '/banner', pathMatch: 'full' },
    { path: '**', component: Four04Component }
];
