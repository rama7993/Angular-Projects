import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JitsiComponent } from './jitsi/jitsi.component';
import { LinPhoneComponent } from './lin-phone/lin-phone.component';
import { CallInterfaceComponent } from './components/call-interface/call-interface.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CallHistoryComponent } from './components/call-history/call-history.component';
import { SipConfigComponent } from './components/sip-config/sip-config.component';
import { AudioSettingsComponent } from './components/audio-settings/audio-settings.component';

// Services
import { SipService } from './services/sip.service';
import { CallRecordingService } from './services/call-recording.service';

@NgModule({
  declarations: [
    AppComponent,
    JitsiComponent,
    LinPhoneComponent,
    CallInterfaceComponent,
    ContactsComponent,
    CallHistoryComponent,
    SipConfigComponent,
    AudioSettingsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [SipService, CallRecordingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
