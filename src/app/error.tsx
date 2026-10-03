'use client'

import { BtnLabel, PageHead } from '@/components/Ui'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="fallback fallback--static">
      <PageHead
        sheet="—"
        eyebrow="Something went wrong"
        title="This page could not *be loaded.*"
        lede={<p>The project information could not be retrieved just now. Try again in a moment.</p>}
      >
        <p className="fallback__actions">
          <button type="button" className="btn btn--red" onClick={() => reset()}>
            <BtnLabel icon="↻">Try again</BtnLabel>
          </button>
        </p>
      </PageHead>
    </div>
  )
}
