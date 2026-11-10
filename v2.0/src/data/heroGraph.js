/**
 * The hero's living data system. Every node is a technology that appears
 * elsewhere in the portfolio, laid out as a plausible flow: sources at the
 * top, ingestion and transformation in the middle, storage below that, and
 * the surfaces people actually open at the bottom.
 *
 * Coordinates are in the SVG viewBox space (0 0 520 480).
 */

export const nodes = [
  { id: 'api', label: 'Web APIs', x: 72, y: 58, tier: 'source', anchor: 'start' },
  { id: 'email', label: 'Inbound Email', x: 300, y: 48, tier: 'source', anchor: 'start' },

  { id: 'python', label: 'Python', x: 62, y: 172, tier: 'move', anchor: 'start' },
  { id: 'lambda', label: 'AWS Lambda', x: 292, y: 158, tier: 'move', anchor: 'start' },
  { id: 'airflow', label: 'Airflow', x: 446, y: 108, tier: 'move', anchor: 'end' },

  { id: 'dbt', label: 'dbt', x: 172, y: 262, tier: 'shape', anchor: 'start' },

  { id: 'bigquery', label: 'BigQuery', x: 334, y: 268, tier: 'store', anchor: 'start' },
  { id: 'postgres', label: 'PostgreSQL', x: 74, y: 350, tier: 'store', anchor: 'start' },

  { id: 'opensearch', label: 'OpenSearch', x: 436, y: 366, tier: 'serve', anchor: 'end' },
  { id: 'metabase', label: 'Metabase', x: 214, y: 432, tier: 'serve', anchor: 'start' },
]

export const edges = [
  ['api', 'python'],
  ['email', 'lambda'],
  ['python', 'dbt'],
  ['airflow', 'dbt'],
  ['lambda', 'postgres'],
  ['lambda', 'bigquery'],
  ['dbt', 'bigquery'],
  ['bigquery', 'metabase'],
  ['postgres', 'metabase'],
  ['bigquery', 'opensearch'],
]

/** Accent per tier, so the flow reads violet at the top and cyan at the end. */
export const tierColor = {
  source: 'var(--color-violet)',
  move: 'var(--color-violet)',
  shape: 'var(--color-violet-deep)',
  store: 'var(--color-cyan)',
  serve: 'var(--color-cyan)',
}
