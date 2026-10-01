/**
 * An endless strip of names. The second copy exists only to close the loop and
 * is hidden from assistive technology. Without motion the names simply wrap.
 */
export function Marquee({ items, reverse = false, duration = 60 }: { items: string[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="marquee" data-marquee={reverse ? 'reverse' : ''} data-duration={duration}>
      <div className="marquee__track" data-marquee-track>
        <ul className="marquee__list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="marquee__list marquee__list--copy" aria-hidden="true">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
