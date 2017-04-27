import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DesignComponent} from "../design/design.component";
import {ConstructionComponent} from "../construction/construction.component";
import {ColorComponent} from "../color/color.component";
import {TopSectionComponent} from "../top-section/top-section.component";
import {GlassTypeComponent} from "../glass-type/glass-type.component";
import {LockComponent} from "../lock/lock.component";
import {ConfigComponent} from "./config.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        // path: 'config', component: ConfigComponent,
        // children: [
        //   {path: 'design', component: DesignComponent},
        //   {path: 'construction', component: ConstructionComponent},
        //   {path: 'color', component: ColorComponent},
        //   {path: 'topSection', component: TopSectionComponent},
        //   {path: 'glassType', component: GlassTypeComponent},
        //   {path: 'lock', component: LockComponent},
        //   {path: '', redirectTo: '/design', pathMatch: 'full'}
        // ]
      }
    ])
  ],
  declarations: [
    DesignComponent,
    ConstructionComponent,
    ColorComponent,
    TopSectionComponent,
    GlassTypeComponent,
    LockComponent
  ]
})
export class ConfigModule {
}
