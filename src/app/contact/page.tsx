import type { Metadata } from 'next'
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
  const mapUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, Bangladesh`)}`
    : null

  return (
    <>
      <header className="page-head">
        <div className="container page-head__grid">
          <div>
            <p className="label">{titleCase(company.name)}</p>
            <h1>Contact</h1>
          </div>
          <p className="lede">
            To discuss a new building, a structural assessment or construction work, call or write to the office in
            Lalmatia.
          </p>
        </div>
      </header>

      <section className="container" style={{ paddingBottom: 'clamp(56px, 8vw, 112px)' }} aria-label="Contact details">
        <div className="contact-grid">
          {phone ? (
            <div className="contact-item">
              <h2 className="label">Telephone</h2>
              <p className="contact-item__value">
                <a href={phone.href}>{phone.display}</a>
              </p>
            </div>
          ) : null}

          {company.email ? (
            <div className="contact-item">
              <h2 className="label">Email</h2>
              <p className="contact-item__value">
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
            </div>
          ) : null}

          {address ? (
            <div className="contact-item">
              <h2 className="label">Office</h2>
              <address className="contact-item__value">{address}</address>
              {mapUrl ? (
                <p>
                  <a href={mapUrl} className="arrow-link" target="_blank" rel="noopener noreferrer">
                    Open in Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="note mt-lg" style={{ maxWidth: '70ch' }}>
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
