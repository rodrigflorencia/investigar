# Carousel Component

A reusable, accessible carousel component for Angular applications that supports dynamic content, keyboard navigation, and touch interactions.

## Features

- **Dynamic Content**: Easily display different sets of slides with images, titles, and descriptions
- **Keyboard Navigation**: Navigate using arrow keys, Home, and End keys
- **Accessible**: Follows WAI-ARIA best practices for screen readers
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Control navigation arrows, dots, and autoplay behavior
- **Touch Support**: Works on touch devices with swipe gestures

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { CarouselItem } from '../models/carousel-item.model';

@Component({
  selector: 'app-example',
  template: `
    <app-carousel 
      [items]="carouselItems"
      [showArrows]="true"
      [showDots]="true"
      [autoPlay]="false"
      [interval]="5000">
    </app-carousel>
  `
})
export class ExampleComponent {
  carouselItems: CarouselItem[] = [
    {
      imageUrl: 'path/to/image1.jpg',
      title: 'Slide 1',
      description: 'Description for slide 1'
    },
    {
      imageUrl: 'path/to/image2.jpg',
      title: 'Slide 2',
      description: 'Description for slide 2'
    }
  ];
}
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `CarouselItem[]` | `[]` | Array of carousel items to display |
| `showArrows` | `boolean` | `true` | Show/hide navigation arrows |
| `showDots` | `boolean` | `true` | Show/hide navigation dots |
| `autoPlay` | `boolean` | `false` | Enable/disable auto-play |
| `interval` | `number` | `5000` | Auto-play interval in milliseconds |

## CarouselItem Interface

```typescript
interface CarouselItem {
  imageUrl: string;
  title?: string;
  description?: string;
  [key: string]: any; // Additional custom properties
}
```

## Keyboard Navigation

- **Left/Right Arrows**: Navigate between slides
- **Home**: Go to first slide
- **End**: Go to last slide
- **Space/Enter**: Activate focused dot navigation

## Styling

The component uses BEM-like class naming and includes responsive styles. You can override the default styles by targeting the component's classes in your global styles or using Angular's `::ng-deep`.

## Accessibility

- ARIA roles and attributes for screen readers
- Keyboard navigation support
- Focus management
- High contrast support
- Screen reader announcements for slide changes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome for Android
