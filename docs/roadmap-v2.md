# NeuroCalm V2 Roadmap

This document outlines the future development vision for NeuroCalm, focusing on features that deepen user agency, trust, and clarity. The features are based on research-driven needs for cognitive accessibility.

## V2 Vision

The vision for V2 is to evolve NeuroCalm from a powerful transformation tool into a more adaptive cognitive partner. This means giving users more fine-grained control over their outputs and equipping the AI with a deeper understanding of context, comparison, and consistency, all while strengthening the core principles of privacy and user agency.

---

## Phase 1: Enhanced Control & Trust (Complete)

This phase focused on establishing a baseline of user trust and control beyond the initial MVP.

*   **✅ Uncertainty-Aware Responses:** The AI explicitly flags when it's unsure about parts of an input, preventing guessing and building user trust.
*   **✅ User-Adjustable Reasoning Depth:** Users can select how much detail they want, from a direct answer to a full explanation of the AI's reasoning, supporting different processing needs.

---

## Phase 2: Contextual & Comparative Understanding

This phase will focus on capabilities that help users understand information in relation to other information, a common source of cognitive load.

*   **Temporal Awareness:**
    *   **Goal:** Decompose inputs with time-based sequences (schedules, deadlines, multi-day instructions) into a clear, chronological order.
    *   **Rationale:** Helps with planning and reduces the overwhelm of time-sensitive tasks without adding time pressure.

*   **Comparison & Difference Explanation:**
    *   **Goal:** Allow a user to provide two related pieces of text (e.g., two versions of a policy) and have the AI calmly highlight what has changed and what has stayed the same.
    *   **Rationale:** Directly addresses the stress and cognitive friction caused by changes in familiar information.

*   **User-Authored Constraints:**
    *   **Goal:** Allow users to add temporary, session-only instructions (e.g., "Always use single-sentence bullet points," "Avoid using the word 'deadline'").
    *   **Rationale:** Increases user agency and allows for soft personalization without privacy-invasive profiling.

---

## Phase 3: Advanced Validation & Scoping

This phase will introduce advanced features for validating information consistency and reinforcing the AI's role boundaries.

*   **Multimodal Consistency Checks:**
    *   **Goal:** Enable the AI to compare two different modalities (e.g., an image of a diagram and text describing it) and flag any mismatches or confirm their consistency.
    *   **Rationale:** Addresses real-world confusion where instructions or visual aids are contradictory.

*   **Self-Limiting AI Behavior:**
    *   **Goal:** Enhance the AI's ability to gracefully decline out-of-scope requests. Instead of attempting a poor-quality answer, it would calmly state, "Explaining financial projections is outside my role as a clarity tool."
    *   **Rationale:** Reinforces the AI's reliability and prevents it from over-extending into areas where it cannot provide safe or accurate support.

*   **Multi-Step Task Preview:**
    *   **Goal:** When faced with a large task, the AI can provide a high-level preview (e.g., "This process has 5 steps. Only Step 1 is needed to get started.") without executing anything.
    *   **Rationale:** Helps combat decision paralysis and task-initiation overwhelm by showing the whole picture but focusing on the immediate next action.

## Explicitly Out of Scope

To maintain its core mission, NeuroCalm will **not** include:
*   User accounts, profiles, or long-term memory.
*   Proactive notifications, reminders, or task management.
*   Automated task execution.
*   Social features or data sharing.
*   Any form of content generation that is not a direct transformation of user-provided input.
