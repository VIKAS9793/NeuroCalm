export interface ProcessedText {
  title: string;
  summary?: string;
  keyPoints: string[];
  requirements?: string[];
  steps?: { text: string; completed: boolean }[];
  nextStep?: string;
  uncertaintyNote?: string;
  explanation?: string;
}
