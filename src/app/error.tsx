'use client'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-head blueprint" style={{ minHeight: '70svh' }}>
      <div className="container stack">
        <p className="label label--tick">Something went wrong</p>
        <h1>This page could not be loaded</h1>
        <p className="lede">The project information could not be retrieved just now. Try again in a moment.</p>
        <p>
          <button type="button" className="button" onClick={() => reset()}>
            Try again
          </button>
        </p>
      </div>
    </section>
  )
}
