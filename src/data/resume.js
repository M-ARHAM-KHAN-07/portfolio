/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio; components read from it directly.
 */

export const profile = {
  name: 'Muhammad Arham Khan',
  role: 'Data Engineer',
  location: 'Lahore, Pakistan',
  email: 'marhamkhan43@gmail.com',
  phone: '+92 330 421 2884',
  github: 'https://github.com/M-ARHAM-KHAN-07',
  githubHandle: 'M-ARHAM-KHAN-07',
  linkedin: 'https://www.linkedin.com/in/arham-khan7',
  linkedinHandle: 'arham-khan7',
  // Place the PDF at public/resume.pdf (see README).
  resume: 'resume.pdf',
  headline: 'I build data pipelines that executives can actually trust.',
  summary:
    'Data Engineer designing and automating ETL/ELT pipelines, lakehouse and cloud warehouse platforms, and BI reporting for enterprise clients. I work across Spark/Databricks, Airflow and dbt, root-causing data quality issues, building validation frameworks, and shipping dashboards that drive decision-making.',
  heroStack: [
    'Python',
    'SQL',
    'Apache Spark',
    'Databricks',
    'Airflow',
    'dbt',
    'Snowflake',
    'AWS',
  ],
}

export const stats = [
  { value: '7+', label: 'Enterprise pipelines shipped' },
  { value: '<2%', label: 'Validation variance vs. source' },
  { value: '~30%', label: 'Manual reporting effort removed' },
]

export const experience = [
  {
    company: 'DotLabs',
    role: 'Data Engineer',
    period: 'Jul 2025 - Present',
    current: true,
    blurb:
      'Own end-to-end delivery of ingestion, transformation and BI layers for a portfolio of enterprise clients.',
    highlights: [
      {
        text: 'Engineered end-to-end ETL pipelines from web APIs to AWS EC2, then trained an XGBoost price-prediction model and shipped results through a Streamlit app.',
      },
      {
        text: 'Root-caused a critical KPI aggregation bug in a Metabase/BigQuery reporting stack that had inflated a core delivery metric to 4,032%.',
        metric: '4,032% → 85.6%',
      },
      {
        text: 'Designed automated data-validation workflows reconciling ad-platform exports against warehouse output at daily and ad-set granularity, producing client-facing audit reports.',
        metric: 'within 2% accuracy',
      },
      {
        text: 'Built Power BI dashboards for Escana (oil & gas), consolidating 5+ KPI streams into a single executive reporting view.',
        metric: '~30% less manual reporting',
      },
      {
        text: 'Automated multi-source ingestion (Facebook Ads, Google Ads, QuickBooks) into S3 / Blob storage with Fivetran for DentalLook, eliminating manual data entry entirely.',
      },
      {
        text: 'Authored dbt transformation models and Apache Airflow DAGs for the Kasper project, cutting pipeline failures through proper orchestration and dependency management.',
      },
      {
        text: 'Unified Stripe, RevenueCat, Amplitude and BigQuery sources into one warehouse for Staffan and surfaced it in a real-time Looker Studio dashboard.',
      },
    ],
    stack: ['Airflow', 'dbt', 'BigQuery', 'AWS EC2/S3', 'Metabase', 'Power BI', 'Fivetran', 'Streamlit'],
  },
  {
    company: 'Askaan Tech Labs',
    role: 'Data / AI Engineer Intern',
    period: 'Jun 2024 - Sep 2024',
    current: false,
    blurb: 'Applied ML work across the full modelling lifecycle, from raw data to deployed regressors.',
    highlights: [
      {
        text: 'Developed and deployed regression models (Linear Regression, Random Forest) with cross-validation that outperformed baseline benchmarks.',
      },
      {
        text: 'Performed end-to-end preprocessing (missing-value handling, outlier detection and standardization) to guarantee model-ready inputs.',
      },
      {
        text: 'Ran exploratory data analysis using statistical methods to drive feature engineering decisions.',
      },
    ],
    stack: ['Python', 'scikit-learn', 'Random Forest', 'EDA', 'Feature Engineering'],
  },
]

export const projects = [
  {
    title: 'Cameron: AWS Serverless Pipeline Engineering',
    kind: 'Cloud / Serverless',
    featured: true,
    description:
      'Audited a production AWS Lambda codebase of 17 undocumented function directories and grouped them into 7 logical pipelines through static analysis alone, without touching source. Then rebuilt two of them from scratch in an isolated sandbox: an SES/S3 email ingestion pipeline and a 4-stage event-driven call-notes pipeline that transcribes recordings and drafts summary notes with Claude on Amazon Bedrock.',
    architecture: [
      'Mapped 17 Lambdas onto 7 pipelines by static analysis of imports, environment variables and cross-service calls',
      'S3-triggered Lambdas parse inbound .eml MIME messages, route CSV attachments by filename pattern and load them into PostgreSQL on RDS',
      'Pure-Python pg8000 driver packaged as a custom deployment bundle, avoiding compiled dependencies and Lambda Layers entirely',
      'VPC hardening: RDS moved off the public internet behind scoped security groups, a Gateway endpoint for S3 and an Interface endpoint for Secrets Manager with private DNS',
      'Call-notes flow: DynamoDB Streams as the state tracker driving four chained Lambdas through Transcribe, Bedrock and SES',
      'Designed for graceful degradation when Transcribe proved unavailable in-region, substituting stand-in data in the exact output format to keep every downstream contract intact',
    ],
    impact:
      'Traced a silent, output-free VPC timeout to a single missing Gateway endpoint route table association using timing instrumentation',
    stack: [
      'AWS Lambda',
      'S3',
      'RDS PostgreSQL',
      'DynamoDB Streams',
      'VPC',
      'Secrets Manager',
      'Amazon Bedrock',
      'Transcribe',
      'SES',
      'Python / boto3',
    ],
  },
  {
    title: 'KPI Integrity Audit: Metabase & BigQuery',
    kind: 'Data Quality',
    featured: true,
    description:
      'A core delivery metric was reporting 4,032% on an executive dashboard. Traced the fault through the Metabase question, the underlying SQL and the BigQuery aggregation grain, then rebuilt the metric on a correct join/grain and validated it against source records.',
    architecture: [
      'Isolated fan-out from a many-to-many join inflating the numerator',
      'Rewrote aggregation at the correct grain with de-duplicated CTEs',
      'Back-tested corrected output against raw source exports',
    ],
    impact: 'Metric corrected from 4,032% to an accurate 85.6%',
    stack: ['BigQuery', 'SQL', 'Metabase', 'Data Modelling'],
  },
  {
    title: 'Ad-Spend Reconciliation & Validation Framework',
    kind: 'Pipeline / QA',
    featured: true,
    description:
      'Automated reconciliation comparing ad-platform exports against warehouse output at daily and ad-set granularity, flagging drift before it reached client reporting and generating an audit report on every run.',
    architecture: [
      'Scheduled extraction of platform exports vs. warehouse tables',
      'Row-level diffing at daily × ad-set granularity with tolerance thresholds',
      'Automated client-facing audit report generation',
    ],
    impact: 'Sustained accuracy within 2% across reporting periods',
    stack: ['Python', 'SQL', 'BigQuery', 'Data Validation'],
  },
  {
    title: 'Kasper: dbt + Airflow Orchestration',
    kind: 'Data Platform',
    featured: true,
    description:
      'Designed the transformation layer as modular dbt models and orchestrated the full load with Apache Airflow DAGs, replacing brittle ad-hoc runs with dependency-aware, retryable scheduling.',
    architecture: [
      'Layered dbt models (staging → intermediate → marts)',
      'Airflow DAGs with task dependencies, retries and alerting',
      'Warehouse-native transformations for testable, versioned SQL',
    ],
    impact: 'Materially fewer pipeline failures through automated orchestration',
    stack: ['dbt', 'Apache Airflow', 'SQL', 'Data Warehousing'],
  },
  {
    title: 'Lakehouse Pipeline: Spark on Databricks',
    kind: 'Big Data',
    featured: true,
    description:
      'A medallion-architecture lakehouse built on Databricks: raw source files land in bronze, PySpark jobs clean and conform them into silver, and business-grain Delta tables serve gold. Orchestrated end to end rather than run by hand.',
    architecture: [
      'Bronze → silver → gold Delta Lake layers with schema enforcement and time travel',
      'PySpark transformations with partitioning and predicate pushdown for large scans',
      'Azure Data Factory / Airflow triggering Databricks jobs on a dependency-aware schedule',
      'Gold tables published to Snowflake for downstream BI consumption',
    ],
    stack: ['Apache Spark', 'Databricks', 'PySpark', 'Delta Lake', 'Azure Data Factory', 'Snowflake'],
  },
  {
    title: 'Warehouse Copilot: RAG over Data Platform Metadata',
    kind: 'AI / LLM',
    featured: true,
    description:
      'A retrieval-augmented assistant that answers questions about the data platform itself: what a table means, which model produces it, where a column comes from. Indexes dbt docs, schema metadata and column descriptions so analysts stop asking the same questions in Slack.',
    architecture: [
      'Ingest dbt manifest, catalog metadata and column-level docs as the knowledge corpus',
      'Chunk + embed into a vector store, retrieving by semantic similarity at query time',
      'Grounded LLM responses that cite the source model rather than free-associating',
      'Containerised with Docker and served behind a FastAPI endpoint',
    ],
    stack: ['Python', 'LLM / RAG', 'Vector Search', 'dbt', 'FastAPI', 'Docker'],
  },
  {
    title: 'Escana: Executive Power BI Reporting',
    kind: 'BI & Analytics',
    featured: false,
    description:
      'Consolidated 5+ separate KPI streams for an oil & gas client into a single executive Power BI view, replacing a fragmented manual reporting cycle.',
    architecture: [
      'Unified data model across 5+ KPI sources',
      'Single executive-level reporting surface',
    ],
    impact: '~30% reduction in manual reporting effort',
    stack: ['Power BI', 'SQL', 'Data Modelling'],
  },
  {
    title: 'Staffan: Unified Product Analytics Warehouse',
    kind: 'Data Platform',
    featured: false,
    description:
      'Integrated Stripe, RevenueCat, Amplitude and BigQuery into one warehouse and exposed real-time revenue and engagement analytics through Looker Studio.',
    architecture: [
      'Multi-source ingestion into a unified warehouse schema',
      'Real-time Looker Studio reporting layer',
    ],
    impact: 'Single real-time view of revenue + product engagement',
    stack: ['BigQuery', 'Stripe', 'RevenueCat', 'Amplitude', 'Looker Studio'],
  },
  {
    title: 'Blood Cell Classification: Computer Vision',
    kind: 'Machine Learning',
    featured: false,
    description:
      'Trained and compared MobileNet, InceptionV3 and Siamese network architectures to classify blood cell types, benchmarking transfer learning against similarity-based approaches.',
    architecture: [
      'Transfer learning with MobileNet and InceptionV3 backbones',
      'Siamese network for similarity-based classification',
      'Augmentation pipeline for class balance',
    ],
    impact: 'High classification accuracy across cell types',
    stack: ['Python', 'TensorFlow', 'MobileNet', 'InceptionV3', 'Computer Vision'],
  },
]

export const skillGroups = [
  {
    title: 'Languages & Development',
    items: ['Python', 'SQL', 'PySpark', 'Node.js', 'FastAPI', 'Flask', 'REST APIs', 'Web Scraping'],
  },
  {
    title: 'Big Data & Processing',
    items: [
      'Apache Spark',
      'Databricks',
      'PySpark',
      'Delta Lake',
      'Distributed Processing',
      'Batch & Streaming',
    ],
  },
  {
    title: 'Pipelines & Orchestration',
    items: [
      'ETL / ELT Pipelines',
      'Apache Airflow',
      'dbt',
      'Azure Data Factory',
      'AWS Glue',
      'Fivetran',
      'Zapier',
      'Data Validation & QA',
    ],
  },
  {
    title: 'Databases & Warehousing',
    items: [
      'Snowflake',
      'Google BigQuery',
      'PostgreSQL',
      'DynamoDB',
      'MySQL',
      'MariaDB',
      'OpenSearch',
      'Data Warehousing',
      'Dimensional Modelling',
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    items: [
      'AWS (Lambda, EC2, S3, Glue, RDS)',
      'Serverless & Event-Driven Architecture',
      'VPC & Network Security',
      'AWS Secrets Manager',
      'Azure (ADF, Blob Storage)',
      'Docker',
      'Kubernetes',
      'CI/CD for Data Engineering',
      'GitHub Actions',
    ],
  },
  {
    title: 'BI & Analytics',
    items: ['Metabase', 'Power BI', 'Looker Studio', 'Streamlit', 'Qlik', 'Mixpanel', 'KPI Reporting'],
  },
  {
    title: 'AI & Machine Learning',
    items: [
      'LLM / RAG Applications',
      'Amazon Bedrock',
      'Vector Search & Embeddings',
      'XGBoost',
      'Random Forest',
      'Regression',
      'Feature Engineering',
      'Computer Vision',
      'NLP',
    ],
  },
]

export const education = {
  school: 'University of Central Punjab',
  degree: 'B.S. Computer Science',
  period: 'Nov 2021 - Jul 2025',
  gpa: '3.74 / 4.0',
  coursework: [
    'Machine Learning',
    'Deep Learning',
    'Data Science',
    'Databases',
    'Big Data Analysis',
    'Probability & Statistics',
  ],
}

export const navLinks = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
