const S = ({ size = 24, children, fill = 'none', stroke = 'currentColor', w = 1.6, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
)
export const Chevron = ({ dir = 'down', size = 20 }) => (
  <S size={size} style={{ transform: `rotate(${{ down: 0, left: 90, up: 180, right: -90 }[dir]}deg)` }}><path d="M6 9l6 6 6-6" /></S>
)
export const Search = (p) => <S {...p}><circle cx="11" cy="11" r="7.5" /><path d="M20 20l-3.5-3.5" /></S>
export const Sliders = (p) => <S {...p}><path d="M4 8h9M18 8h2M4 16h2M11 16h9" /><circle cx="15.5" cy="8" r="2" /><circle cx="8.5" cy="16" r="2" /></S>
export const Star = ({ size = 16 }) => <S size={size} fill="#fbbe21" stroke="#fbbe21" w={1}><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" /></S>
export const Plus = (p) => <S {...p}><path d="M12 5v14M5 12h14" /></S>
export const Minus = (p) => <S {...p}><path d="M5 12h14" /></S>
export const Home = ({ size = 28 }) => <S size={size} fill="currentColor" stroke="currentColor"><path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-5H9v5H5a1 1 0 01-1-1z" /></S>
export const Heart = (p) => <S {...p}><path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.5C20 15.2 12 20 12 20z" /></S>
export const Bag = (p) => <S {...p}><path d="M6 8h12l1 11H5z" /><path d="M9 8a3 3 0 016 0" /></S>
export const Bell = (p) => <S {...p}><path d="M6 17V11a6 6 0 0112 0v6l1.5 2h-15z" /><path d="M10 21h4" /></S>
export const Scooter = ({ size = 24 }) => (
  <S size={size} fill="currentColor" stroke="currentColor" w={0.8}>
    <rect x="12" y="3" width="6" height="5" rx="1" /><circle cx="14" cy="11" r="1.5" /><path d="M8 9l3 3h-2l-2 3H5l1-4z" />
    <circle cx="6" cy="19" r="2.2" /><circle cx="18" cy="19" r="2.2" /><path d="M6 17h8l2-6h2l1 6" fill="none" />
  </S>
)
export const Bean = ({ size = 24 }) => <S size={size} fill="currentColor" stroke="none"><path d="M12 3c4 0 8 3 8 8s-4 10-8 10-8-3-8-8 4-10 8-10zM12 6c-2 3 2 5 0 8" stroke="#f5f5f5" fill="none" strokeWidth="1.5" /></S>
export const Milk = ({ size = 24 }) => <S size={size} fill="currentColor" stroke="none"><path d="M8 3h8l3 4v14H5V7zM5 11h14" /><path d="M5 11h14" stroke="#f5f5f5" strokeWidth="1.3" /></S>
export const Pencil = (p) => <S {...p}><path d="M5 19h4L19 9l-4-4L5 15z" /></S>
export const Note = (p) => <S {...p}><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M9 9h6M9 13h6" /></S>
export const Discount = (p) => <S {...p}><path d="M12 3l2.4 1.6 2.9.2 1 2.7 2.1 2-.9 2.8.9 2.8-2.1 2-1 2.7-2.9.2L12 21l-2.4-1.6-2.9-.2-1-2.7-2.1-2 .9-2.8-.9-2.8 2.1-2 1-2.7 2.9-.2z" /><path d="M9.5 14.5l5-5" /></S>
export const Wallet = (p) => <S {...p}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12.5h5v3h-5a1.5 1.5 0 010-3zM6 6l9-2.5" /></S>
export const Target = (p) => <S {...p}><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></S>
export const Phone = (p) => <S {...p}><path d="M6 4h3l1.5 4-2 1.5a11 11 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 014 6a2 2 0 012-2z" /><path d="M15 4a5 5 0 015 5M15 7.5A2 2 0 0117 9.5" /></S>
