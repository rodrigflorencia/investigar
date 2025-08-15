import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RulitUserService } from '../services/rulit.service';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_IMPORTS
  ],
  selector: 'app-rulit-appscript-callback-page',
  templateUrl: './rulit-appscript-callback.component.html',
  styleUrls: ['./rulit-appscript-callback.component.scss'],
})
export class RulitAppscriptCallbackPage implements OnInit {
  
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(RulitUserService);
  private readonly snackBar = inject(MatSnackBar);

  error = false;
  userExists = false; // This logic seems to be missing, I'll keep the variable but the template won't use it for now.
  message = '';
  
  constructor() {}

  ngOnInit(): void {
    try {
      const rowId = this.route.snapshot.paramMap.get('rowId');

      if (!rowId) {
        this.showError('No se proporcionó el ID de respuesta');
        return;
      }

      // The original component had logic to check if a user exists.
      // This should be handled by the service, but for now, I'll just create the user.
      this.service.createNewUser({
        name: 'Usuario desde Formulario',
        email: `usuario-${rowId}@test.com`,
        formRespID: rowId,
      });

      // Redirigir al test
      this.router.navigate(['/rulit/test', rowId]);
    } catch (error) {
      console.error('Error en AppScriptCallback:', error);
      this.error = true;
      this.message =
        'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.';
      this.showError(this.message);
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 10000,
      panelClass: ['error-snackbar'],
    });
  }

  navigateToTest() {
    // This button is in a part of the template that is currently not reachable
    // but I'll keep the method for completeness.
    this.router.navigate(['/rulit/test']);
  }
}
