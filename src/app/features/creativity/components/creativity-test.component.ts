import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderCreativityComponent } from 'src/app/layout/header-creativity/header-creativity.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';
import { timer, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Element, CreativeUser, Clock } from '../models/creativity.models';
import { CreativityStore } from '../models/creativity.store';
import { CreativityRepo } from '../models/creativity.repo';

@Component({
  selector: 'app-creativity-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderCreativityComponent,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './creativity-test.component.html',
  styleUrls: ['./creativity-test.component.scss'],
})

export class CreativityTestPage implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(CreativityStore);
  private readonly repo = inject(CreativityRepo);

  // STATE
  started = false;
  countDown = 4;
  alertDesert = false;
  dateStart: Date;
  dateEnd: Date;
  
  // CLOCK
  totalTime = 5 * 60; // 5 minutes in seconds
  timeLeft = this.totalTime;
  timerSubscription: Subscription;
  clock: Clock = {
    seconds: this.totalTime,
    state: 'started',
    minutes: 4,
    limit: 0,
  };
  // ELEMENT from store
  element: Element | null = null;

  // PROPOSAL
  empty = '';
  finalProposals = [];
  proposals = '';
  
  user: CreativeUser | null = null;
  points = 0;
  minRandom = 0;
  maxRandom = 2;
  ngOnInit(): void {
    this.user = this.getUserFromStorage();
    this.element = this.store.selectedElement();

    if (!this.user || !this.element) {
      this.router.navigate(['/select-test']);
      return;
    }

    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  getUserFromStorage(): CreativeUser | null {
    const creativeUser = localStorage.getItem('creative-user');
    return creativeUser ? JSON.parse(creativeUser) : null;
  }

  startCountdown() {
    // Starts at 4, ticks immediately, so user sees 3, 2, 1
    this.timerSubscription = timer(0, 1000)
      .pipe(takeWhile(() => this.countDown > 1))
      .subscribe(() => {
        this.countDown--;
        if (this.countDown === 1) {
          setTimeout(() => {
            this.started = true;
            this.startTest();
          }, 1000);
        }
      });
  }

  startTest() {
    this.dateStart = new Date();
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = timer(0, 1000)
      .pipe(takeWhile(() => this.timeLeft > 0))
      .subscribe(() => {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.finalizedTest();
        }
      });
  }

  get minutesLeft(): number {
    return Math.floor(this.timeLeft / 60);
  }

  get secondsLeft(): number {
    return this.timeLeft % 60;
  }

  activeAlert() {
    this.alertDesert = !this.alertDesert;
  }
  validProposal(arrayProposal: string | any[], empty: any) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < arrayProposal.length; i++) {
      const proposal = arrayProposal[i];
      if (proposal !== empty) {
        this.finalProposals.push(proposal);
      }
    }
    return this.finalProposals;
  }

  async finalizedTest() {
    this.timerSubscription?.unsubscribe();
    this.dateEnd = new Date();

    const finalProposals = this.validProposal(this.proposals.split('\n').filter(p => p.trim() !== ''), this.empty);
    
    if (this.user && this.element) {
        const updatedUser: CreativeUser = {
            ...this.user,
            proposal: finalProposals,
            object: this.element.name,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
        };
        await this.repo.saveContact(updatedUser);
    }
    
    localStorage.removeItem('creative-user');
    this.store.clearState();
    // Aquí podría navegar a una página de agradecimiento
    // this.router.navigate(['/thank-you']);
  }
}