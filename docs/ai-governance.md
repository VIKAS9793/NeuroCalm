# AI Governance and Safety Policy

This document defines the governance model, role boundaries, and safety principles for the AI integrated into NeuroCalm.

## AI Role Boundaries (NeuroCalm Persona)

The AI's persona is strictly defined as **NeuroCalm**, a calm, respectful, and neutral cognitive accessibility layer. Its behavior is governed by the system prompt embedded in the `GeminiService`.

**The AI's Mandate:**
*   To reduce cognitive load while preserving the factual meaning of the user's input.
*   To provide information in a structured, predictable, and clear format.
*   To use neutral, non-judgmental, and adult language.
*   To respect user agency by offering options, not commands or advice.

**Explicit Prohibitions:**
*   The AI must **never** offer medical or psychological advice.
*   It must **never** diagnose, label, classify, or assume user conditions or identities.
*   It must **never** use infantilizing, persuasive, or urgent language.
*   It must **never** invent information or override user judgment.

## Non-Diagnostic Guarantees

The application is explicitly positioned as a non-diagnostic tool. This is enforced through a combination of prompt engineering and output validation. The system prompt contains strict instructions to avoid medical concepts. All new features and prompt changes are reviewed to ensure they do not stray into diagnostic or therapeutic territory.

## Bias and Fairness Principles

The system is designed to be fair and unbiased by adhering to the following principles:
1.  **Neutral Language:** The AI is instructed to use universally clear and neutral language, avoiding cultural idioms, metaphors, or stereotypes.
2.  **Avoidance of Judgment:** The AI is forbidden from making moral or productivity-related judgments about the user's input or goals.
3.  **Grounded Responses:** The AI's transformations are grounded in the user-provided content. It is explicitly instructed not to add assumptions or external information that is not present in the source material.

## Hallucination Prevention

While no model can guarantee a complete absence of hallucinations, NeuroCalm mitigates this risk significantly through:
1.  **Schema-Driven Outputs:** By requiring the model to respond with strictly validated JSON, we constrain its creative freedom and force it to populate specific, fact-based fields. This drastically reduces the likelihood of narrative invention.
2.  **Grounded Prompts:** The AI's task is transformation, not creation. The prompt instructs it to work exclusively with the data provided by the user.
3.  **Temperature Setting:** `TODO:` The Gemini API call does not currently specify a `temperature`. For production, this should be set to a low value (e.g., `0.2`) to favor more deterministic and less "creative" outputs.

## Refusal and Uncertainty Handling

The AI demonstrates safety through its ability to handle ambiguity and sensitive topics gracefully.

1.  **Uncertainty-Aware Responses:** If the AI cannot confidently interpret a part of the input (e.g., blurry text in an image), it is required by its prompt and schema to populate the `uncertaintyNote` field. This transparency builds user trust by showing that the AI will not guess when it lacks sufficient information.
2.  **Crisis Content Refusal:** The application employs a client-side guardrail to detect keywords related to self-harm or severe crisis. Instead of sending this content to the AI, the system intervenes, pauses processing, and provides a supportive message with resources for professional help. This is a deliberate refusal to process potentially harmful content and a redirection to appropriate support channels.
