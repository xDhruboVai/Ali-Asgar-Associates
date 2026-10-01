import { JOURNEY } from '@/lib/services'

/** The turnkey route as one continuous line that draws itself when scrolled into view. */
export function Journey() {
  return (
    <ol className="journey" data-reveal="fade" aria-label="From first idea to finished building">
      {JOURNEY.map((stage, i) => (
        <li key={stage.name} className="journey__stage" style={{ '--d': i } as React.CSSProperties}>
          <span className="journey__name">{stage.name}</span>
          <span className="journey__text">{stage.text}</span>
        </li>
      ))}
    </ol>
  )
}
