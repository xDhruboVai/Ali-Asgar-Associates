import type { Metadata } from 'next'
import { mapsUrl } from '@/components/ClosingCta'
import { getCompany } from '@/lib/data'
import { phoneLinks, titleCase } from '@/lib/normalize'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Telephone, email and office address of Ali Asgar & Associates, Lalmatia, Dhaka.',
}

export default async function ContactPage() {
  const company = await getCompany()
  const phone = phoneLinks(company.telephone)
  const address = company.address ? titleCase(company.address) : null

  return (
    <>
      <header className="page-head blueprint">
        <div className="container page-head__grid">
          <div>
            <p className="label label--tick">Start a project</p>
            <h1 style={{ maxWidth: '12ch', fontSize: 'var(--step-4)', lineHeight: 0.96 }}>
              <span className="line">
                <span>Let’s build something that lasts.</span>
              </span>
            </h1>
          </div>
          <p className="lede">
            To discuss a new building, a structural assessment or construction work, call or write to the office in
            Lalmatia.
          </p>
        </div>
      </header>

      <section className="container page-body" aria-label="Contact details">
        <div className="contact-grid" data-reveal>
          {phone ? (
            <div className="contact-item">
              <h2 className="label label--tick">Phone</h2>
              <p className="contact-item__value">
                <a href={phone.href}>{phone.display}</a>
              </p>
              <p>
                <a href={phone.href} className="button button--small">
                  Call the office
                </a>
              </p>
            </div>
          ) : null}

          {company.email ? (
            <div className="contact-item">
              <h2 className="label label--tick">Email</h2>
              <p className="contact-item__value">
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
              <p>
                <a href={`mailto:${company.email}?subject=New%20project%20enquiry`} className="button button--small">
                  Write to us
                </a>
              </p>
            </div>
          ) : null}

          {address ? (
            <div className="contact-item">
              <h2 className="label label--tick">Office</h2>
              <address className="contact-item__value">{address}</address>
              <p>
                <a
                  href={mapsUrl(address)}
                  className="button button--small button--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          ) : null}
        </div>

        <div className="note mt-lg" style={{ maxWidth: '70ch' }} data-reveal>
          <p>
            <strong>Helpful to include:</strong> the site location, land area (in katha), the type and height of
            building, and which services you need, whether full design, structural design only, an engineering
            assessment or construction.
          </p>
        </div>
      </section>
    </>
  )
}
