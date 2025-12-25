# Setup and Local Run Instructions

This document provides instructions for setting up and running the NeuroCalm application locally for development and testing.

## Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Safari).
*   A valid Google Gemini API key.
*   A local web server to serve the project files.

The project dependencies (like Angular and RxJS) are loaded via an `importmap` in `index.html`, so a Node.js or `npm install` workflow is not required to run the application.

## Gemini API Key Configuration

The application requires a Gemini API key to function. The key must be provided as an environment variable that is accessible to the browser at runtime.

1.  **Obtain a Key:** Get your API key from Google AI Studio.
2.  **Make the Key Available:** The `GeminiService` is coded to look for the key at `process.env.API_KEY`. In a browser-based application without a Node.js backend, `process.env` does not exist by default. For local development, you will need to simulate this. One common way is to include a small script in `index.html` **before** the main application script.

    **Example (for local development only):**
    Add this script tag inside the `<head>` of `index.html`:
    ```html
    <script>
      var process = {
        env: {
          API_KEY: 'YOUR_GEMINI_API_KEY_HERE'
        }
      };
    </script>
    ```

    **IMPORTANT:** This method is for local development only. Do **not** commit your API key to source control. In a production deployment, this key should be managed securely, for instance by being injected by a CI/CD pipeline or served from a secure backend endpoint.

## Local Run Instructions

1.  Clone the repository to your local machine.
2.  Ensure your Gemini API key is configured as described above.
3.  Serve the project's root directory using a local web server. A simple option is the `http-server` npm package:

    ```bash
    # Install the server globally if you haven't already
    npm install -g http-server

    # Navigate to the project's root directory
    cd path/to/neurocalm

    # Start the server
    http-server
    ```
4.  Open your web browser and navigate to the local address provided by the server (e.g., `http://127.0.0.1:8080`).

## Common Setup Errors

*   **"Configuration Error" message in the UI:** This means the `GeminiService` could not find the API key at `process.env.API_KEY`. Verify that your configuration script in `index.html` is correct and loads before the application's main script.
*   **CORS errors in the browser console:** This can happen if you open `index.html` directly from the filesystem (`file://...`). You must serve the files from a local web server to avoid cross-origin policy issues when the application makes requests.
