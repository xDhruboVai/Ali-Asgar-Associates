import { JOURNEY } from '@/lib/services'
import { BuildingDrawing } from './BuildingDrawing'
import { Eyebrow } from './Ui'
import { Words } from './Words'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The turnkey route from brief to handover, told as one building going up.
 * On wide screens the section pins and the scroll builds the drawing stage by
 * stage while the matching step lights up; on narrow screens it builds once as
 * it comes into view; under reduced motion it is shown finished.
 */
export function Journey({ index, lede }: { index?: string; lede: string }) {
  const last = JOURNEY.at(-1)

  return (
    <section className="build" data-build aria-labelledby="journey-title">
      <div className="container build__inner" data-build-pin>
        <div className="build__copy">
          <Eyebrow index={index}>Turnkey</Eyebrow>
          <h2 id="journey-title" className="h2 build__title">
            <Words text="One firm, from planning *to completion.*" />
          </h2>
          <p className="build__lede" data-reveal>
            {lede}
          </p>

          <div className="build__steps-wrap">
            <span className="build__rail" aria-hidden="true">
              <span className="build__rail-fill" data-build-bar />
            </span>
            <ol className="build__steps" aria-label="From first idea to finished building">
              {JOURNEY.map((stage, i) => (
                <li key={stage.name} className="build__step" data-build-step data-name={stage.name}>
                  <span className="build__num" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className="build__body">
                    <h3 className="build__name">{stage.name}</h3>
                    <p className="build__text">{stage.text}</p>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <figure className="build__figure">
          <figcaption className="build__counter" aria-hidden="true">
            <span className="build__count" data-build-count>
              {pad(JOURNEY.length)} / {pad(JOURNEY.length)}
            </span>
            <span className="build__label" data-build-label>
              {last?.name}
            </span>
          </figcaption>
          <BuildingDrawing />
        </figure>
      </div>
    </section>
  )
}
