import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSearchBar from '@/components/shared/AnimatedSearchBar';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-dark-navy)]">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-70"
        >
          {/* 회전하는 컴퓨터 비디오 */}
          <source src="/videos/spinning-pc.mp4" type="video/mp4" />
          <source src="/videos/spinning-pc.webm" type="video/webm" />
        </video>
        {/* Gradient Overlay - 더 투명하게 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dark-navy)]/30 via-transparent to-[var(--color-dark-navy)]/50" />
        {/* Radial Gradient for center focus - 더 투명하게 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-dark-navy)_85%)]" />
      </div>

      {/* Fallback: Grid Background (shown if video fails to load) */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="grid h-full grid-cols-4 gap-4 p-8 md:grid-cols-6 lg:grid-cols-8">
          {Array.from({ length: 16 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="aspect-square rounded-2xl bg-white/20"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">Compare</span>
            <span className="bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] bg-clip-text text-2xl font-bold text-transparent">
              AI
            </span>
          </div>
          <p className="text-sm tracking-wide text-gray-400">AI 기반 컴퓨터 부품 최저가 비교</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          <AnimatedSearchBar variant="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-400">
            원하는 제품을 검색하고 최저가를 비교해보세요
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
