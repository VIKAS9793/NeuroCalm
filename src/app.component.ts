
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiService } from './services/gemini.service';
import { ProcessedText } from './models/processed-text.model';
import { OutputDisplayComponent } from './components/output-display/output-display.component';

interface SupportStyle {
  id: string;
  label: string;
  description: string;
}

interface ExplanationLevel {
  id: 'short' | 'reasoning' | 'why';
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, OutputDisplayComponent],
})
export class AppComponent {
  private geminiService = inject(GeminiService);

  inputMode = signal<'text' | 'image' | 'video'>('text');
  userInput = signal('');
  
  uploadedImage = signal<File | null>(null);
  imagePreviewUrl = signal<string | null>(null);

  uploadedVideo = signal<File | null>(null);
  videoPreviewUrl = signal<string | null>(null);

  isDragging = signal(false);

  selectedStyle = signal('Make this easier to process');
  explanationLevel = signal<'short' | 'reasoning' | 'why'>('short');

  processedOutput = signal<ProcessedText | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  isApiKeyConfigured = signal(this.geminiService.isConfigured());
  isCrisisDetected = signal(false);

  supportStyles: SupportStyle[] = [
    { id: 'Make this easier to process', label: 'Make this easier to process', description: 'Simplifies complex ideas into key points.' },
    { id: 'One step at a time', label: 'One step at a time', description: 'Creates clear, actionable checklists.' },
    { id: 'Clear and literal', label: 'Clear and literal', description: 'Uses direct, unambiguous language.' },
    { id: 'Calm and reassuring', label: 'Calm and reassuring', description: 'Offers a gentle, supportive tone.' },
  ];

  explanationLevels: ExplanationLevel[] = [
    { id: 'short', label: 'Keep it short' },
    { id: 'reasoning', label: 'Show reasoning steps' },
    { id: 'why', label: 'Explain why' },
  ];

  canProcess = computed(() => {
    if (this.isLoading()) return false;
    switch (this.inputMode()) {
      case 'text':
        return this.userInput().trim().length > 0;
      case 'image':
        return !!this.uploadedImage();
      case 'video':
        return !!this.uploadedVideo();
      default:
        return false;
    }
  });
  
  private crisisPatterns = [
    'want to hurt myself', 'thinking about ending', 'wish i wasn\'t here',
    'can\'t take this anymore', 'everything is falling apart', 'no point in trying',
    'kill myself', 'suicide'
  ];

  private checkForCrisis(text: string): boolean {
    const lowerCaseText = text.toLowerCase();
    return this.crisisPatterns.some(pattern => lowerCaseText.includes(pattern));
  }

  async processInput(): Promise<void> {
    if (!this.canProcess()) return;
    
    if (this.checkForCrisis(this.userInput())) {
      this.isCrisisDetected.set(true);
      this.isLoading.set(false);
      this.processedOutput.set(null);
      this.error.set(null);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.processedOutput.set(null);
    this.isCrisisDetected.set(false);

    try {
      let result: ProcessedText;
      const mode = this.inputMode();
      const style = this.selectedStyle();
      const explanation = this.explanationLevel();

      if (mode === 'text') {
        result = await this.geminiService.processText(this.userInput(), style, explanation);
      } else if (mode === 'image' && this.uploadedImage()) {
        result = await this.geminiService.processImage(this.uploadedImage()!, this.userInput(), style, explanation);
      } else if (mode === 'video' && this.uploadedVideo()) {
        result = await this.geminiService.processVideo(this.uploadedVideo()!, this.userInput(), style, explanation);
      } else {
        throw new Error('Invalid input state.');
      }
      this.processedOutput.set(result);
    } catch (e: any) {
      this.error.set(e.message || 'An unknown error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }

  reset(): void {
    this.userInput.set('');
    this.processedOutput.set(null);
    this.error.set(null);
    this.isLoading.set(false);
    this.selectedStyle.set('Make this easier to process');
    this.explanationLevel.set('short');
    this.isCrisisDetected.set(false);
    this.inputMode.set('text');
    this.uploadedImage.set(null);
    this.imagePreviewUrl.set(null);
    this.uploadedVideo.set(null);
    this.videoPreviewUrl.set(null);
  }

  selectStyle(styleId: string): void {
    this.selectedStyle.set(styleId);
  }

  setInputMode(mode: 'text' | 'image' | 'video'): void {
    if (this.isLoading()) return;
    this.inputMode.set(mode);
    this.error.set(null);
    this.processedOutput.set(null);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    this.error.set(null);
    this.processedOutput.set(null);

    if (file.type.startsWith('image/')) {
      this.setInputMode('image');
      this.uploadedImage.set(file);
      const reader = new FileReader();
      reader.onload = (e) => this.imagePreviewUrl.set(e.target?.result as string);
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      this.setInputMode('video');
      this.uploadedVideo.set(file);
      const reader = new FileReader();
      reader.onload = (e) => this.videoPreviewUrl.set(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      this.error.set('Please upload a valid image or video file.');
    }
  }

  removeImage(): void {
    this.uploadedImage.set(null);
    this.imagePreviewUrl.set(null);
    this.processedOutput.set(null);
  }
  
  removeVideo(): void {
    this.uploadedVideo.set(null);
    this.videoPreviewUrl.set(null);
    this.processedOutput.set(null);
  }

  // --- Drag and Drop Handlers ---
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files[0]) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }
}
