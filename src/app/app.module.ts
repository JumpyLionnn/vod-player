import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ChatReplayComponent } from './chat-replay/chat-replay.component';
import { MessageComponent } from './chat-replay/message/message.component';
import { BadgeComponent } from './chat-replay/badge/badge.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgScrollbarModule } from 'ngx-scrollbar';


const routes: Route[] = [
	{
		path: "",
		component: AppComponent
	}
];


@NgModule({
	declarations: [
		AppComponent,
		VideoPlayerComponent,
		ChatReplayComponent,
		MessageComponent,
		BadgeComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		
		MatIconModule,
		MatTooltipModule,

		NgScrollbarModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
