
import { Component, ChangeDetectionStrategy, input, signal, WritableSignal, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessedText } from '../../models/processed-text.model';

@Component({
  selector: 'app-output-display',
  templateUrl: './output-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class OutputDisplayComponent implements OnDestroy {
  data = input.required<ProcessedText | null>();
  copyButtonText = signal('Copy to clipboard');
  playbackState = signal<'stopped' | 'playing' | 'paused'>('stopped');
  
  private readonly availableRates = [0.7, 0.9, 1.1, 1.3];
  playbackRate = signal(0.9);
  
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    effect(() => {
      // When new data is received, cancel any ongoing speech from the previous output.
      this.data();
      this.cancelAudio();
    });
  }

  ngOnDestroy() {
    this.cancelAudio();
  }

  toggleStep(index: number) {
    // This is a visual-only toggle for the demo, as the component does not own the state.
    const stepLabel = document.getElementById(`step-label-${index}`);
    stepLabel?.classList.toggle('line-through');
    stepLabel?.classList.toggle('text-slate-500');
  }

  copyToClipboard() {
    const output = this.data();
    if (!output) return;

    let textToCopy = ``;
    if (output.uncertaintyNote) {
      textToCopy += `NOTE: ${output.uncertaintyNote}\n\n`;
    }
    textToCopy += `${output.title}\n\n`;
    if(output.summary) textToCopy += `${output.summary}\n\n`;

    if (output.explanation) {
      textToCopy += `EXPLANATION\n${output.explanation}\n\n`;
    }

    textToCopy += 'KEY POINTS\n';
    output.keyPoints.forEach(p => textToCopy += `- ${p}\n`);
    textToCopy += '\n';

    if (output.requirements && output.requirements.length > 0) {
      textToCopy += 'REQUIREMENTS\n';
      output.requirements.forEach(r => textToCopy += `- ${r}\n`);
      textToCopy += '\n';
    }

    if (output.steps && output.steps.length > 0) {
      textToCopy += 'STEP-BY-STEP\n';
      output.steps.forEach(s => textToCopy += `◻️ ${s.text}\n`);
      textToCopy += '\n';
    }

    if (output.nextStep) {
      textToCopy += 'OPTIONAL NEXT STEP\n';
      textToCopy += `${output.nextStep}\n`;
    }

    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
      this.copyButtonText.set('Copied!');
      setTimeout(() => this.copyButtonText.set('Copy to clipboard'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      this.copyButtonText.set('Failed to copy');
       setTimeout(() => this.copyButtonText.set('Copy to clipboard'), 2000);
    });
  }

  toggleAudio() {
    const state = this.playbackState();
    if (state === 'playing') {
      window.speechSynthesis.pause();
    } else if (state === 'paused') {
      window.speechSynthesis.resume();
    } else {
      this.speak();
    }
  }

  changePlaybackRate() {
    const currentRate = this.playbackRate();
    const currentIndex = this.availableRates.indexOf(currentRate);
    const nextIndex = (currentIndex + 1) % this.availableRates.length;
    this.playbackRate.set(this.availableRates[nextIndex]);

    // If currently speaking, restart with the new rate
    if (this.playbackState() !== 'stopped') {
      this.speak();
    }
  }

  private speak() {
    const output = this.data();
    if (!output || !window.speechSynthesis) return;
    
    this.cancelAudio(); // Ensure any previous speech is stopped

    let textToSpeak = ``;
    if (output.uncertaintyNote) {
      textToSpeak += `Please note: ${output.uncertaintyNote}. `;
    }
    textToSpeak += `${output.title}. `;
    if(output.summary) textToSpeak += `${output.summary}. `;
    if (output.explanation) {
      textToSpeak += `Explanation: ${output.explanation}. `;
    }
    textToSpeak += `Key Points: ${output.keyPoints.join('. ')}. `;
    if (output.requirements && output.requirements.length > 0) {
      textToSpeak += `Requirements: ${output.requirements.join('. ')}. `;
    }
    if (output.steps && output.steps.length > 0) {
      textToSpeak += `Steps: ${output.steps.map(s => s.text).join('. ')}. `;
    }
    if (output.nextStep) {
      textToSpeak += `Optional Next Step: ${output.nextStep}.`;
    }

    this.utterance = new SpeechSynthesisUtterance(textToSpeak);
    this.utterance.rate = this.playbackRate();
    this.utterance.pitch = 1;

    this.utterance.onstart = () => this.playbackState.set('playing');
    this.utterance.onpause = () => this.playbackState.set('paused');
    this.utterance.onresume = () => this.playbackState.set('playing');
    this.utterance.onend = () => this.playbackState.set('stopped');
    this.utterance.onerror = () => this.playbackState.set('stopped');

    window.speechSynthesis.speak(this.utterance);
  }

  private cancelAudio() {
    if (this.utterance) {
      this.utterance.onstart = null;
      this.utterance.onpause = null;
      this.utterance.onresume = null;
      this.utterance.onend = null;
      this.utterance.onerror = null;
    }
    if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) {
      window.speechSynthesis.cancel();
    }
    this.playbackState.set('stopped');
  }
}
