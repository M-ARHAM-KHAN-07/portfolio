import { useInView } from './Reveal'

/**
 * Splits text into per-character spans that rise into place once when the
 * heading enters view, then stop. Words are kept intact so the line still
 * wraps normally, and the whole string stays readable to screen readers.
 */
export default function Kinetic({ text, as: Tag = 'span', className = '', stagger = 26, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const words = text.split(' ')
  let index = 0

  return (
    <Tag ref={ref} className={`kinetic ${inView ? 'shown' : ''} ${className}`}>
      {/* Readable label for assistive tech; the animated copy is hidden from it */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
            {[...word].map((char, c) => (
              <span
                key={c}
                className="kinetic-char"
                style={{ transitionDelay: `${delay + index++ * stagger}ms` }}
              >
                {char}
              </span>
            ))}
            {w < words.length - 1 && (
              <span
                className="kinetic-char"
                style={{ transitionDelay: `${delay + index++ * stagger}ms` }}
              >
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </span>
    </Tag>
  )
}
