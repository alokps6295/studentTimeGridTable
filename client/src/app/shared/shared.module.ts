import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { JwtService } from './services/app/JwtHelperService';
import { SharedService } from './shared.service';
const SHARED_COMPONENTS = [
	LoaderComponent,
	];

const SINGLETON_SERVICES = [
	LoaderService,
	JwtService,
	
];

export const jwtConfig = {
	config: {
	  tokenGetter: tokenGetter,
    headerName: environment.headerName,
    authScheme: environment.authScheme,
    throwNoTokenError: false,
    // skipWhenExpired: true,
	  whitelistedDomains: environment.whitelistedDomains,
	  blacklistedRoutes: environment.blacklistedRoutes,
	},
};

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		NgbModule,
		// JwtModule.forRoot(jwtConfig)
	],
    declarations: [
    	...SHARED_COMPONENTS,
    ],
    exports: [
			CommonModule,
    	...SHARED_COMPONENTS,
    ],
    providers: [
			SharedService
		],
		schemas : [ CUSTOM_ELEMENTS_SCHEMA ],
		entryComponents: [
		]
})

export class SharedModule {
	// constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
	//   throwIfAlreadyLoaded(parentModule, 'SharedModule');
	// }

	static forRoot(): ModuleWithProviders {
	  return <ModuleWithProviders>{
	    ngModule: SharedModule,
	    // imports: [],
	    providers: [
	      ...SINGLETON_SERVICES,
	    ],
	  };
	}
}
