import hero from '../assets/images/onboarding-hero.png'

// Fluid, full-screen onboarding: the hero image takes whatever height the text block
// leaves free, and the button always keeps its margin from the bottom edge.
export default function Onboarding({ onStart }) {
  return (
    <section
      className="screen tw-root tw-flex tw-flex-col tw-overflow-hidden"
      style={{ background: 'linear-gradient(#000 0%, #000 55%, #0e0b06 78%)' }}
    >
      <div className="tw-flex tw-min-h-0 tw-flex-1 tw-items-end tw-justify-center" style={{ paddingTop: 'clamp(32px, 10dvh, 96px)' }}>
        <img
          src={hero}
          alt=""
          className="tw-h-full tw-w-auto tw-max-w-full tw-object-contain"
          style={{
            WebkitMaskImage: 'linear-gradient(#000 55%, transparent 100%)',
            maskImage: 'linear-gradient(#000 55%, transparent 100%)',
          }}
        />
      </div>

      <div className="tw-shrink-0 tw-px-[26px] tw-text-center" style={{ paddingBottom: 'max(30px, env(safe-area-inset-bottom))' }}>
        <h1 className="tw-font-display tw-font-bold tw-leading-[1.3] tw-text-white" style={{ fontSize: 'clamp(24px, 7.8vw, 32px)' }}>
          Fall in Love with<br />Coffee in Blissful<br />Delight!
        </h1>
        <p className="tw-mt-3 tw-font-body tw-text-sm tw-leading-normal tw-text-white/55">
          Welcome to our cozy coffee corner, where every cup is a delightful for you.
        </p>
        <button
          onClick={onStart}
          className="tw-mt-8 tw-grid tw-h-[43px] tw-w-full tw-place-items-center tw-rounded-2xl tw-bg-[#c3803a] tw-font-button tw-text-base tw-font-medium tw-text-white tw-transition active:tw-scale-[0.98]"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}
