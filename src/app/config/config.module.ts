import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {FormsModule} from '@angular/forms';

import {DesignComponent} from "../design/design.component";
import {ConstructionComponent} from "../construction/construction.component";
import {ColorComponent} from "../color/color.component";
import {TopSectionComponent} from "../top-section/top-section.component";
import {GlassTypeComponent} from "../glass-type/glass-type.component";
import {LockComponent} from "../lock/lock.component";
import {ConfigComponent} from "./config.component";
import {InstallComponent} from "../install/install.component";
import {OpenerComponent} from "../opener/opener.component";
import { ResOpenerComponent } from "../res-opener/res-opener.component";
import {AdditionalOptionsComponent} from "../additional-options/additional-options.component";
import { ResAdditionalOptionsComponent } from "../additional-options/res-additional-options-comp";
import {DoorConfigurationComponent} from "../door-configuration/door-configuration.component";
import {ResDoorConfigurationComponent} from "../door-configuration/res-door-configuration.comp";
import {ThankyouComponent} from "../thankyou/thankyou.component";
//import {DetailsComponent} from "../details/details.component";
import {OpenerSelectedComponent} from "../opener-selected/opener-selected.component";
import {SliderComponentComponent} from "../slider-component/slider-component.component";
import {InstallQuestionComponent} from "../install-question/install-question.component";
import {InstallAnswerComponent} from "../install-answer/install-answer.component";
import {NonClassicComponent} from "../non-classic/non-classic.component";
import {HardwareComponent} from "../hardware/hardware.component";
import {GdoConfigComponent} from "../gdo-config/gdo-config.component";
import {ResUpdateComponent} from "./resUpdateQty";
import {GdoUpdateComponent} from "../opener/gdoUpdateQty";
import {ResSliderComponent} from "../slider-component/res-slider.component";
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { EscapeHtmlPipe } from '../shared/html-entitiy';
import { CartDetailsComponent } from '../cart-details/cart-details.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2Bs3ModalModule,
        ShareButtonsModule.forRoot(),
        RouterModule.forChild([
            {
                path: 'config', component: ConfigComponent,
                children: [
                    { path: 'design', component: DesignComponent },
                    { path: 'construction', component: ConstructionComponent },
                    { path: 'color', component: ColorComponent },
                    { path: 'topSection', component: TopSectionComponent },
                    { path: 'hardware', component: HardwareComponent },
                    { path: 'glassType', component: GlassTypeComponent },
                    { path: 'nonClassic', component: NonClassicComponent },
                    { path: 'lock', component: LockComponent },
                    { path: 'install', component: InstallComponent },
                    { path: 'opener', component: ResOpenerComponent },
                    { path: 'openerSelected', component: OpenerSelectedComponent },
                    { path: 'additionalOptions', component: ResAdditionalOptionsComponent },
                    { path: 'doorConfiguration', component: ResDoorConfigurationComponent },
                    { path: '', redirectTo: 'design', pathMatch: 'full' }
                ]
            },
            {
                path: 'gdoConfig', component: GdoConfigComponent,
                children: [
                    { path: 'opener', component: OpenerComponent },
                    { path: 'additionalOptions', component: AdditionalOptionsComponent },
                    { path: 'additionalOptions/:havingdooropener', component: AdditionalOptionsComponent },
                    { path: 'doorConfiguration', component: DoorConfigurationComponent }
                ]
            },
            { path: 'installQuestion', component: InstallQuestionComponent },
            { path: 'installAnswer', component: InstallAnswerComponent }
        ])
    ],
    declarations: [
        DesignComponent,
        ConstructionComponent,
        ResAdditionalOptionsComponent,
        ColorComponent,
        TopSectionComponent,
        GlassTypeComponent,
        LockComponent,
        GlassTypeComponent,
        InstallComponent,
        OpenerComponent,
        ResOpenerComponent,
        AdditionalOptionsComponent,
        DoorConfigurationComponent,
        ResDoorConfigurationComponent,
        ThankyouComponent,
        // DetailsComponent,
        ConfigComponent,
        OpenerSelectedComponent,
        SliderComponentComponent,
        InstallQuestionComponent,
        InstallAnswerComponent,
        NonClassicComponent,
        HardwareComponent,
        GdoUpdateComponent,
        ResSliderComponent,
        ResUpdateComponent,
        EscapeHtmlPipe,
        CartDetailsComponent
    ]
})
export class ConfigModule {
}
