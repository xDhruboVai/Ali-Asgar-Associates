import { Fragment, type ElementType } from 'react'

type Props = {
  /** Text to split. `*like this*` marks an italic serif accent; `\n` forces a line break. */
  text: string
  as?: ElementType
  className?: string
  id?: string
  /** `load` plays on page load; `fill` brightens word by word with the scroll; `manual` is animated by its parent. */
  mode?: 'scroll' | 'load' | 'fill' | 'manual'
  /** Seconds to wait before a `load` reveal. */
  delay?: number
}

/**
 * Splits a heading into words for the staggered reveal.
 * Assistive technology reads the unsplit copy; the split copy is decorative,
 * and stays fully visible when JavaScript or motion is unavailable.
 */
export function Words({ text, as: Tag = 'span', className, id, mode = 'scroll', delay }: Props) {
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ')
  const lines = text.split('\n')

  return (
    <Tag
      id={id}
      className={['words', mode === 'fill' ? 'words--fill' : null, className].filter(Boolean).join(' ')}
      data-words={mode}
      data-delay={delay}
    >
      <span className="visually-hidden">{plain}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className="words__line">
            {segments(line).map(({ word, accent }, wi) => (
              <Fragment key={wi}>
                <span className="w">
                  <span className={accent ? 'w__i accent' : 'w__i'}>{word}</span>
                </span>{' '}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  )
}

function segments(line: string) {
  const out: { word: string; accent: boolean }[] = []
  line.split(/(\*[^*]+\*)/).forEach((part) => {
    const accent = part.startsWith('*') && part.endsWith('*')
    part
      .replace(/\*/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => out.push({ word, accent }))
  })
  return out
}

/** Sets the ampersand of the firm's name in the serif accent. */
export function withAmpersand(name: string) {
  const [before, after] = name.split(/\s*&\s*/)
  if (!after) return name
  return (
    <>
      {before} <span className="amp">&amp;</span> {after}
    </>
  )
}
