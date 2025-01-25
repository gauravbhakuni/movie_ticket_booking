"use client";
import HeroSection from "@/components/HeroSection";
import { useMovieContext } from '@/context/MovieContext';

export default function Home() {
  const { loading } = useMovieContext();

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <div>Loading</div>
        </div>
      ) : (
        <HeroSection />
      )}
    </main>
  );
}

// Styles for the spinner
const styles = `
.spinner {
  width: 64px;
  height: 64px;
  position: relative;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3498db;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1.0s;
}

@keyframes sk-bounce {
  0%, 100% { transform: scale(0.0) }
  50% { transform: scale(1.0) }
}
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
