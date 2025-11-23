import { useState, useRef } from 'react';

export default function VideoPlayer({ videoUrl, title, thumbnail, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = async () => {
    if (videoRef.current) {
      setIsLoading(true);
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        onEnded={handleVideoEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls={isPlaying}
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className="bg-lime-400 hover:bg-lime-500 text-black p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>
      )}

      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
        </div>
      )}
    </div>
  );
}