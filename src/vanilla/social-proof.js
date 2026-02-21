// Vanilla JS wrapper for non-React sites
// Function codes: f07 (render), f08 (rotate messages)

import { f02 } from "../core/c01.js";

(function (global) {
  function f07(containerId, interval = 5000) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let messages = [];
    let index = 0;

    async function fetchMessages() {
      try {
        messages = await f02();
        renderMessage();
      } catch (e) {
        console.error("Failed to fetch messages", e);
      }
    }

    function renderMessage() {
      if (messages.length === 0) return;
      container.textContent = messages[index];
      index = (index + 1) % messages.length;
    }

    fetchMessages();
    setInterval(renderMessage, interval);
    setInterval(fetchMessages, interval * 2); // refresh feed periodically
  }

  // Expose to global scope
  global.SocialProof = { f07 };
})(window);
