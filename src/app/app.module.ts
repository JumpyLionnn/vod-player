import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ChatReplayComponent } from './chat-replay/chat-replay.component';
import { MessageComponent } from './chat-replay/message/message.component';
import { AutoscrollDirective } from './autoscroll.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgScrollbarReachedModule } from 'ngx-scrollbar/reached-event';


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
		AutoscrollDirective
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		MatIconModule,
		NgScrollbarModule,
		NgScrollbarReachedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
