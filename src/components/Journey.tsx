import { JOURNEY } from '@/lib/services'
import { Eyebrow } from './Ui'
import { Words } from './Words'

/**
 * The turnkey route from brief to handover. On wide screens the section pins
 * and the six stages travel sideways while a red rail fills; elsewhere, and
 * under reduced motion, the stages are a plain grid.
 */
export function Journey({ index, lede }: { index?: string; lede: string }) {
  return (
    <section className="journey" data-hscroll aria-labelledby="journey-title">
      <div className="journey__inner" data-hscroll-pin>
        <div className="container journey__head">
          <div>
            <Eyebrow index={index}>Turnkey</Eyebrow>
            <h2 id="journey-title" className="h2">
              <Words text="One firm, from planning *to completion.*" />
            </h2>
          </div>
          <p className="journey__lede" data-reveal>
            {lede}
          </p>
        </div>

        <div className="container" aria-hidden="true">
          <div className="journey__rail">
            <span className="journey__rail-fill" data-hscroll-bar />
          </div>
        </div>

        <div className="journey__viewport">
          <ol className="journey__track" data-hscroll-track aria-label="From first idea to finished building">
            {JOURNEY.map((stage, i) => (
              <li key={stage.name} className="stage" data-reveal>
                <span className="stage__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="stage__name">{stage.name}</h3>
                <p className="stage__text">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
