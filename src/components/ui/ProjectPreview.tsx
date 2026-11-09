import type { Project } from '../../config/portfolio'
import { CloudRain, CloudSun, Snowflake, Sun } from 'lucide-react'

type Props = {
  project: Project
  index: number
}

/**
 * Per-project preview scenes (pass 9): each card shows a stylized app window
 * whose interface is abstracted from the project's real, resume-documented
 * functionality — a care-assistant chat view, a CV inspection viewport, and a
 * weather dashboard. Everything is a clearly visual mockup: illustrative
 * interface elements, no working controls, no invented data or results.
 * Ambient motion (ECG pulse, inspection sweep, drifting glyph, slow curve)
 * lives inside these scenes only and is skipped for reduced-motion users
 * (motion-safe: variants + [stroke-dasharray] gated the same way).
 */
const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/* --- shared mockup primitives ------------------------------------- */
const Line = ({ w, h = 'h-2', tone = 'bg-white/10' }: { w: string; h?: string; tone?: string }) => (
  <span aria-hidden className={`block rounded-full ${h} ${w} ${tone}`} />
)
const CheckDot = ({ tone = 'bg-accent-green' }: { tone?: string }) => (
  <span aria-hidden className={`size-2 shrink-0 rounded-full ${tone} opacity-90`} />
)
const Bubble = ({ mine = false, w }: { mine?: boolean; w: string }) => (
  <span
    aria-hidden
    className={`flex h-7 max-w-full items-center gap-2 rounded-lg border px-3 ${
      mine ? 'ml-auto border-accent/25 bg-accent/15' : 'border-white/10 bg-white/[0.04]'
    } ${w}`}
  >
    {mine ? null : <CheckDot />}
    <Line w={mine ? 'w-12' : 'w-16'} h="h-1.5" tone={mine ? 'bg-accent/60' : 'bg-white/15'} />
  </span>
)

/* ------------------------------------------------------------------ */
/* Hack2Care — care-assistant chat + live pulse strip                  */
/* ------------------------------------------------------------------ */
function Hack2CareScene({ Icon, name }: { Icon: Project['icon']; name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col p-4 sm:p-5">
      {/* App bar: identity + status */}
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="relative grid size-7 place-items-center rounded-lg border border-accent/30 bg-accent/10">
          <Icon className="size-3.5 text-accent" aria-hidden />
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 size-2 rounded-full border-2 border-[#0d0d0f] motion-safe:animate-pulse-soft"
            style={{ backgroundColor: 'var(--color-accent-green)' }}
          />
        </span>
        <span aria-hidden className="font-display text-[13px] font-bold tracking-tight text-white">
          {name}
        </span>
        <span aria-hidden className="ml-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
          <span aria-hidden className="size-1.5 rounded-full motion-safe:animate-blink-dot" style={{ backgroundColor: 'var(--color-accent-green)' }} />
          <span aria-hidden className="block h-1 w-10 rounded-full bg-white/15" />
        </span>
      </div>

      {/* Chat (left) + guided steps (right) */}
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-5 gap-3">
        <div aria-hidden className="col-span-3 flex min-h-0 flex-col justify-center gap-2">
          <Bubble w="w-4/5" />
          <Bubble mine w="w-3/5" />
          <Bubble w="w-11/12" />
          {/* typing indicator */}
          <span aria-hidden className="flex w-fit items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 rounded-full bg-white/50 motion-safe:animate-blink-dot"
                style={{ animationDelay: `${i * 0.22}s` }}
              />
            ))}
          </span>
        </div>
        <div aria-hidden className="col-span-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
          <Line w="w-4/5" h="h-1.5" tone="bg-white/15" />
          <div className="mt-2 space-y-2">
            {['w-2/3', 'w-3/4', 'w-1/2'].map((w) => (
              <span key={w} className="flex items-center gap-2">
                <CheckDot tone="bg-accent" />
                <Line w={w} h="h-1.5" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient pulse strip — heartbeat trace, illustrative only */}
      <div aria-hidden className="relative mt-3 h-7 shrink-0 overflow-hidden rounded-lg border border-accent/20 bg-accent/[0.04]">
        <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            d="M0 10 H58 L64 6 L70 15 L76 10 H118 L124 3 L130 17 L136 10 H200"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={100}
            className="motion-safe:animate-ecg motion-safe:[stroke-dasharray:14_86]"
          />
        </svg>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Bolt & Nut Detector — inspection viewport + sweep                   */
/* ------------------------------------------------------------------ */
function DetectorScene() {
  const box = (
    kind: 'bolt' | 'nut',
    posClass: string,
    sizeClass: string,
    tone: 'accent' | 'green',
  ) => (
    <span aria-hidden className={`absolute ${posClass} ${sizeClass} rounded-md border-2 ${tone === 'accent' ? 'border-accent' : 'border-accent-green'}`}>
      {/* corner ticks — CV look */}
      <span aria-hidden className={`absolute -left-px -top-px size-2 rounded-tl border-l-2 border-t-2 ${tone === 'accent' ? 'border-accent' : 'border-accent-green'}`} />
      <span aria-hidden className={`absolute -bottom-px -right-px size-2 rounded-br border-b-2 border-r-2 ${tone === 'accent' ? 'border-accent' : 'border-accent-green'}`} />
      <span
        aria-hidden
        className={`absolute inset-x-1 -bottom-5 flex justify-center rounded border px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-widest ${
          tone === 'accent' ? 'border-accent/40 bg-accent/15 text-accent' : 'border-accent-green/40 bg-accent-green/10 text-accent-green'
        }`}
      >
        {kind}
      </span>
    </span>
  )

  return (
    <div className="absolute inset-0 p-4 sm:p-5">
      <div
        aria-hidden
        className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#0f0f11]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        {/* viewfinder brackets */}
        <span aria-hidden className="absolute left-2 top-2 size-3 rounded-tl border-l-2 border-t-2 border-accent/60" />
        <span aria-hidden className="absolute right-2 top-2 size-3 rounded-tr border-r-2 border-t-2 border-accent/60" />
        <span aria-hidden className="absolute left-2 bottom-2 size-3 rounded-bl border-b-2 border-l-2 border-accent/60" />
        <span aria-hidden className="absolute right-2 bottom-2 size-3 rounded-br border-b-2 border-r-2 border-accent/60" />

        {/* detected objects — real classes the app reports, no counts */}
        {box('bolt', 'left-[14%] top-[22%]', 'size-12 sm:size-14', 'accent')}
        {box('nut', 'right-[15%] top-[38%]', 'size-10 sm:size-12', 'green')}

        {/* inspection sweep line (motion-safe) */}
        <span
          aria-hidden
          className="absolute inset-x-3 top-[6%] h-8 motion-safe:animate-scan rounded-sm border-y border-accent/25 bg-[linear-gradient(to_bottom,transparent,rgba(59,130,246,0.14),transparent)]"
        />

        {/* status strip: live LED + object ticks (two real classes) */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 border-t border-white/[0.06] bg-black/30 px-3 py-2">
          <span aria-hidden className="size-1.5 rounded-full motion-safe:animate-pulse-soft" style={{ backgroundColor: 'var(--color-accent)' }} />
          <span aria-hidden className="flex gap-1.5">
            {[0, 1].map((i) => (
              <span key={i} className="size-1.5 rounded-full bg-accent/70" />
            ))}
            <span className="size-1.5 rounded-full bg-accent-green/70" />
          </span>
          <span aria-hidden className="ml-auto block h-1 w-16 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Weather Prediction — dashboard + forecast strip                     */
/* ------------------------------------------------------------------ */
function WeatherScene({ Icon }: { Icon: Project['icon'] }) {
  const forecast: Array<{ glyph: typeof Sun; active?: boolean }> = [
    { glyph: Sun, active: true },
    { glyph: CloudSun },
    { glyph: CloudSun },
    { glyph: CloudRain },
    { glyph: Snowflake },
  ]

  return (
    <div className="absolute inset-0 p-4 sm:p-5">
      <div
        aria-hidden
        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10"
        style={{ background: 'radial-gradient(circle at 78% 0%, rgba(59,130,246,0.16), transparent 58%)' }}
      >
        {/* header: location + search */}
        <div className="flex items-center gap-2 p-4 pb-0">
          <span aria-hidden className="size-2 rounded-full bg-accent/70" />
          <Line w="w-20" h="h-1.5" tone="bg-white/15" />
          <span aria-hidden className="ml-auto block h-4 w-14 rounded-full border border-white/10 bg-white/[0.03]" />
        </div>

        {/* current-conditions block */}
        <div className="flex items-center gap-4 px-4 pt-3">
          <span
            aria-hidden
            className="grid size-11 place-items-center rounded-xl border border-white/10"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <Icon className="size-6 text-white/80 motion-safe:animate-drift" strokeWidth={1.6} aria-hidden />
          </span>
          <div aria-hidden className="space-y-2">
            <Line w="w-14" h="h-4" tone="bg-white/25" />
            <Line w="w-10" h="h-1.5" tone="bg-white/10" />
          </div>
          <div aria-hidden className="ml-auto space-y-2">
            <Line w="w-8" h="h-1.5" tone="bg-white/15" />
            <Line w="w-8" h="h-1.5" tone="bg-white/15" />
          </div>
        </div>

        {/* data curve — slowly re-drawing, illustrative only */}
        <svg aria-hidden viewBox="0 0 100 24" preserveAspectRatio="none" className="min-h-0 w-full flex-1 opacity-80">
          <polyline
            points="0,19 12,17 24,18 36,12 48,13 60,7 72,9 84,4 100,6"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={100}
            className="motion-safe:animate-line motion-safe:[stroke-dasharray:100]"
            style={{ opacity: 0.9 }}
          />
        </svg>

        {/* forecast strip — generic glyphs, no invented values */}
        <div aria-hidden className="flex items-start justify-between border-t border-white/[0.06] px-4 pb-2.5 pt-2.5">
          {forecast.map(({ glyph: Glyph, active }, i) => (
            <span key={i} className={`flex flex-col items-center gap-1.5 rounded-md px-2 py-1 ${active ? 'bg-accent/10' : ''}`}>
              <Glyph className={`size-3.5 ${active ? 'text-accent' : 'text-white/35'}`} strokeWidth={1.8} aria-hidden />
              <Line w="w-5" h="h-1" tone={active ? 'bg-white/20' : 'bg-white/10'} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectPreview({ project, index }: Props) {
  const { icon: Icon } = project
  const address = slug(project.title)

  const scene =
    project.title === 'Hack2Care' ? (
      <Hack2CareScene Icon={Icon} name={project.title} />
    ) : project.title === 'Bolt & Nut Detector' ? (
      <DetectorScene />
    ) : (
      <WeatherScene Icon={Icon} />
    )

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
      aria-hidden
    >
      {/* Browser window chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#101012] px-4 py-3">
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="size-2.5 rounded-full bg-zinc-700" />
        <span className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-zinc-500">
          <span className="text-zinc-600">{String(index + 1).padStart(2, '0')}</span>
          {address}
        </span>
        <span className="size-2.5 shrink-0" />
      </div>

      {/* Scene body — gentle zoom on hover (skipped for reduced motion) */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_16px)]" />
        <div className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]">
          {scene}
        </div>
      </div>
    </div>
  )
}
