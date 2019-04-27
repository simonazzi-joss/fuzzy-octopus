import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
// import { ConfigService } from 'src/services/config.service';
import { HomePageComponent } from './home-page/home-page.component';
import { Card } from './components/card/card.component';

const appRoutes: Routes = [
	{
		path: '**',
		component: HomePageComponent,
	}
];

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		HeaderComponent,
		HomePageComponent,

		// componenti
		Card
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
	],
	providers: [ 
	/*	{
			provide: APP_INITIALIZER,
			useFactory: (config: ConfigService) => () => config.fetchConfiguration(),
			deps: [ConfigService],
			multi: true
		}
	*/
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
