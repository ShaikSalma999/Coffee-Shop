// Extra icons needed by the order / tracking flow (same stroke style as Icons.jsx).
const S = ({ size = 24, children, fill = 'none', stroke = 'currentColor', w = 1.6, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
)
export const Check = ({ size = 16, w = 3, ...p }) => <S size={size} w={w} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></S>
export const Close = (p) => <S {...p}><path d="M6 6l12 12M18 6L6 18" /></S>
export const Message = (p) => <S {...p}><path d="M4 12a8 8 0 018-8 8 8 0 018 8 8 8 0 01-11.5 7.2L4 20l.9-4.3A7.9 7.9 0 014 12z" /></S>
export const HomeOutline = ({ size = 28, ...p }) => <S size={size} {...p}><path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-5H9v5H5a1 1 0 01-1-1z" /></S>
