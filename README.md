# MyEco System — Modular Environmental Monitoring Platform

## Project Overview
**MyEco System** is a modular software suite designed to simulate, process, and visualize environmental data such as CO2 levels, temperature, and humidity. The architecture separates core business logic into a reusable library (`eco-lib`) that serves both a Node.js console application (`eco-app`) and an interactive web dashboard (`eco-web`).

## Project Architecture

### 1. eco-lib (Core Logic)
The foundational library containing all algorithms and data structures used across the system.
* **generators.js**: Implements infinite sensor data generation using ES6 Generators (`function*`).
* **iterators.js**: Provides a `limitTime` utility to consume asynchronous data streams with a time-based cutoff.
* **utils.js**: Features an advanced memoization function with **TTL (Time To Live)** and cache size limits to optimize performance.
* **queue.js**: A custom `SensorQueue` class for bi-directional priority management, ensuring critical alerts are processed first.
* **async-logic.js**: Implements asynchronous array mapping (`mapAsync`) with built-in support for `AbortSignal` cancellation and robust error handling.
* **streams.js**: Uses asynchronous generators to process large-scale sensor logs incrementally, ensuring low memory consumption.
* **index.js**: The library's main entry point, aggregating and exporting all modules for unified access.

### 2. eco-app (Node.js Application)
A command-line monitoring tool that integrates the library's core features.
* **main.js**: Demonstrates the full lifecycle of sensor monitoring, including data generation, status evaluation via memoization, and stream processing.
* **package.json**: Manages dependencies and links the local `eco-lib` for server-side execution.

### 3. eco-web (Web Dashboard)
A modern, browser-based interface for real-time visualization.
* **index.html**: The SPA (Single Page Application) structure featuring a modular layout for the Dashboard, Sensors, and History views.
* **lib-bridge.js**: A dedicated "bridge" script that adapts the Node.js modules for browser use, exposing the library via the global `window.EcoLib` object.
* **web-app.js**: The frontend controller that handles UI interactions, manages the real-time sensor update loop, and populates the alert queue.
* **css/**: A collection of modular stylesheets (`base.css`, `layout.css`, `sensors.css`, etc.) providing a responsive dark-themed UI.

## Technical Highlights
* **Resource Optimization**: Generators and Async Streams handle continuous data without high RAM usage.
* **Performance**: Memoization prevents redundant calculations for stable sensor readings.
* **Priority-Driven UI**: The priority queue ensures that critical CO2 alerts are immediately visible to the user.
* **Resilience**: The system is designed to handle individual sensor timeouts or errors without affecting the overall stability.

---
**Author:** Holubkov Vadym (IM-54)  
**License:** MIT