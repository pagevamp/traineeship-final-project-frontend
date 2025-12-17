'use client';

import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

const slides = [
  { image: '/login_page.webp', alt: 'login' },
  { image: '/login_page_2.jpeg', alt: 'login2' },
];

export const ImageSlider = () => {
  return (
    <motion.div
      className="w-full min-w-45 max-h-screen rounded-[15px] hidden lg:block"
      initial={{ x: -50, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((item) => (
          <SwiperSlide key={item.alt}>
            <div className="relative w-full h-[90vh]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover rounded-[15px]"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
