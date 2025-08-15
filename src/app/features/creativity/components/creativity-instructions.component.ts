import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { HeaderCreativityComponent } from 'src/app/layout/header-creativity/header-creativity.component';
import { CarouselComponent } from 'src/app/shared/ui/carousel.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';
import { CarouselItem } from 'src/app/shared/models/carousel-item.model';
import Swiper from 'swiper';
import { Element } from '../models/creativity.models';

@Component({
    selector: 'app-creativity-instructions',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeaderCreativityComponent,
        CarouselComponent,
        ...MATERIAL_IMPORTS,
    ],
    templateUrl: './creativity-instructions.component.html',
    styleUrls: ['./creativity-instructions.component.scss'],
})
export class CreativityInstructionsPage implements OnInit, AfterViewInit {
    mySwiper: Swiper;

    constructor(private readonly route: ActivatedRoute) { }

    elementFinal: Element;

    elementClip: Element = {
        id: 1,
        name: 'Clip',
        image: 'assets/images/clip.jpg',
        code: '312917',
    };
    elementJournal: Element = {
        id: 2,
        name: 'Diario',
        image: 'assets/images/diario.jpg',
        code: '1016221914112',
    };
    elementCup: Element = {
        id: 3,
        name: 'Vaso',
        image: 'assets/images/vaso.jpg',
        code: '32217',
    };

    boxObjects = [this.elementClip, this.elementJournal, this.elementCup];

    ngOnInit(): void {
        let auxCode = '';
        this.route.params.subscribe((params: Params) => {
            auxCode = params.code;
            this.elementFinal = this.detectCodeToObject(auxCode);
            localStorage.setItem('final-element', JSON.stringify(this.elementFinal));
        });
    }

    detectCodeToObject(code: string) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.boxObjects.length; i++) {
            const object = this.boxObjects[i];
            if (object.code === code) {
                return object;
            }
        }
    }

    ngAfterViewInit() {
        Swiper.use([]);

        this.mySwiper = new Swiper('.swiper-container', {
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    carouselItems: CarouselItem[] = [
        {
            "id": '1',
            "imageUrl": 'assets/images/instruction_1.png',
            "title": 'Bienvenido al test de creatividad',
            "description": `
          <p>En este test, se te presentará un objeto común y deberás pensar en tantos usos alternativos como sea posible.</p>
          <ul>
            <li>Piensa de manera creativa y fuera de lo común</li>
            <li>No hay respuestas correctas o incorrectas</li>
            <li>Cuanto más originales sean tus ideas, mejor</li>
          </ul>
        `
        },
        {
            "id": '2',
            "imageUrl": 'assets/images/instruction_2.png',
            "title": '¿Cómo funciona?',
            "description": `
          <ol>
            <li>Verás un objeto en pantalla</li>
            <li>Tendrás 2 minutos para pensar en usos alternativos</li>
            <li>Escribe cada idea en el campo de texto</li>
            <li>Presiona Enter o el botón "Agregar" para guardar cada idea</li>
          </ol>
          <p class="example">Ejemplo: Un clip puede usarse como gancho, como puntero, etc.</p>
        `
        },
        {
            "id": '3',
            "imageUrl": 'assets/images/instruction_3.png',
            "title": 'Consejos',
            "description": `
          <ul>
            <li>No te limites a los usos convencionales</li>
            <li>Combina ideas para crear usos innovadores</li>
            <li>Piensa en diferentes contextos y situaciones</li>
            <li>No te preocupes por lo práctico o realista que sea</li>
          </ul>
          <p>¡Tu imaginación es el límite!</p>
        `
        }
    ];


}
