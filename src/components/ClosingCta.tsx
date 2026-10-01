import Link from 'next/link'
import { getCompany } from '@/lib/data'
import { phoneLinks, titleCase } from '@/lib/normalize'

export function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, Bangladesh`)}`
}

/** Final section of each page: the invitation to get in touch, with the office details. */
export async function ClosingCta({ showButton = true }: { showButton?: boolean }) {
  const company = await getCompany()
  const phone = phoneLinks(company.telephone)
  const address = company.address ? titleCase(company.address) : null

  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="container closing__grid">
        <h2 id="closing-title" data-reveal>
          Let’s build something that lasts.
        </h2>
        <div data-reveal style={{ '--d': 2 } as React.CSSProperties}>
          <dl className="closing__details">
            {phone ? (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={phone.href}>{phone.display}</a>
                </dd>
              </div>
            ) : null}
            {company.email ? (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
            ) : null}
            {address ? (
              <div>
                <dt>Office</dt>
                <dd>
                  <address style={{ fontStyle: 'normal' }}>{address}</address>
                </dd>
              </div>
            ) : null}
          </dl>
          {showButton ? (
            <Link href="/contact" className="button button--light">
              Start a project
            </Link>
          ) : address ? (
            <a href={mapsUrl(address)} className="button button--light" target="_blank" rel="noopener noreferrer">
              Open in Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
