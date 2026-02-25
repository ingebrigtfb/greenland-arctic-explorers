export default function GreenlandMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Map of Greenland"
    >
      {/* Main island shape */}
      <path
        d="M200 20 C230 18 260 25 280 40 C310 60 330 85 340 115 C355 155 360 200 355 240 C350 280 340 315 325 350 C310 380 290 405 270 430 C250 450 235 470 225 490 C215 510 205 530 195 545 C185 555 175 560 165 555 C155 545 145 530 140 510 C130 480 125 450 115 420 C100 380 85 340 75 300 C65 260 60 215 65 175 C70 140 80 110 100 85 C120 60 145 40 170 28 C180 23 190 20 200 20Z"
        className="fill-glacier transition-colors duration-300"
      />

      {/* Region lines */}
      <path
        d="M95 180 C140 170 180 175 230 165 C270 158 310 155 345 165"
        className="stroke-polar-teal"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
      />
      <path
        d="M80 290 C120 280 170 275 220 285 C260 292 300 300 335 310"
        className="stroke-polar-teal"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
      />
      <path
        d="M115 400 C150 390 190 395 230 410 C255 420 275 430 290 440"
        className="stroke-polar-teal"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Location dots */}
      <circle cx="240" cy="100" r="5" className="fill-frost" />
      <circle cx="200" cy="220" r="6" className="fill-arctic-orange" />
      <circle cx="170" cy="340" r="5" className="fill-frost" />
      <circle cx="190" cy="470" r="5" className="fill-frost" />

      {/* Location labels */}
      <text x="252" y="104" className="fill-white text-[11px] font-heading" fontWeight="600">
        Qaanaaq
      </text>
      <text x="214" y="224" className="fill-white text-[11px] font-heading" fontWeight="600">
        Ilulissat
      </text>
      <text x="182" y="344" className="fill-white text-[11px] font-heading" fontWeight="600">
        Nuuk
      </text>
      <text x="202" y="474" className="fill-white text-[11px] font-heading" fontWeight="600">
        Narsarsuaq
      </text>

      {/* Coastline detail - small islands */}
      <ellipse cx="55" cy="200" rx="8" ry="12" className="fill-glacier opacity-60" />
      <ellipse cx="50" cy="260" rx="6" ry="8" className="fill-glacier opacity-60" />
      <ellipse cx="340" cy="130" rx="10" ry="6" className="fill-glacier opacity-60" />
    </svg>
  );
}
