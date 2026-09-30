import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="container stack">
        <p className="label">404</p>
        <h1>Page not found</h1>
        <p className="lede">The page you were looking for does not exist or has moved.</p>
        <p>
          <Link href="/projects" className="arrow-link">
            Browse projects
          </Link>
        </p>
      </div>
    </section>
  )
}
