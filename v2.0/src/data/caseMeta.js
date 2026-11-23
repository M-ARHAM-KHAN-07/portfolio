/**
 * Presentation-only data for the cards and case studies. Every figure here
 * comes from the project entries in resume.js. Nothing is invented.
 */

/** The first three appear above the fold. */
export const projectOrder = [
  'healthcare-fhir-platform',
  'aws-serverless',
  'kpi-audit',
  'ad-reconciliation',
  'data-orchestration',
  'cell-classification',
]

/** One headline metric per project, only where a real one exists. */
export const metrics = {
  'healthcare-fhir-platform': { value: 'Privacy by design', label: 'validation, audit logging and de-identification built in' },
  'aws-serverless': { value: 'Mapped and hardened', label: 'a hidden Lambda estate, documented and secured' },
  'kpi-audit': { value: 'Trust restored', label: 'an executive KPI traced and rebuilt at the right grain' },
  'ad-reconciliation': { value: 'Drift caught early', label: 'before it ever reaches a client report' },
}

/** Small architecture flow shown at the top of each case study. */
export const flows = {
  'healthcare-fhir-platform': ['FHIR REST API', 'FastAPI extract + validate', 'S3 raw', 'Airflow + dbt', 'Curated warehouse'],
  'aws-serverless': ['Inbound email', 'S3 trigger', 'Lambda parse', 'RDS PostgreSQL in private VPC'],
  'kpi-audit': ['Source exports', 'BigQuery', 'De-duplicated CTEs', 'Metabase'],
  'ad-reconciliation': ['Ad-platform exports', 'Warehouse tables', 'Row-level diff', 'Audit report'],
  'data-orchestration': ['Raw data', 'dbt staging', 'dbt intermediate', 'dbt marts'],
  'cell-classification': ['Cell images', 'Augmentation', 'MobileNet, InceptionV3, Siamese', 'Classification'],
}

/** One-line card summaries. */
export const blurbs = {
  'healthcare-fhir-platform': 'Privacy-first ingestion that turns paginated FHIR APIs into clean, auditable warehouse data.',
  'aws-serverless': 'Recovered the hidden architecture of an undocumented Lambda estate, then rebuilt and hardened it behind a private network.',
  'kpi-audit': 'Hunted an absurd executive metric down to a join fan-out and restored a figure leadership could trust.',
  'ad-reconciliation': 'Continuous reconciliation that catches drift between ad platforms and the warehouse before a client does.',
  'data-orchestration': 'Replaced brittle ad-hoc runs with layered dbt models and dependency-aware Airflow orchestration.',
  'cell-classification': 'Put transfer learning head to head with a Siamese network on blood-cell imagery.',
}

/** Category tint per project kind. */
export const categoryClass = {
  'Healthcare Data': 'cat-healthcare',
  'Cloud / Serverless': 'cat-cloud',
  'Data Quality': 'cat-quality',
}
