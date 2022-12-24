import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { PictureInPictureComponent } from './video-player/picture-in-picture/picture-in-picture.component';
import { ChatReplayComponent } from './chat-replay/chat-replay.component';
import { MessageComponent } from './chat-replay/message/message.component';
import { BadgeComponent } from './chat-replay/badge/badge.component';
import { HeaderComponent } from './header/header.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { TimeInputComponent } from './time-input/time-input.component';
import { FixedNumberInputComponent } from './time-input/fixed-number-input/fixed-number-input.component';
import { SettingsDialogComponent } from './settings/settings-dialog/settings-dialog.component';

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
		BadgeComponent,
		PictureInPictureComponent,
		HeaderComponent,
		ShareDialogComponent,
		TimeInputComponent,
		FixedNumberInputComponent,
		SettingsDialogComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,

		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatDialogModule,
		MatSnackBarModule,
		MatInputModule,
		MatCheckboxModule,
		MatDividerModule,
		MatRadioModule,
		ClipboardModule,

		NgScrollbarModule,
		VgCoreModule,
		VgControlsModule,
		VgOverlayPlayModule,
		VgBufferingModule,
		VgStreamingModule,
		ShareButtonModule,
		ShareIconsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
