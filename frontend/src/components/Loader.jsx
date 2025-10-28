import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
  <div className="w-40 h-40">
    <DotLottieReact src="/images/loader.lottie" loop autoplay />
  </div>
</div>

  );
};

export default Loader;
