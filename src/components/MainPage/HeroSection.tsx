import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSearchBar from '@/components/shared/AnimatedSearchBar';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f5f5f7]">
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <img
            src="/videos/logo.png"
            alt="WYW - Whatever You Want"
            className="mx-auto mb-6 h-20 w-auto md:h-24 lg:h-28"
          />
          <p className="text-sm font-light tracking-[0.2em] text-gray-500">
            당신이 원하는 제품은 이곳에 전부 있습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl"
        >
          <AnimatedSearchBar variant="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 2.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm font-light tracking-wide text-gray-400">
            원하는 제품을 검색하고 최저가를 비교해보세요
          </p>
        </motion.div>
      </div>

      {/* Minimal decorative line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-16 bg-gray-200"
        />
      </div>
    </section>
  );
};

export default HeroSection;
