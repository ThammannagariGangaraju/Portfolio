import { Download, Eye } from 'lucide-react'
import { profile } from '../../config/portfolio'

type Props = { className?: string }

/**
 * Split-pill resume action: "View Resume" opens the served PDF in a new tab,
 * the visually separated "Download" half downloads the same file with a
 * friendly filename. Both halves are real links to /Resume_1.1.pdf — no invented
 * URLs, one clearly-labeled control each.
 */
export default function ResumeSplitPill({ className = '' }: Props) {
  const downloadName = 'Gangaraju_Thammannagari_Resume.pdf'
  const half =
    'inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 font-display text-[15px] font-semibold tracking-wide transition-colors duration-300 focus-visible:bg-white/10'

  return (
    <span
      className={`inline-flex overflow-hidden rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white ${className}`}
      role="group"
      aria-label="Resume actions"
    >
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="View resume (PDF, opens in a new tab)"
        className={`${half} pr-4 hover:text-white`}
      >
        <Eye className="size-4" aria-hidden />
        View Resume
      </a>

      {/* Divider between the two actions */}
      <span aria-hidden className="my-2.5 w-px shrink-0 bg-white/15" />

      <a
        href={profile.resume}
        download={downloadName}
        aria-label={`Download resume PDF (${downloadName})`}
        className={`${half} pl-4 hover:text-white`}
      >
        <Download className="size-4" aria-hidden />
        Download
      </a>
    </span>
  )
}
