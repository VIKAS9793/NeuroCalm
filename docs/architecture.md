# NeuroCalm System Architecture

This document outlines the technical architecture of the NeuroCalm application.

## High-Level Architecture Overview

NeuroCalm is a client-side, single-page application (SPA) built with Angular. It has no backend server or database, making it fully stateless. All logic, including user interaction and communication with the Google Gemini API, is handled directly in the browser. This design inherently supports the project's privacy-first principles, as no user data ever leaves the user's local session.

The architecture is centered around three core concepts:
1.  A reactive UI for managing user input and application state.
2.  A dedicated service layer to encapsulate all interactions with the Gemini API.
3.  Strict, schema-driven data models to ensure predictable and safe rendering of AI-generated content.

*(See `docs/diagrams/architecture.mmd` for a component diagram.)*

## Component Breakdown

### UI Layer (`AppComponent` and child components)
*   **Framework:** Angular (Standalone Components, Zoneless).
*   **State Management:** Utilizes Angular Signals for reactive and granular state management (`userInput`, `isLoading`, `processedOutput`, etc.).
*   **Responsibilities:**
    *   Renders the main user interface for text, image, and video input.
    *   Manages user controls for selecting support styles and explanation levels.
    *   Handles file uploads and drag-and-drop events.
    *   Delegates processing tasks to the `GeminiService`.
    *   Displays the structured output, error messages, or loading indicators.

### Gemini Interaction Layer (`GeminiService`)
*   **Responsibilities:**
    *   Initializes the Gemini AI client with the provided API key.
    *   Acts as the sole point of contact with the Gemini API.
    *   Constructs the detailed system and user prompts based on user input and selected options.
    *   Enforces a strict response schema for all API calls to ensure the AI returns predictable JSON.
    *   Handles the conversion of file inputs (images, videos) to base64 for multimodal prompts.
    *   Contains the logic for parsing the API response and mapping it to the `ProcessedText` data model.

### Safety & Guardrails
*   **Crisis Detection:** A client-side check (`checkForCrisis` method in `AppComponent`) scans text input for high-risk keywords. If detected, it bypasses the AI and displays a supportive redirection message.
*   **Uncertainty Handling:** The system prompt explicitly instructs the Gemini model to report any ambiguity in the source material. This is captured in the `uncertaintyNote` field of the response schema and displayed clearly to the user.

*(See `docs/diagrams/data-flow.mmd` for a data flow visualization.)*

## Multimodal Processing Flow

Processing non-text inputs follows a clear, client-side flow:
1.  The user uploads an image or video file.
2.  The `AppComponent` captures the `File` object.
3.  The file is passed to the `GeminiService`.
4.  The service uses a `FileReader` to asynchronously convert the file into a base64-encoded string.
5.  This string is included as an `inlineData` part in the `generateContent` request to the Gemini API, alongside the text prompt.
6.  The Gemini model processes the multimodal input and returns a structured JSON response.

*(See `docs/diagrams/multimodal-flow.mmd` for a detailed flow diagram.)*

## Stateless Design Explanation

The application's stateless nature is a core architectural decision reinforcing its privacy-first stance.
*   **No Server:** There is no proprietary backend. The application is a set of static files (HTML, TS/JS, CSS) served to the browser.
*   **No Database:** No user data, inputs, or outputs are ever stored or logged.
*   **Session-Only:** All application state exists only in the browser's memory. Reloading the page or closing the tab permanently erases the session, leaving no trace of the interaction.

## Scalability & Extensibility

*   **Scalability:** As a client-side application, scalability is primarily determined by the user's browser and the rate limits of the Gemini API. The frontend itself can be served to any number of users via a simple static file host or CDN.
*   **Extensibility:** The architecture is designed for extensibility. Adding a new support style or explanation level is a minor change in the `AppComponent` and `GeminiService`. Adding new output fields requires updating the `ProcessedText` model, the Gemini response schema, and the output display component.
