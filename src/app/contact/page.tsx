import type { Metadata } from 'next'
import { mapsUrl } from '@/components/ClosingCta'
import { PageHead } from '@/components/Ui'
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

  const rows = [
    phone ? { label: 'Call the office', value: phone.display, href: phone.href, action: 'Call' } : null,
    company.email
      ? {
          label: 'Write to us',
          value: company.email,
          href: `mailto:${company.email}?subject=New%20project%20enquiry`,
          action: 'Email',
        }
      : null,
    address ? { label: 'Visit the office', value: address, href: mapsUrl(address), action: 'Map', external: true } : null,
  ].filter((r) => r !== null)

  return (
    <>
      <PageHead
        sheet="A-400"
        eyebrow="Start a project"
        title={'Let’s build something *that lasts.*'}
        lede={
          <p>
            To discuss a new building, a structural assessment or construction work, call or write to the office in
            Lalmatia.
          </p>
        }
      />

      <section className="container page-body" aria-label="Contact details">
        <ul className="contact-rows">
          {rows.map((row, i) => (
            <li key={row.label}>
              <span className="rule" data-line aria-hidden="true" />
              <a
                href={row.href}
                className="contact-row"
                data-reveal
                {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact-row__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="contact-row__label">{row.label}</span>
                <span className="contact-row__value">{row.value}</span>
                <span className="contact-row__action" aria-hidden="true">
                  {row.action} ↗
                </span>
                {row.external ? <span className="visually-hidden"> (opens Google Maps in a new tab)</span> : null}
              </a>
            </li>
          ))}
          <li aria-hidden="true">
            <span className="rule" data-line />
          </li>
        </ul>

        <aside className="brief" data-reveal>
          <h2 className="mono-label">Helpful to include</h2>
          <p>
            The site location, land area (in katha), the type and height of building, and which services you need,
            whether full design, structural design only, an engineering assessment or construction.
          </p>
        </aside>
      </section>
    </>
  )
}
