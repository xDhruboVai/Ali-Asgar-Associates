import Link from 'next/link'
import { getCompany, getLicenses } from '@/lib/data'
import { phoneLinks, titleCase } from '@/lib/normalize'
import { NAV_ITEMS, TAGLINE } from '@/lib/site'

export async function SiteFooter() {
  const [company, licenses] = await Promise.all([getCompany(), getLicenses()])
  const name = titleCase(company.name)
  const phone = phoneLinks(company.telephone)
  const tradeLicense = licenses.find((l) => /trade/i.test(l.license_type))

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="stack-sm">
            <p className="site-footer__name">{name}</p>
            <p>{TAGLINE}</p>
            {company.established_year ? <p>Established {company.established_year}</p> : null}
          </div>

          <div>
            <h2 className="label">Office</h2>
            <address className="stack-sm">
              {company.address ? <p>{titleCase(company.address)}</p> : null}
              {phone ? (
                <p>
                  <a href={phone.href}>{phone.display}</a>
                </p>
              ) : null}
              {company.email ? (
                <p>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
              ) : null}
            </address>
          </div>

          <nav aria-label="Footer">
            <h2 className="label">Pages</h2>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__base">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          {tradeLicense?.license_number ? (
            <p>
              {tradeLicense.license_type} {tradeLicense.license_number}
              {tradeLicense.authority ? `, ${tradeLicense.authority}` : ''}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
