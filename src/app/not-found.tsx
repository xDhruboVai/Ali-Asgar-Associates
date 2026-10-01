import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="page-head blueprint" style={{ minHeight: '70svh' }}>
      <div className="container stack">
        <p className="label label--tick">404</p>
        <h1>Page not found</h1>
        <p className="lede">The page you were looking for does not exist or has moved.</p>
        <p>
          <Link href="/projects" className="button">
            Explore projects
          </Link>
        </p>
      </div>
    </section>
  )
}
