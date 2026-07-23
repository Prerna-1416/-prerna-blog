export default function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center overflow-visible">
      <img
        src="./hero-illustration.png"
        alt="Hero illustration"
        className="w-full max-w-lg -ml-6 mt-4"
        style={{
          animation: 'float 7s ease-in-out infinite',
          scale: '1.25',
        }}
      />
    </div>
  )
}
