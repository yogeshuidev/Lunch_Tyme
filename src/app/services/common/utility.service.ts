import { Injectable } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(
    private sanitizer: DomSanitizer) { }

  sanitizeImage(imageUrl: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(imageUrl);
  }
}
