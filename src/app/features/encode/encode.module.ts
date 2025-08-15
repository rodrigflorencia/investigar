import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModule } from '../shared/shared.module';

// CDK
import { CdkStepperModule } from '@angular/cdk/stepper';

import { EncodeRoutingModule } from './encode-routing.module';
import { EncodeAboutComponent } from './about-component/encode-about.component';
import { EncodeWellcomeComponent } from './wellcome-component/encode-wellcome.component';
import { AudioRecorderComponent } from './audio-recorder-component/audio-recorder.component';
import { EncodeMicTestComponent } from './mic-test-component/mic-test.component';
import { AudioConfirmComponent } from './mic-test-component/audio-confirm-component/audio-confirm.component';
import { AudioDisclaimerComponent } from './audio-recorder-component/audio-disclaimer-component/audio-disclaimer.component';
import { EncodeVideoTestComponent } from './video-test-component/video-test.component';
import { EncodeConsentComponent } from './consent-component/encode-consent.component';
import { EncodePersonalInfoComponent } from '../shared/components/form-personal-info.component';
import { EncodeHealthInfoComponent } from './health-info-component/health-info.component';
import { EncodeSomnolenceDegreeComponent } from './somnolence-degree-component/somnolence-degree.component';
import { EncodeVideoComponent } from './video-component/video.component';
import { EncodeVideoPlayerComponent } from './video-component/video-player/video-player.component';
import { EncodeAudiosComponent } from './audios-component/audios.component';
import { EncodeEndComponent } from './end-component/encode-end.component';
import { ExitConfirmComponent } from './exit-confirm-component/exit-confirm.component';
import { EncodeGoogleFormsComponent } from './google-forms-component/encode-google-forms.component';
import { ByPassSecurityPipe } from './google-forms-component/by-pass-security.pipe';
import { EncodeAudioListComponent } from './audios-component/audios-list-component/audio-list.component';
import { ExtendedRecallComponent } from './audios-component/extended-recall-component/extended-recall.component';
import { EncodeAbandonedComponent } from './abandoned-component/encode-abandoned.component';
import { EncodeIdentificationTaskComponent } from './identification-task-component/identification-task.component';
import { EncodeSelectionComponent } from './selection-component/selection.component';
import { EncodeIdentificationRoomDirective } from './identification-task-component/identification-room.directive';
import { EncodeIdentificationRoomComponent } from './identification-task-component/identification-room-component/identification-room.component';
import { EncodeSuspectComponent } from './identification-task-component/identification-room-component/suspect-component/suspect.component';
import { ConfidenceDialogComponent } from './identification-task-component/identification-room-component/confidence-component/confidence.component';
import { EncodeSortingTaskComponent } from './sorting-task-component/sorting-task.component';
import { EncodeInstructionsComponent } from './instructions-component/instructions-component.component';
import { EncodeGridImageComponent } from './sorting-task-component/grid-image-component/grid-image.component';
import { EncodeFullImageComponent } from './sorting-task-component/grid-image-component/full-image-component/full-image.component';
import { EncodeTimelineComponent } from './sorting-task-component/timeline-component/timeline.component';

@NgModule({
  declarations: [
    EncodeAboutComponent,
    EncodeAbandonedComponent,

    EncodeMicTestComponent,
    AudioRecorderComponent,
    AudioConfirmComponent,
    AudioDisclaimerComponent,

    EncodeConsentComponent,
    EncodePersonalInfoComponent,
    EncodeHealthInfoComponent,
    EncodeSomnolenceDegreeComponent,
    EncodeVideoComponent,
    EncodeVideoPlayerComponent,
    EncodeAudiosComponent,
    EncodeEndComponent,
    ExitConfirmComponent,
    EncodeGoogleFormsComponent,
    ByPassSecurityPipe,
    EncodeAudioListComponent,
    ExtendedRecallComponent,
    EncodeIdentificationTaskComponent,
    EncodeSelectionComponent,
    EncodeIdentificationRoomDirective,
    EncodeIdentificationRoomComponent,
    EncodeSuspectComponent,
    ConfidenceDialogComponent,
    EncodeSortingTaskComponent,
    EncodeInstructionsComponent,
    EncodeGridImageComponent,
    EncodeFullImageComponent,
    EncodeTimelineComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EncodeRoutingModule,
    EncodeWellcomeComponent,
    FormsModule,
    ReactiveFormsModule,
    EncodeVideoTestComponent,
    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    MatStepperModule,
    MatToolbarModule,
    MatButtonToggleModule,
    CdkStepperModule,
  ],
  exports: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EncodeModule {}
