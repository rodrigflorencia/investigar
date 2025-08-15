import { Routes } from '@angular/router';
import { RulitInstructionsPage } from './components/rulit-instructions.component';
import { RulitUserFormPage } from './components/rulit-user-form.component';
import { RulitTestPage } from './components/rulit-test.component';
import { RulitAppscriptCallbackPage } from './components/rulit-appscript-callback.component';

export const RULIT_ROUTES: Routes = [
  { path: '', redirectTo: 'instructions', pathMatch: 'full' },
  { path: 'instructions', component: RulitInstructionsPage },
  { path: 'user-form', component: RulitUserFormPage },
  { path: 'test', component: RulitTestPage },
  { path: 'test/:userId', component: RulitTestPage },
  { path: 'appscript-callback/:rowId', component: RulitAppscriptCallbackPage }
];
