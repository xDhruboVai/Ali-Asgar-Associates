import Link from 'next/link'
import { getCompany, getLicenses } from '@/lib/data'
import { phoneLinks, titleCase } from '@/lib/normalize'
import { NAV_ITEMS, TAGLINE } from '@/lib/site'
import { SheetLabel } from './SheetLabel'
import { withAmpersand } from './Words'

/** The footer is drawn as the title block of a drawing sheet. */
export async function SiteFooter() {
  const [company, licenses] = await Promise.all([getCompany(), getLicenses()])
  const name = titleCase(company.name)
  const phone = phoneLinks(company.telephone)
  const tradeLicense = licenses.find((l) => /trade/i.test(l.license_type))

  return (
    <footer className="site-footer">
      <div className="container">
        <p className="site-footer__mark" aria-hidden="true">
          {withAmpersand(name)}
        </p>

        <div className="title-block">
          <div className="title-block__cell title-block__cell--wide">
            <h2 className="tb-label">Practice</h2>
            <p className="site-footer__name">{name}</p>
            <p>
              {TAGLINE}
              {company.established_year ? ` · Est. ${company.established_year}` : ''}
            </p>
          </div>

          <div className="title-block__cell title-block__cell--wide">
            <h2 className="tb-label">Office</h2>
            <address>
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

          <nav className="title-block__cell" aria-label="Footer">
            <h2 className="tb-label">Index</h2>
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

          <div className="title-block__cell">
            <h2 className="tb-label">Sheet</h2>
            <SheetLabel />
          </div>

          <div className="title-block__cell">
            <h2 className="tb-label">Scale</h2>
            <p className="tb-value">1 : 1</p>
          </div>

          <div className="title-block__cell title-block__cell--long">
            <h2 className="tb-label">Registration</h2>
            <p>
              {tradeLicense?.license_number
                ? `${tradeLicense.license_type} ${tradeLicense.license_number}${tradeLicense.authority ? `, ${tradeLicense.authority}` : ''}`
                : 'Dhaka, Bangladesh'}
            </p>
          </div>

          <div className="title-block__cell">
            <h2 className="tb-label">Rev.</h2>
            <p className="tb-value">© {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
