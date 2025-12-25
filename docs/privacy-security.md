# Privacy and Security Policy

This document details the privacy-first design and security posture of the NeuroCalm application.

## Data Minimization

The core principle of NeuroCalm's data handling is minimization. The application is architected to process only the data required to fulfill a user's request and to retain that data for the shortest possible duration.
*   **Input:** Only the content (text, image, or video) explicitly provided by the user for a single interaction is ever processed.
*   **State:** Application state (like selected style or input mode) is managed locally and is not associated with any user identity.

## Session-Only Processing

All user interactions with NeuroCalm are ephemeral and confined to the current browser session.
*   **No Data Storage:** The application has no database or server-side storage. User inputs and AI-generated outputs are never saved to disk or any persistent storage medium.
*   **In-Memory State:** All data exists only in the browser's RAM.
*   **Data Deletion:** Closing the browser tab or reloading the page completely and irrevocably destroys all data from the session.

## No Training on User Data

User privacy is paramount.
*   **API Usage Policy:** We rely on the enterprise-grade privacy commitments of the Google Gemini API, which state that data from API calls is not used for model training.
*   **No Internal Logging:** The NeuroCalm client application does not implement any logging or analytics that would capture user-provided content.

## Multimodal Consent Handling

For image and video inputs, user consent is handled implicitly and actively.
*   **Active User Action:** The user must perform an explicit action—such as using the file picker or dragging and dropping a file—to initiate a multimodal request.
*   **One-Time Use:** Each file is used for a single API transaction and is immediately discarded from memory after the base64 conversion and API call are complete. The file is not retained.

## Threat Model (High-Level)

As a client-side application, the primary security risks are centered on the browser environment and API key management.

*   **API Key Exposure:**
    *   **Risk:** The Gemini API key is necessarily present on the client side to be used. In this prototype, it is configured in a way that could be visible to a user inspecting the browser's source code or network traffic.
    *   **Mitigation (for a Production System):** In a production-grade version of this application, the direct client-side key would be replaced with a serverless function or a lightweight backend using the "Backend For Frontend" (BFF) pattern. The client would make a request to the BFF, which would securely hold the API key and proxy the request to the Gemini API. This would prevent the key from ever being exposed to the user's browser.

*   **Cross-Site Scripting (XSS):**
    *   **Risk:** An attacker could attempt to inject malicious scripts into the application.
    *   **Mitigation:** Angular provides built-in XSS protection and sanitization for content rendered in templates. By binding directly to DOM properties and avoiding methods like `innerHTML`, we leverage the framework's security features. All AI-generated content is treated as plain text and is not rendered as HTML.
