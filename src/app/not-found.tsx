import Link from 'next/link'
import { BtnLabel, PageHead } from '@/components/Ui'

export default function NotFound() {
  return (
    <div className="fallback">
      <PageHead
        sheet="—"
        eyebrow="404"
        title="Page not *found.*"
        lede={<p>The page you were looking for does not exist or has moved.</p>}
      >
        <p className="fallback__actions" data-reveal>
          <Link href="/projects" className="btn btn--ink" data-magnetic="0.25">
            <BtnLabel>Explore projects</BtnLabel>
          </Link>
          <Link href="/" className="text-link">
            Home
          </Link>
        </p>
      </PageHead>
    </div>
  )
}
