import { Component, Input, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CarouselItem } from '../models/carousel-item.model';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CommonModule, NgFor, NgIf],
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
    @Input() items: CarouselItem[] = [];
    @Input() showArrows = true;
    @Input() showDots = true;
    @Input() autoPlay = false;
    @Input() interval = 5000; // 5 seconds

    currentIndex = 0;
    private autoPlayInterval: any;
    private isPaused = false;

    constructor(private readonly sanitizer: DomSanitizer) { }

    @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

    ngAfterViewInit(): void {
        this.setupKeyboardNavigation();
        if (this.autoPlay && this.items.length > 1) {
            this.startAutoPlay();
        }
    }

    ngOnDestroy(): void {
        this.stopAutoPlay();
    }

    startAutoPlay(): void {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.next();
            }
        }, this.interval);
    }

    stopAutoPlay(): void {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    onMouseEnter(): void {
        if (this.autoPlay) {
            this.isPaused = true;
        }
    }

    onMouseLeave(): void {
        if (this.autoPlay) {
            this.isPaused = false;
        }
    }

    prev(): void {
        if (this.items.length <= 1) return;

        this.currentIndex = this.currentIndex === 0
            ? this.items.length - 1
            : this.currentIndex - 1;

        this.focusOnCurrentSlide();
    }

    next(): void {
        if (this.items.length <= 1) return;

        this.currentIndex = this.currentIndex === this.items.length - 1
            ? 0
            : this.currentIndex + 1;

        this.focusOnCurrentSlide();
    }

    goToSlide(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.currentIndex = index;
            this.focusOnCurrentSlide();
        }
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.items || this.items.length <= 1) return;

        switch (event.key) {
            case 'ArrowLeft':
                this.prev();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'ArrowRight':
                this.next();
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'Home':
                this.goToSlide(0);
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'End':
                this.goToSlide(this.items.length - 1);
                event.preventDefault();
                event.stopPropagation();
                break;
            case 'Tab':
                // Allow default tab behavior
                break;
            default:
                // Handle other key events if needed
                break;
        }
    }

    private setupKeyboardNavigation(): void {
        if (this.carouselContainer?.nativeElement) {
            this.carouselContainer.nativeElement.tabIndex = 0;
        }
    }

    private focusOnCurrentSlide(): void {
        if (!this.carouselContainer?.nativeElement) return;

        const slideElement = this.carouselContainer.nativeElement.querySelector(`#carousel-item-${this.currentIndex}`);
        if (slideElement instanceof HTMLElement) {
            slideElement.focus({ preventScroll: true });
        }
    }

    sanitizeHtml(html: string): SafeHtml {
        if (!html) return '';
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    onImageLoad(): void {
        // Image loaded successfully
        // You can add any image load handling logic here
    }

    onImageError(item: CarouselItem): void {
        console.error(`Failed to load image: ${item.imageUrl}`);
        // You can set a fallback image or handle the error as needed
        // item.imageUrl = 'assets/images/fallback-image.jpg';
    }

    // Add trackBy function for better performance with ngFor
    trackByFn(index: number, item: CarouselItem): string {
        // Use imageUrl and title for tracking since id might not exist
        return (item as any).id || `${index}-${item.title || ''}-${item.imageUrl || ''}`;
    }
}
