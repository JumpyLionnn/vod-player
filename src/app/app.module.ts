import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ChatReplayComponent } from './chat-replay/chat-replay.component';
import { MessageComponent } from './chat-replay/message/message.component';

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
  MessageComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
