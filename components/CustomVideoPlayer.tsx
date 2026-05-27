"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayerModule from "react-player";
const ReactPlayer = ReactPlayerModule as any;
import { MessageSquare, X, Send } from "lucide-react";

interface CustomVideoPlayerProps {
  url: string;
  title: string;
  onQuestionSubmit: (timeString: string, question: string) => Promise<void>;
}

export function CustomVideoPlayer({ url, title, onQuestionSubmit }: CustomVideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [pausedTimeStr, setPausedTimeStr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAskQuestion = () => {
    if (playerRef.current) {
      setPlaying(false); // Pause video
      const currentTime = playerRef.current.getCurrentTime();
      setPausedTimeStr(formatTime(currentTime));
      setShowModal(true);
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setIsSubmitting(true);
    try {
      await onQuestionSubmit(pausedTimeStr, question);
      setShowModal(false);
      setQuestion("");
      setPlaying(true); // Resume video
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return <div className="aspect-video bg-brand-navy-dark rounded-sm animate-pulse border border-brand-taupe/30"></div>;
  }

  return (
    <div className="relative group transition-colors duration-300">
      <div className="bg-brand-navy-dark aspect-video rounded-sm relative overflow-hidden border border-brand-taupe/30 shadow-xl">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          controls={true}
          playing={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>

      {/* Action Bar */}
      <div className="mt-4 flex justify-between items-center bg-white dark:bg-[#0a0f1c] p-4 rounded-sm border border-brand-taupe/20 shadow-sm transition-colors duration-300">
        <div>
          <h2 className="text-xl font-serif font-bold text-brand-navy dark:text-white">{title}</h2>
        </div>
        <button
          onClick={handleAskQuestion}
          className="bg-brand-peach hover:bg-brand-peach/80 text-brand-navy py-2 px-4 rounded-sm text-xs tracking-widest uppercase font-bold transition-colors flex items-center gap-2"
        >
          <MessageSquare size={16} /> I'm Confused
        </button>
      </div>

      {/* Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-[#0a0f1c] rounded-sm p-8 max-w-md w-full shadow-2xl border border-brand-taupe/20 relative">
            <button 
              onClick={() => {
                setShowModal(false);
                setPlaying(true);
              }} 
              className="absolute top-5 right-5 text-brand-taupe hover:text-brand-mauve transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="font-serif text-2xl font-bold text-brand-navy dark:text-brand-beige mb-2">
               Ask the Teacher
            </h3>
            <p className="text-sm text-brand-taupe mb-6 border-b border-brand-taupe/10 pb-4">
              Send a question about the video at timestamp <strong className="text-brand-mauve">{pausedTimeStr}</strong>.
            </p>
            
            <textarea
              className="w-full bg-brand-beige/20 dark:bg-brand-navy/30 border border-brand-taupe/30 rounded-sm p-4 text-sm text-brand-navy dark:text-white focus:outline-none focus:border-brand-mauve transition-colors resize-none mb-6"
              rows={4}
              placeholder="What didn't you understand?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>

            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || !question.trim()}
              className="w-full bg-brand-mauve hover:bg-brand-dark disabled:opacity-50 text-white py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex justify-center items-center gap-2"
            >
              {isSubmitting ? "Sending..." : <><Send size={16} /> Send Question</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
