import useScrollProgress from '../hooks/useScrollProgress'

export default function ReadingProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-14 left-0 right-0 h-[3px] bg-black/5 z-40">
      <div
        className="h-full bg-accent transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
