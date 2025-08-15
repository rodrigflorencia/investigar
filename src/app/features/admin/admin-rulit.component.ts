import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulitRepo } from '../rulit/models/rulit.repo';
import { CsvExporter } from './admin-export';
import { HeaderAdminComponent } from 'src/app/layout/header-admin/header-admin.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';

const SEPARATOR = ',';

@Component({
  selector: 'app-admin-rulit-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderAdminComponent,
    
    ...MATERIAL_IMPORTS,
  ],
  styleUrls: ['./admin.page.scss'],
  templateUrl: './admin-rulit.component.html'
})
export class AdminRulitPage {
  
  private rulitRepo = inject(RulitRepo);

  shortMemMaxExercises = 0;
  longMemMaxExercises = 0;

  async exportData() {
    // 1. Fetch settings to determine dynamic headers
    const settingsSnap = await this.rulitRepo.getSettings();
    if (settingsSnap.exists()) {
        const rulitSettingsData = settingsSnap.data();
        // This logic seems to be fetching settings for every single solution, which is inefficient.
        // I'll keep the logic for now to avoid breaking the expected output.
        for (const solutionDocRef of rulitSettingsData.solutions) {
            const solutionSettingsSnap = await this.rulitRepo.getSolutionSettings(solutionDocRef.id);
            if (solutionSettingsSnap.exists()) {
                const settings = solutionSettingsSnap.data();
                if (this.shortMemMaxExercises < settings.shortMem_MaxExercises) {
                  this.shortMemMaxExercises = settings.shortMem_MaxExercises;
                }
                if (this.longMemMaxExercises < settings.longMem_MaxExercises) {
                  this.longMemMaxExercises = settings.longMem_MaxExercises;
                }
            }
        }
    }

    // 2. Fetch all user data
    const rulitUsers = await this.rulitRepo.getAllUsers();
    const processedUsers = rulitUsers.map(user => {
        const data = { ...user };
        if (data.trainingDate && typeof data.trainingDate.toDate === 'function') {
            data.trainingDate = data.trainingDate.toDate().toLocaleString('es-AR');
        }
        if (data.testDate && typeof data.testDate.toDate === 'function') {
            data.testDate = data.testDate.toDate().toLocaleString('es-AR');
        }
        return data;
    });

    // 3. Generate fields and export
    const fields = this._getFields();
    CsvExporter.exportJsonToCsv(processedUsers, fields, 'dataUsersRulit.csv');
  }

  private _getFields(): Array<string> {
    const STEPS = 15;
    const fields = [ 'userId', 'name', 'email', 'trainingDate', 'testDate', 'nextTest', 'graphAndSolutionCode' ];

    for (let i = 0; i < STEPS; i++) {
      fields.push(`stepErrors${SEPARATOR}${i}`);
    }

    for (let i = 0; i < this.shortMemMaxExercises; i++) {
      let prefix = `shortMemoryTest${SEPARATOR}${i}${SEPARATOR}`;
      fields.push(`${prefix}totalExerciseTime`, `${prefix}totalIncorrectMoves`, `${prefix}totalMoves`);
      let stepsPrefix = `${prefix}steps${SEPARATOR}`;
      for (let j = 0; j < STEPS; j++) {
        fields.push(`${stepsPrefix}${j}${SEPARATOR}elapsedTime`, `${stepsPrefix}${j}${SEPARATOR}incorrectMoves`);
      }
    }

    for (let i = 0; i < this.longMemMaxExercises; i++) {
      let prefix = `longMemoryTest${SEPARATOR}${i}${SEPARATOR}`;
      fields.push(`${prefix}totalExerciseTime`, `${prefix}totalIncorrectMoves`, `${prefix}totalMoves`);
      let stepsPrefix = `${prefix}steps${SEPARATOR}`;
      for (let j = 0; j < STEPS; j++) {
        fields.push(`${stepsPrefix}${j}${SEPARATOR}elapsedTime`, `${stepsPrefix}${j}${SEPARATOR}incorrectMoves`);
      }
    }

    return fields;
  }
  
}
