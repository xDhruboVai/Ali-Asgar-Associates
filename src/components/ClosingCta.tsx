import Link from 'next/link'
import { getCompany } from '@/lib/data'
import { phoneLinks, titleCase } from '@/lib/normalize'
import { Eyebrow } from './Ui'
import { Words } from './Words'

export function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, Bangladesh`)}`
}

/** Final section of each page: the invitation to get in touch, with the office details. */
export async function ClosingCta({ showButton = true }: { showButton?: boolean }) {
  const company = await getCompany()
  const phone = phoneLinks(company.telephone)
  const address = company.address ? titleCase(company.address) : null

  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="container">
        <Eyebrow>New project</Eyebrow>
        <div className="closing__grid">
          <h2 id="closing-title" className="closing__title">
            <Words text={'Let’s build\nsomething *that lasts.*'} />
          </h2>
          {showButton ? (
            <Link href="/contact" className="disc" data-magnetic="0.4" data-reveal>
              <span className="disc__label">Start a project</span>
              <span className="disc__icon" aria-hidden="true">
                ↗
              </span>
            </Link>
          ) : null}
        </div>

        <dl className="closing__details">
          {phone ? (
            <div data-reveal>
              <dt>Phone</dt>
              <dd>
                <a href={phone.href} className="big-link">
                  {phone.display}
                </a>
              </dd>
            </div>
          ) : null}
          {company.email ? (
            <div data-reveal>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="big-link">
                  {company.email}
                </a>
              </dd>
            </div>
          ) : null}
          {address ? (
            <div data-reveal>
              <dt>Office</dt>
              <dd>
                <a href={mapsUrl(address)} className="big-link" target="_blank" rel="noopener noreferrer">
                  <address>{address}</address>
                  <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  )
}
