import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinPhoneComponent } from './lin-phone/lin-phone.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { CallInterfaceComponent } from './components/call-interface/call-interface.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CallHistoryComponent } from './components/call-history/call-history.component';
import { SipConfigComponent } from './components/sip-config/sip-config.component';
import { AudioSettingsComponent } from './components/audio-settings/audio-settings.component';

const routes: Routes = [
  { path: 'sip-config', component: SipConfigComponent },
  { path: 'audio-settings', component: AudioSettingsComponent },
  { path: 'call-interface', component: CallInterfaceComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'call-history', component: CallHistoryComponent },
  { path: 'jitsi', component: JitsiComponent },
  { path: 'linphone', component: LinPhoneComponent },
  { path: '', redirectTo: '/sip-config', pathMatch: 'full' },
  { path: '**', redirectTo: '/sip-config' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
