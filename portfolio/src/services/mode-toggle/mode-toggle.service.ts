import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {
  MODE_STORAGE_SERVICE,
  ModeStorage,
} from '../mode-storage/mode-storage.service';
import { Mode } from './mode-toggle.model';

@Injectable()
export class ModeToggleService {
  private currentMode: Mode = Mode.DARK;
  private modeChangedSubject = new BehaviorSubject<Mode>(this.currentMode);
  modeChanged$: Observable<Mode> = this.modeChangedSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(MODE_STORAGE_SERVICE) private modeStorage: ModeStorage,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platformId
  ) {
    this.init();
  }

  private updateCurrentMode(mode: Mode): void {
    this.currentMode = mode;
    this.modeChangedSubject.next(mode);

    if (isPlatformBrowser(this.platformId)) {
      // Persist mode to storage if running in the browser
      this.modeStorage.save(mode);
    } else {
      console.warn(
        'localStorage is not available. Mode will not be persisted.'
      );
    }
  }

  private init(): void {
    if (isPlatformBrowser(this.platformId)) {
      const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
      let initMode = this.modeStorage.get();
      if (!initMode) {
        initMode = Mode.DARK;
      }
      this.applyMode(initMode);
    } else {
      console.warn('Window object is not available. Defaulting to DARK mode.');
      this.applyMode(Mode.DARK);
    }
  }

  toggleMode(): void {
    const newMode = this.currentMode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT;
    this.applyMode(newMode);
  }

  private applyMode(mode: Mode): void {
    this.document.body.classList.remove(Mode.LIGHT, Mode.DARK);
    this.document.body.classList.add(mode);
    this.updateCurrentMode(mode);
  }
}
