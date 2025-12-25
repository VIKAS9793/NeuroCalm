
import { Injectable } from '@angular/core';
import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
import { ProcessedText } from '../models/processed-text.model';

// This is a placeholder for the environment variable.
// In a real Applet environment, this would be configured securely.
declare const process: any;

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private readonly apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';

  constructor() {
    if (this.apiKey) {
      this.ai = new GoogleGenAI({ apiKey: this.apiKey });
    } else {
      console.error('API key not found.');
    }
  }

  isConfigured(): boolean {
    return !!this.ai;
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }
  
  private readonly responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A neutral, descriptive title for the content (no emotional words)."
        },
        summary: {
          type: Type.STRING,
          description: "Optional. A brief, one-sentence summary of what the content or image is. (e.g., 'This is a registration form')."
        },
        keyPoints: {
          type: Type.ARRAY,
          description: "The main points, sections, or fields identified in the content.",
          items: { type: Type.STRING }
        },
        requirements: {
          type: Type.ARRAY,
          description: "Optional. A list of things the user might need, as explicitly mentioned in the content (e.g., 'ID details', 'Address proof').",
          items: { type: Type.STRING }
        },
        steps: {
          type: Type.ARRAY,
          description: "Optional. Clear, single-action steps if the content is instructional.",
          items: { 
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              completed: { type: Type.BOOLEAN, description: "Default to false." }
            }
          }
        },
        nextStep: {
          type: Type.STRING,
          description: "Optional. One gentle, low-pressure suggestion for a next action, framed as 'You may choose to...'"
        },
        uncertaintyNote: {
          type: Type.STRING,
          description: "If you cannot fully or confidently interpret a part of the input (e.g., blurry text, ambiguous handwriting), provide a brief, neutral description of what is unclear here. If you are confident, leave this field empty."
        },
        explanation: {
          type: Type.STRING,
          description: "Optional. A user-facing explanation of your reasoning process or why the output format is helpful, based on the user's selected 'Explanation Level'. Keep it brief and encouraging. Omit if the level is 'short'."
        }
      },
      required: ["title", "keyPoints"]
  };

  private getSystemPrompt(baseInstruction: string, styleModifier: string, explanationModifier: string, userText: string): string {
    return `
      System Prompt (Fixed – Non-Editable)
      You are NeuroCalm. Your role is to reduce cognitive load while preserving meaning. You support clarity, not correction. You do not diagnose, label, or assume user conditions.
      You:
      - Use calm, respectful, adult language
      - Present information in structured formats
      - Avoid urgency, judgment, or persuasion
      - Preserve user agency at all times
      - Explicitly flag uncertainty. If parts of an input are unclear, ambiguous, or unreadable, you must state this neutrally in the 'uncertaintyNote' field and avoid guessing.
      You do not:
      - Offer medical or psychological advice
      - Reference disorders unless the user explicitly does
      - Simplify beyond what the user asked for

      Task Prompt (Dynamic – Based on User Selection)

      Base Instruction:
      ${baseInstruction}

      Constraints:
      - Preserve original meaning and intent
      - Use clear, literal language
      - Avoid metaphors and idioms
      - Use structured output
      - Do not add assumptions or advice

      Style Modifier:
      ${styleModifier}

      Explanation Level:
      ${explanationModifier}
      
      User's text input to process or use as context:
      ---
      ${userText}
      ---
    `;
  }

  async processText(userInput: string, style: string, explanationLevel: string): Promise<ProcessedText> {
    if (!this.ai) throw new Error('Gemini AI client is not initialized.');

    const styleModifier = this.getStyleInstruction(style);
    const explanationModifier = this.getExplanationInstruction(explanationLevel);
    const baseInstruction = 'Transform the following content to be easier to process.';
    const internalPrompt = this.getSystemPrompt(baseInstruction, styleModifier, explanationModifier, userInput);

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: internalPrompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: this.responseSchema,
        },
      });

      return this.parseAndPrepareOutput(response);
    } catch (error) {
      console.error('Error processing text with Gemini API:', error);
      throw new Error('Failed to process the text. Please check the input and try again.');
    }
  }

  async processImage(image: File, userInput: string, style: string, explanationLevel: string): Promise<ProcessedText> {
    if (!this.ai) throw new Error('Gemini AI client is not initialized.');

    const base64Image = await this.fileToBase64(image);
    const styleModifier = this.getStyleInstruction(style);
    const explanationModifier = this.getExplanationInstruction(explanationLevel);
    const baseInstruction = `Analyze the provided image and transform its content to be easier to process. Interpret it literally. Extract visible text, identify the main sections, explain its structure, and list any requirements mentioned. Do not infer emotion, intent, or urgency. If the user provides an additional text prompt, use it to focus your analysis.`;
    const textPrompt = this.getSystemPrompt(baseInstruction, styleModifier, explanationModifier, userInput);

    const imagePart = {
      inlineData: {
        mimeType: image.type,
        data: base64Image,
      },
    };

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: textPrompt }] },
        config: {
          responseMimeType: 'application/json',
          responseSchema: this.responseSchema,
        },
      });

      return this.parseAndPrepareOutput(response);
    } catch (error) {
      console.error('Error processing image with Gemini API:', error);
      throw new Error('Failed to process the image. Please try another image or check the input.');
    }
  }

  async processVideo(video: File, userInput: string, style: string, explanationLevel: string): Promise<ProcessedText> {
    if (!this.ai) throw new Error('Gemini AI client is not initialized.');

    const base64Video = await this.fileToBase64(video);
    const styleModifier = this.getStyleInstruction(style);
    const explanationModifier = this.getExplanationInstruction(explanationLevel);
    const baseInstruction = `Analyze the provided video and transform its content into a structured summary or a step-by-step guide. Focus on the main actions, spoken words, and visual cues to create a clear, easy-to-process output. Do not infer emotion, intent, or urgency. If the user provides an additional text prompt, use it to focus your analysis (e.g., 'summarize the key decision' or 'list the ingredients mentioned').`;
    const textPrompt = this.getSystemPrompt(baseInstruction, styleModifier, explanationModifier, userInput);

    const videoPart = {
      inlineData: {
        mimeType: video.type,
        data: base64Video,
      },
    };

    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [videoPart, { text: textPrompt }] },
        config: {
          responseMimeType: 'application/json',
          responseSchema: this.responseSchema,
        },
      });

      return this.parseAndPrepareOutput(response);
    } catch (error) {
      console.error('Error processing video with Gemini API:', error);
      throw new Error('Failed to process the video. The file may be too large or in an unsupported format.');
    }
  }

  private parseAndPrepareOutput(response: GenerateContentResponse): ProcessedText {
    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString) as ProcessedText;

    if (parsed.steps) {
      parsed.steps = parsed.steps.map(step => ({ ...step, completed: false }));
    }
    return parsed;
  }

  private getStyleInstruction(style: string): string {
    switch (style) {
      case 'One step at a time':
        return '- Break into sequential steps\n- One action per step\n- No combined instructions';
      case 'Clear and literal':
        return '- Avoid figurative language\n- Explain terms briefly if needed\n- Use concrete wording';
      case 'Calm and reassuring':
        return '- Use neutral, steady tone\n- Avoid urgency words (now, immediately, must)\n- Acknowledge complexity without emotional framing';
      case 'Make this easier to process':
      default:
        return '- Summarize into 4–6 key points\n- Use short sentences\n- Remove non-essential detail';
    }
  }

  private getExplanationInstruction(level: string): string {
    switch (level) {
      case 'reasoning':
        return "Include a brief, user-friendly section in the 'explanation' field that outlines the logical steps you took to arrive at the answer (e.g., 'First, I identified the main topic...').";
      case 'why':
        return "Include a brief, user-friendly section in the 'explanation' field that explains *why* the structured output is helpful for clarity (e.g., 'Breaking this down into steps can make the process feel more manageable.').";
      case 'short':
      default:
        return "Provide the direct answer or transformation. Do not include meta-commentary about your reasoning process. The 'explanation' field should be empty.";
    }
  }
}
