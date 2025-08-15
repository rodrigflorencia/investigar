import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { HeaderRulitComponent } from '../../../layout/header-rulit/header-rulit.component';
import { CarouselComponent } from 'src/app/shared/ui/carousel.component'; // Updated import
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports'; // Updated import
import { RulitTestService } from '../services/rulit.test.service'; // Updated import

import Swiper from 'swiper';
import { CarouselItem } from 'src/app/shared/models/carousel-item.model';

@Component({
  selector: 'app-rulit-instructions-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderRulitComponent,
    CarouselComponent,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './rulit-instructions.component.html',
  styleUrls: ['./rulit-instructions.component.scss'],
})

export class RulitInstructionsPage implements OnInit, AfterViewInit {
  
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(RulitTestService);

  mySwiper: Swiper;

  ngOnInit(): void {
    // The logic for handling graphAndSolutionId is now in the service/store.
    // This component's only job is to show instructions and navigate.
    // If a solution code is passed in the URL, we can store it for the user-form page.
    const solutionCode = this.route.snapshot.paramMap.get('graphAndSolutionId');
    if (solutionCode) {
        this.store.rulitSolutionCodeUrl(solutionCode);
    }
  }

  onStart(): void {
    this.router.navigate(['/rulit/user-form']);
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      scrollbar: { el: '.swiper-scrollbar' },
    });
  }
  
  carouselItems: CarouselItem[] = [
     {
        "id": '1',
        "imageUrl": '/assets/videos/instructionRulit_1.gif',
        "title": 'Bienvenido al test de rulit',
        "description": `
          <p> Tu objetivo es <span class="highlight-text">encontrar un camino oculto tocando los
                                    círculos</span>
                                para descubrirlo hasta llegar al final. Con cada <span class="highlight-text">error
                                    volvés</span> al punto anterior.</p>
        `
      },
      {
        "id": '2',
        "imageUrl": '/assets/images/instructionRulit_2.png',
        "title": 'Indicaciones',
        "description": `
          <p >
                                Una vez que <span class="highlight-text">encuentres la salida, memoriza tu
                                    ruta</span>.
                                Deberás esforzarte por recordarla en los siguientes intentos.
                            </p>
        `
      },
      {
        "id": '3',
        "imageUrl": '/assets/images/instruction_4.png',
        "title": 'Consejos',
        "description": `
         <p >
                                Sigue las indicaciones y completa el nivel para avanzar.
                                ¡Buena suerte!
                            </p>
        `
      }
    ];

}
