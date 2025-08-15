import { Routes } from '@angular/router';
import { CreativityTestPage } from './components/creativity-test.component';
import { CreativityInstructionsPage } from './components/creativity-instructions.component';
import { PersonalInfoComponent } from '../../shared/components/personal-info.component';
import { MessageOkPrevTestComponent } from '../../shared/components/message-ok-prev-test.component';

export const CREATIVITY_ROUTES: Routes = [
  { 
    path: '', 
    children: [
      { 
        path: '', 
        redirectTo: 'instructions', 
        pathMatch: 'full' 
      },
      { 
        path: 'instructions', 
        component: CreativityInstructionsPage,
        data: { title: 'Instrucciones' }
      },
      { 
        path: 'personal-info',
        component: PersonalInfoComponent,
        data: { 
          title: 'Datos Personales',
          nextRoute: '/creativity/message-ok' 
        }
      },
      {
        path: 'message-ok',
        component: MessageOkPrevTestComponent,
        data: { 
          title: '¡Listo!',
          nextRoute: '/creativity/test' 
        }
      },
      { 
        path: 'test', 
        component: CreativityTestPage,
        data: { title: 'Prueba de Creatividad' }
      },
      { 
        path: '**', 
        redirectTo: 'instructions' 
      }
    ]
  }
];
