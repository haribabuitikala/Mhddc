import {Routes} from '@angular/router';
import {BannerComponent} from "./banner/banner.component";
import {ZipResultsComponent} from "./zip-results/zip-results.component";
import {CategoryComponent} from "./category/category.component";
import {DoorSizeComponent} from "./door-size/door-size.component";
import {CollectionComponent} from "./collection/collection.component";
import {HomeComponent} from "./home/home.component";
import {ThankyouComponent} from "./thankyou/thankyou.component";

export const appRoutes:Routes = [
  {path: 'banner', component: BannerComponent},
  {path: 'zipResults', component: ZipResultsComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'doorSize', component: DoorSizeComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: '', redirectTo: '/banner', pathMatch: 'full'}
];
