# Evaluation and Quality Checks

This document describes the methodology for evaluating the quality, safety, and reliability of the NeuroCalm application's outputs.

## Output Quality Checks

The primary measure of quality is the AI's ability to reduce cognitive load while preserving factual meaning. Each output is evaluated against the following criteria:

1.  **Meaning Preservation:** Does the structured output accurately reflect the core information and intent of the source material?
2.  **Clarity and Conciseness:** Is the output written in simple, direct language? Are sentences short and unambiguous?
3.  **Schema Adherence:** Does the generated JSON strictly conform to the `ProcessedText` schema defined in the `GeminiService`? Are all required fields present?
4.  **Instruction Following:** Does the output correctly reflect the user's chosen "Support Style" and "Explanation Level"? (e.g., Is a step-by-step list generated when requested?).

## Multimodal Accuracy Checks

For image and video inputs, accuracy is evaluated based on the AI's ability to interpret visual and auditory information correctly.

*   **Text Extraction (OCR):** How accurately is text from images (e.g., forms, screenshots) identified and transcribed?
*   **Structural Understanding:** Can the AI correctly identify the distinct sections of a form or the primary actions in a video?
*   **Contextual Relevance:** Is the generated summary relevant to the most important visual elements or spoken content?

## Bias Evaluation Approach

The goal is to ensure the application behaves fairly and impartially across a range of inputs.
*   **Test Suite:** A manual test suite is used, containing inputs with varied demographic information (names, cultural contexts) and topics.
*   **Evaluation Criteria:** Outputs are reviewed for any sign of stereotypes, biased assumptions, or judgmental language. The system should process a formal business request with the same neutral tone as an informal personal note.

## UX Safety Checks

User experience safety is critical. This involves verifying the application's guardrails and overall tone.

1.  **Crisis Guardrail Verification:** The system is tested with inputs containing crisis-related keywords to ensure the AI processing is correctly bypassed and the supportive redirection message is displayed.
2.  **Uncertainty Note Clarity:** When the AI reports uncertainty, the note is evaluated to ensure it is calm, clear, and non-alarming. It should state what is unclear without causing user anxiety.
3.  **Tone Consistency:** All outputs are reviewed to ensure they consistently adhere to the calm, respectful, and non-judgmental NeuroCalm persona.

## Known Limitations

*   **Client-Side API Key:** The current prototype architecture exposes the API key on the client side. This is not secure for a production environment.
*   **File Size Limits:** The browser-based `FileReader` has practical limits on the size of video files it can handle before performance degrades or the browser crashes. The Gemini API also has its own input token limits.
*   **Ambiguity in Source Material:** While the system can flag uncertainty, it cannot resolve deep ambiguity in the source content. A handwritten note that is truly illegible cannot be accurately transcribed.
*   **Nuance Preservation:** In the process of simplifying complex text, some subtle nuances of the original author's tone may be lost. The focus is on preserving factual meaning over stylistic nuance.
