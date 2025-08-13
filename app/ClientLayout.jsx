'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ScrollToTop from './ScrollToTop';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/ClientSideMap'), { ssr: false });

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="min-h-screen"
      >
        {children}
        <DynamicMap />
      </motion.div>
    </AnimatePresence>
  );
}

