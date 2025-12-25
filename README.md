# NeuroCalm

## Product Overview

NeuroCalm is a cognitive accessibility layer designed to help people interact with complex information in calmer, clearer ways. It uses generative AI to transform potentially overwhelming text, images, or videos into structured, predictable, and easy-to-process formats. The application prioritizes user privacy and agency, operating on a session-only basis without storing any user data.

## Problem Statement

In a world saturated with information, individuals frequently encounter content that is dense, unstructured, or presented in a way that creates cognitive friction. This can lead to feelings of being overwhelmed, difficulty in identifying key actions, and challenges in processing essential information, whether it's a complex email, a confusing form, or an instructional video.

## Solution

NeuroCalm acts as an intermediary, taking user-provided content and reframing it for clarity. It leverages the Google Gemini model's advanced reasoning and multimodal understanding capabilities to analyze the input and generate a structured, schema-enforced output. This allows the user to engage with the same core information but in a format that is more predictable and less cognitively demanding.

![Product Vision: Transforming Information Overload into Structured Clarity](assets/product-vision-diagram.png "NeuroCalm's core value proposition")

## Core Principles

*   **Predictability:** The UI and AI outputs are deterministic and structured, eliminating layout variance and surprises.
*   **User Agency:** The user maintains full control over their inputs, the desired support style, and the level of detail in the output. The tool offers options, not commands.
*   **Privacy:** All processing is session-only. No user input is ever stored, saved, or used for training.
*   **Non-Diagnostic Stance:** NeuroCalm is a support tool, not a medical or diagnostic one. It does not label, classify, or make assumptions about users.

## How it Works: Core Logic Flow

The application follows a simple, privacy-preserving flow for every user interaction. It includes a critical safety guardrail to detect crisis language before any content is sent for AI processing.

![Core Logic Flow Diagram](assets/logic-flow-diagram.png "NeuroCalm's user input and processing flow")

## Key Capabilities (V1 + V2 Summary)

*   **Multimodal Input:** Processes text, images (e.g., screenshots, forms), and short videos.
*   **Structured Output:** Generates schema-driven content, including titles, key points, steps, and requirements.
*   **Uncertainty-Aware Responses:** Explicitly and calmly flags when information in the source material is ambiguous or unclear, rather than guessing.
*   **Adjustable Reasoning Depth:** Allows users to choose between a direct summary, a view of the AI's reasoning steps, or an explanation of why the output is helpful.
*   **Crisis Detection Guardrail:** Identifies language indicating severe distress and provides supportive redirection.

## Architecture at a Glance

NeuroCalm is a fully client-side application with no backend or database. This stateless design is a core part of its privacy-first commitment, ensuring no user data is ever stored.

![Stateless Client-Side Architecture Diagram](assets/architecture-diagram.png "NeuroCalm's stateless, browser-only architecture")

## Why Gemini

NeuroCalm is built on the Gemini family of models to leverage its core strengths in:

*   **Advanced Reasoning:** The ability to understand context, follow complex instructions, and decompose information logically.
*   **Native Multimodality:** Seamlessly processing combinations of text, images, and video in a single prompt.
*   **Schema-Driven Structured Outputs:** Reliably generating valid JSON that conforms to a strict schema, enabling predictable and robust UI rendering.

## Ethical Positioning

NeuroCalm is:

*   A cognitive accessibility layer.
*   A tool for reducing cognitive load.
*   A privacy-first, session-only utility.

NeuroCalm is not:

*   A medical device or diagnostic tool.
*   A mental health application.
*   A replacement for professional advice.
*   A tool that tracks, profiles, or stores user data.

## Repository Structure

This repository contains the full source code for the NeuroCalm application. All technical documentation, including setup, architecture, and governance policies, is located in the `/docs` directory.

## Status

This application is a functional prototype developed to demonstrate research-driven principles in AI-powered cognitive support. It is not intended for production use without further hardening and review.