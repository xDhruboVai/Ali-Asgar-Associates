import { Words } from './Words'

/** Button contents: the label rolls over to a copy of itself on hover; an arrow sits in its own disc. */
export function BtnLabel({ children, icon = '↗' }: { children: string; icon?: string }) {
  return (
    <>
      <span className="btn__label roll">
        <span data-text={children}>{children}</span>
      </span>
      <span className="btn__icon" aria-hidden="true">
        {icon}
      </span>
    </>
  )
}

/** Section label: a drawing-sheet index number, a rule, and the section name. */
export function Eyebrow({ index, children, as: Tag = 'p' }: { index?: string; children: React.ReactNode; as?: 'p' | 'h2' }) {
  return (
    <Tag className="eyebrow" data-reveal>
      {index ? <span className="eyebrow__num">{index}</span> : null}
      <span className="eyebrow__rule" aria-hidden="true" />
      <span>{children}</span>
    </Tag>
  )
}

type PageHeadProps = {
  sheet: string
  eyebrow: string
  title: string
  lede?: React.ReactNode
  children?: React.ReactNode
}

/** Opening of every inner page, laid out like the head of a drawing sheet. */
export function PageHead({ sheet, eyebrow, title, lede, children }: PageHeadProps) {
  return (
    <header className="page-head">
      <div className="container">
        <p className="page-head__annot" data-reveal>
          <span>Sheet {sheet}</span>
          <span>{eyebrow}</span>
          <span>Ali Asgar &amp; Associates</span>
        </p>
        <div className="page-head__main">
          <h1 className="page-head__title">
            <Words text={title} mode="load" delay={0.1} />
          </h1>
          {lede ? (
            <div className="page-head__lede" data-reveal>
              {lede}
            </div>
          ) : null}
        </div>
        <div className="page-head__foot">
          <span className="rule" data-line aria-hidden="true" />
          {children}
        </div>
      </div>
    </header>
  )
}
