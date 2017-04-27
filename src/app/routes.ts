import {Routes} from '@angular/router';
import {BannerComponent} from "./banner/banner.component";
import {ZipResultsComponent} from "./zip-results/zip-results.component";
import {CategoryComponent} from "./category/category.component";
import {DoorSizeComponent} from "./door-size/door-size.component";
import {CollectionComponent} from "./collection/collection.component";
import {HomeComponent} from "./home/home.component";
import {DesignComponent} from "./design/design.component";
import {ConstructionComponent} from "./construction/construction.component";
import {ColorComponent} from "./color/color.component";
import {TopSectionComponent} from "./top-section/top-section.component";
import {LockComponent} from "./lock/lock.component";
import {GlassTypeComponent} from "./glass-type/glass-type.component";
import {InstallComponent} from "./install/install.component";
import {OpenerComponent} from "./opener/opener.component";
import {AdditionalOptionsComponent} from "./additional-options/additional-options.component";
import {DoorConfigurationComponent} from "./door-configuration/door-configuration.component";
import {ThankyouComponent} from "./thankyou/thankyou.component";
import {ConfigComponent} from "./config/config.component";
import {OpenerSelectedComponent} from "./opener-selected/opener-selected.component";

export const appRoutes:Routes = [
  {path: 'banner', component: BannerComponent},
  {path: 'zipResults', component: ZipResultsComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'doorSize', component: DoorSizeComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'config', component: ConfigComponent,
    children: [
      {path: 'design', component: DesignComponent},
      {path: 'construction', component: ConstructionComponent},
      {path: 'color', component: ColorComponent},
      {path: 'topSection', component: TopSectionComponent},
      {path: 'glassType', component: GlassTypeComponent},
      {path: 'lock', component: LockComponent},
      {path: 'install', component: InstallComponent},
      {path: 'opener', component: OpenerComponent},
      {path: 'openerSelected', component: OpenerSelectedComponent},
      {path: 'additionalOptions', component: AdditionalOptionsComponent},
      {path: 'doorConfiguration', component: DoorConfigurationComponent},
      {path: '', redirectTo: 'design', pathMatch: 'full'}
    ]
  },
  {path: 'thankyou', component: ThankyouComponent},
  {path: '', redirectTo: '/banner', pathMatch: 'full'}
];
