import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Stylized S with gradient */}
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center transform rotate-12">
          <div className="text-white text-lg font-black">S</div>
        </div>
        {/* Message bubble indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></div>
      </div>
      <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
        SuperDM
      </span>
    </div>
  );
}
