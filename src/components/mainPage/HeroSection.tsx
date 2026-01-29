import { motion } from 'framer-motion';
import AnimatedSearchBar from '@/components/mainPage/AnimatedSearchBar';

import backgroundVideo from '@/assets/modulo-intro.mp4';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-60">
          <source src={backgroundVideo} type="video/mp4" />
          해당 브라우저는 비디오 태그를 지원하지 않습니다.
        </video>

        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <img
            src="/logo.png"
            alt="modulo"
            className="mx-auto mb-6 h-20 w-auto brightness-0 invert md:h-24 lg:h-28"
          />
          <p className="text-xl font-medium tracking-wide text-white md:text-2xl">
            당신이 원하는 제품은 이곳에 전부 있습니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl"
        >
          <AnimatedSearchBar variant="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 2 }}
          className="mt-16 text-center"
        >
          <p className="text-lg tracking-wide text-white/90 md:text-xl">
            원하는 제품을 검색하고 최저가를 비교해보세요
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 2 }}
          className="h-px w-16 bg-white/30"
        />
      </div>
    </section>
  );
};

export default HeroSection;
