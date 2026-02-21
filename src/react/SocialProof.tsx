import React, { useEffect, useState } from "react";
import { f02 } from "../core/c01";

interface Props {
  interval?: number; // ms
}

export const SocialProof: React.FC<Props> = ({ interval = 5000 }) => {
  const [messages, setMessages] = useState<string[]>([]);

  // f07/f08: fetch and rotate messages
  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      const feed = await f02();
      if (isMounted) setMessages(feed);
    };

    fetchMessages();
    const timer = setInterval(fetchMessages, interval);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [interval]);

  return (
    <div className="social-proof-container">
      {messages.map((msg, idx) => (
        <div key={idx} className="social-proof-msg">
          {msg}
        </div>
      ))}
    </div>
  );
};
