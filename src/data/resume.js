/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio; components read from it directly.
 *
 * Factual rule: everything here traces back to the resume or prior portfolio
 * content. Do not add companies, clients, metrics or results that are not real.
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
  resume: 'resume.pdf',
  tagline: 'Building reliable data systems, pipelines and intelligent applications.',
  summary:
    'Data Engineer specializing in ETL/ELT pipeline design, cloud data warehousing and BI reporting for enterprise clients.',
  heroStack: ['Python', 'SQL', 'Apache Airflow', 'dbt', 'AWS', 'BigQuery'],
}

/** Animated counters. Numeric values so the counter can tween to them. */
export const stats = [
  { value: 7, suffix: '+', label: 'Enterprise pipelines delivered' },
  { value: 85.6, suffix: '%', decimals: 1, label: 'Corrected delivery KPI, down from 4,032%' },
  { value: 2, prefix: '<', suffix: '%', label: 'Validation variance against source' },
  { value: 30, prefix: '~', suffix: '%', label: 'Manual reporting effort removed' },
]

export const about = {
  lead: 'I build the layer between raw source systems and the dashboard someone actually makes a decision on.',
  paragraphs: [
    'My day-to-day is ETL/ELT pipeline design, cloud data warehousing and BI reporting for enterprise clients: extracting from web APIs and ad platforms, transforming with dbt and SQL, orchestrating with Airflow, and landing it somewhere trustworthy in BigQuery, PostgreSQL or S3.',
    'A lot of the work is forensic. Numbers arrive wrong, and someone has to trace a metric back through the dashboard, the query and the join grain until the cause is obvious. I like that part, and I build automated validation so the same fault does not resurface quietly.',
    'More recently I have been working further into AWS serverless architecture and AI services, which is pulling me toward Machine Learning Engineering. It reads as a continuation rather than a pivot: the same pipelines, with models as another consumer of well-modelled data.',
  ],
}

export const experience = [
  {
    id: 'dotlabs',
    company: 'DotLabs',
    site: 'dotlabs.ai',
    role: 'Data Engineer',
    current: true,
    blurb:
      'End-to-end delivery of ingestion, transformation and BI layers for a portfolio of enterprise clients.',
    highlights: [
      {
        text: 'Built and maintained Metabase BI dashboards for enterprise clients, writing complex SQL against BigQuery data warehouses, and root-caused a critical KPI aggregation bug that had inflated a core delivery metric to 4,032%.',
        metric: '4,032% to 85.6%',
      },
      {
        text: 'Architected a serverless AWS pipeline (SES to S3 to Lambda to Step Functions to ECS/Fargate to RDS) that ingests CSV attachments from inbound email, validates and transforms them in containerized jobs deployed via ECR, and loads results to RDS with automated status notifications.',
      },
      {
        text: 'Designed automated data-validation workflows reconciling ad-platform exports against warehouse output at daily and ad-set granularity, producing client-facing audit reports.',
        metric: 'within 2% accuracy',
      },
      {
        text: 'Built Power BI dashboards for Escana (oil company), consolidating 5+ KPI streams into a single executive reporting view.',
        metric: '~30% less manual reporting',
      },
      {
        text: 'Designed dbt transformation models and Apache Airflow DAGs for the Kasper project, reducing pipeline failures through automated orchestration.',
      },
      {
        text: 'Engineered end-to-end ETL pipelines from web APIs to AWS EC2, trained an XGBoost price-prediction model and delivered results through a Streamlit application.',
      },
      {
        text: 'Integrated pipelines from Stripe, RevenueCat, Amplitude and BigQuery into a unified warehouse and built a Looker Studio dashboard for real-time analytics (Staffan).',
      },
      {
        text: 'Automated multi-source data ingestion (Facebook/Google Ads, QuickBooks) into S3/Blob storage using Fivetran, eliminating manual data entry (DentalLook).',
      },
    ],
    stack: [
      'Python',
      'SQL',
      'BigQuery',
      'Apache Airflow',
      'dbt',
      'AWS Lambda',
      'Step Functions',
      'ECS/Fargate',
      'RDS',
      'Metabase',
      'Power BI',
      'Fivetran',
    ],
  },
  {
    id: 'askaan',
    company: 'Askaan Tech Labs',
    site: null,
    role: 'Data / AI Engineer Intern',
    current: false,
    blurb: 'Applied ML across the full modelling lifecycle, from raw data to deployed regressors.',
    highlights: [
      {
        text: 'Developed and deployed regression models (Linear Regression, Random Forest) with cross-validation, outperforming baseline benchmarks.',
      },
      {
        text: 'Performed end-to-end data preprocessing, including missing-value handling, outlier detection and standardization, to ensure model-ready inputs.',
      },
      {
        text: 'Conducted exploratory data analysis using statistical methods to drive feature engineering decisions.',
      },
    ],
    stack: ['Python', 'scikit-learn', 'Random Forest', 'EDA', 'Feature Engineering'],
  },
]

export const projects = [
  {
    id: 'aws-serverless',
    title: 'AWS Serverless Pipeline Engineering',
    client: 'Cameron',
    kind: 'Cloud / Serverless',
    featured: true,
    summary:
      'Audited a production Lambda codebase of 17 undocumented functions into 7 logical pipelines, then rebuilt two of them from scratch in an isolated sandbox, including full VPC hardening.',
    problem:
      'A production AWS Lambda codebase had grown to 17 function directories with no organizational structure and no documentation of which AWS services or data flows each one depended on. Nothing described how the pieces fit together.',
    architecture: [
      'Mapped 17 Lambdas onto 7 logical pipelines by static analysis of imports, environment variables and cross-service calls, without altering any source code',
      'Email ingestion rebuild: S3-triggered Lambdas parse inbound MIME messages, route CSV attachments by filename pattern and load them into PostgreSQL on RDS',
      'Packaged the pure-Python pg8000 driver as a custom deployment bundle, avoiding compiled dependencies and Lambda Layers entirely',
      'VPC hardening: RDS moved off the public internet behind scoped security groups, a Gateway endpoint for S3 and an Interface endpoint for Secrets Manager with private DNS',
      'Call-notes rebuild: DynamoDB Streams as the state tracker driving four chained Lambdas through Transcribe, Bedrock and SES',
      'Designed for graceful degradation when Transcribe proved unavailable in-region, substituting stand-in data in the exact output format to keep every downstream contract intact',
    ],
    results: [
      'Seven documented pipelines recovered from an undocumented codebase: email ingestion, payroll ETL, clinical data reporting, telephony and call processing, financial reporting, spreadsheet sync and a third-party cost-optimization module',
      'Both sandbox pipelines verified end to end, including a live database client connection after the network hardening',
      'Traced a silent, output-free VPC timeout to a single missing Gateway endpoint route table association using timing instrumentation rather than guesswork',
      'Database credentials rotated through Secrets Manager instead of being hardcoded',
    ],
    learned:
      'Gateway and Interface VPC endpoints gate access by entirely different mechanisms, so a security group rule cannot fix a routing problem. More broadly: telling a code bug apart from a configuration, regional or account-level constraint is its own diagnostic skill, and instrumenting the timing of each network call beats guessing at rules.',
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
    id: 'kpi-audit',
    title: 'KPI Integrity Audit',
    client: 'Metabase & BigQuery',
    kind: 'Data Quality',
    featured: true,
    summary:
      'A core delivery metric was reporting 4,032% on an executive dashboard. Traced the fault to the aggregation grain and rebuilt the metric correctly.',
    problem:
      'An executive-facing Metabase dashboard was showing a core delivery metric at 4,032%, a figure that was obviously wrong but whose cause sat somewhere across the dashboard question, the underlying SQL and the BigQuery data model.',
    architecture: [
      'Worked back through the Metabase question, the underlying SQL and the BigQuery aggregation grain',
      'Isolated fan-out from a many-to-many join that was inflating the numerator',
      'Rewrote the aggregation at the correct grain using de-duplicated CTEs',
      'Back-tested the corrected output against raw source exports',
    ],
    results: [
      'Metric corrected from 4,032% to an accurate 85.6%',
      'Executive reporting restored to a trustworthy figure',
    ],
    learned:
      'A metric that is visibly absurd is the lucky case. The same join fan-out producing a plausible-looking number is the one that quietly misleads a decision, which is what pushed me toward building validation as a standing process rather than a one-off fix.',
    stack: ['BigQuery', 'SQL', 'Metabase', 'Data Modelling'],
  },
  {
    id: 'ad-reconciliation',
    title: 'Ad-Spend Reconciliation Framework',
    client: null,
    kind: 'Pipeline / QA',
    featured: true,
    summary:
      'Automated reconciliation comparing ad-platform exports against warehouse output at daily and ad-set granularity, with a client-facing audit report on every run.',
    problem:
      'Warehouse output and the numbers in the ad platforms could drift apart without anyone noticing until a client questioned a report. There was no systematic check that the two agreed.',
    architecture: [
      'Scheduled extraction of ad-platform exports alongside the corresponding warehouse tables',
      'Row-level diffing at daily and ad-set granularity with tolerance thresholds',
      'Automated generation of client-facing audit reports on every run',
    ],
    results: [
      'Consistent accuracy within 2% between platform exports and warehouse output',
      'Drift surfaced before it reached client reporting rather than after',
    ],
    stack: ['Python', 'SQL', 'BigQuery', 'Data Validation'],
  },
  {
    id: 'kasper',
    title: 'dbt and Airflow Orchestration',
    client: 'Kasper',
    kind: 'Data Platform',
    featured: true,
    summary:
      'Designed the transformation layer as modular dbt models and orchestrated the full load with Airflow DAGs, replacing brittle ad-hoc runs.',
    problem:
      'Transformations were running ad-hoc, which meant failures were discovered late and reruns depended on someone remembering the correct order.',
    architecture: [
      'Layered dbt models: staging, then intermediate, then marts',
      'Airflow DAGs with explicit task dependencies, retries and alerting',
      'Warehouse-native transformations so the SQL is testable and versioned',
    ],
    results: ['Reduced pipeline failures through automated, dependency-aware orchestration'],
    stack: ['dbt', 'Apache Airflow', 'SQL', 'Data Warehousing'],
  },
  {
    id: 'escana',
    title: 'Executive Power BI Reporting',
    client: 'Escana',
    kind: 'BI & Analytics',
    featured: false,
    summary:
      'Consolidated 5+ separate KPI streams for an oil company into a single executive Power BI view.',
    problem:
      'Executive reporting for an oil company was assembled by hand from more than five separate KPI streams, making the reporting cycle slow and repetitive.',
    architecture: [
      'Unified data model spanning 5+ KPI sources',
      'A single executive-level reporting surface in Power BI',
    ],
    results: [
      '5+ KPI streams consolidated into one executive view',
      'Approximately 30% reduction in manual reporting effort',
    ],
    stack: ['Power BI', 'SQL', 'Data Modelling'],
  },
  {
    id: 'staffan',
    title: 'Unified Product Analytics Warehouse',
    client: 'Staffan',
    kind: 'Data Platform',
    featured: false,
    summary:
      'Integrated Stripe, RevenueCat, Amplitude and BigQuery into one warehouse, surfaced through a real-time Looker Studio dashboard.',
    problem:
      'Revenue and product engagement data lived in four separate systems, so no single place answered how the product was actually performing.',
    architecture: [
      'Multi-source ingestion from Stripe, RevenueCat and Amplitude into a unified warehouse schema',
      'A real-time Looker Studio reporting layer on top of BigQuery',
    ],
    results: ['A single real-time view of revenue and product engagement'],
    stack: ['BigQuery', 'Stripe', 'RevenueCat', 'Amplitude', 'Looker Studio'],
  },
  {
    id: 'dentallook',
    title: 'Multi-Source Ingestion Automation',
    client: 'DentalLook',
    kind: 'Pipeline / QA',
    featured: false,
    summary:
      'Automated ingestion from Facebook/Google Ads and QuickBooks into S3/Blob storage with Fivetran, removing manual data entry entirely.',
    problem:
      'Marketing and accounting data was being entered by hand from Facebook Ads, Google Ads and QuickBooks, which is slow and a reliable source of transcription errors.',
    architecture: [
      'Fivetran connectors for Facebook Ads, Google Ads and QuickBooks',
      'Automated landing into S3 and Blob storage on a managed schedule',
    ],
    results: ['Manual data entry eliminated for the ingested sources'],
    stack: ['Fivetran', 'AWS S3', 'Azure Blob Storage', 'Facebook Ads', 'Google Ads', 'QuickBooks'],
  },
  {
    id: 'price-prediction',
    title: 'Price Prediction ETL and Model Delivery',
    client: null,
    kind: 'Machine Learning',
    featured: false,
    summary:
      'End-to-end ETL from web APIs to AWS EC2, an XGBoost price-prediction model trained on the result, delivered through a Streamlit application.',
    problem:
      'Price prediction needed both a reliable feed of source data and a way for non-engineers to actually interact with the model output.',
    architecture: [
      'End-to-end ETL pipelines pulling from web APIs into AWS EC2',
      'XGBoost model trained for price prediction on the ingested data',
      'Streamlit application as the delivery surface for model results',
    ],
    results: ['Model results delivered to users through a working Streamlit application'],
    stack: ['Python', 'XGBoost', 'AWS EC2', 'Streamlit', 'REST APIs'],
  },
  {
    id: 'cell-classification',
    title: 'Blood Cell Classification',
    client: null,
    kind: 'Machine Learning',
    featured: false,
    summary:
      'Trained and compared MobileNet, InceptionV3 and Siamese network architectures to classify blood cell types.',
    problem:
      'Classifying blood cell types from images, and establishing whether transfer learning or a similarity-based approach performed better on the task.',
    architecture: [
      'Transfer learning using MobileNet and InceptionV3 backbones',
      'A Siamese network for similarity-based classification',
      'Augmentation pipeline to address class balance',
    ],
    results: ['High classification accuracy across blood cell types'],
    stack: ['Python', 'TensorFlow', 'MobileNet', 'InceptionV3', 'Computer Vision'],
  },
]

/**
 * Toolkit visualisation. Deliberately presented as a map of tools across pipeline
 * stages, NOT as a single production architecture.
 */
export const architectureLayers = [
  {
    stage: 'Sources',
    caption: 'Where the data comes from',
    nodes: [
      { name: 'Web APIs', note: 'Extracted into ETL pipelines landing on AWS EC2.' },
      {
        name: 'Facebook / Google Ads',
        note: 'Ad-platform exports ingested via Fivetran and reconciled against warehouse output.',
      },
      { name: 'Stripe', note: 'Revenue data integrated into a unified warehouse for Staffan.' },
      { name: 'RevenueCat', note: 'Subscription data unified alongside Stripe and Amplitude.' },
      { name: 'Amplitude', note: 'Product engagement events joined into the Staffan warehouse.' },
      { name: 'QuickBooks', note: 'Accounting data automated into S3/Blob storage for DentalLook.' },
      { name: 'Inbound Email', note: 'CSV attachments arriving over SES as a pipeline trigger.' },
    ],
  },
  {
    stage: 'Ingestion',
    caption: 'Getting it in, reliably',
    nodes: [
      { name: 'Fivetran', note: 'Managed connectors replacing manual data entry for DentalLook.' },
      {
        name: 'AWS Lambda',
        note: 'S3-triggered functions parsing MIME email, routing CSVs and loading RDS.',
      },
      {
        name: 'Step Functions',
        note: 'Coordinating stages of the serverless email ingestion pipeline.',
      },
      {
        name: 'ECS / Fargate',
        note: 'Containerized validation and transformation jobs deployed via ECR.',
      },
      { name: 'Python / boto3', note: 'The glue for custom extraction and AWS service integration.' },
      { name: 'Zapier', note: 'Lightweight automation between SaaS tools.' },
    ],
  },
  {
    stage: 'Transformation',
    caption: 'Making it trustworthy',
    nodes: [
      { name: 'dbt', note: 'Layered staging, intermediate and mart models for the Kasper project.' },
      {
        name: 'Apache Airflow',
        note: 'DAGs with dependencies, retries and alerting driving the load.',
      },
      {
        name: 'SQL',
        note: 'Complex warehouse SQL, including rebuilding a KPI at the correct grain.',
      },
      {
        name: 'Data Validation',
        note: 'Row-level reconciliation of ad exports against warehouse output.',
      },
    ],
  },
  {
    stage: 'Storage',
    caption: 'Where it lands',
    nodes: [
      {
        name: 'BigQuery',
        note: 'Primary warehouse behind Metabase dashboards and client reporting.',
      },
      {
        name: 'PostgreSQL / RDS',
        note: 'Target for the email ingestion pipeline, hardened behind a private VPC.',
      },
      {
        name: 'DynamoDB',
        note: 'Streams-backed state tracker driving the call-notes pipeline.',
      },
      { name: 'AWS S3', note: 'Landing zone for email attachments and multi-source ingestion.' },
      { name: 'MySQL / MariaDB', note: 'Relational sources and targets across client systems.' },
    ],
  },
  {
    stage: 'Search & AI',
    caption: 'Beyond the warehouse',
    nodes: [
      {
        name: 'OpenSearch',
        note: 'Search and log analytics engine within my data-engineering toolkit.',
      },
      { name: 'Amazon Bedrock', note: 'Claude models drafting call summary notes from transcripts.' },
      {
        name: 'Amazon Transcribe',
        note: 'Speech-to-text stage in the event-driven call-notes pipeline.',
      },
      { name: 'XGBoost', note: 'Price-prediction model trained on API-sourced data.' },
    ],
  },
  {
    stage: 'Delivery',
    caption: 'What people actually open',
    nodes: [
      {
        name: 'Metabase',
        note: 'Client-facing BI dashboards backed by complex SQL against BigQuery.',
      },
      { name: 'Power BI', note: 'Executive reporting for Escana, consolidating 5+ KPI streams.' },
      { name: 'Looker Studio', note: 'Real-time revenue and engagement analytics for Staffan.' },
      { name: 'Streamlit', note: 'Delivery surface for XGBoost price-prediction results.' },
      { name: 'Qlik', note: 'BI and analytics tooling.' },
      { name: 'Mixpanel', note: 'Product analytics and KPI reporting.' },
    ],
  },
]

export const stackGroups = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', note: 'Primary language for ETL, AWS Lambda functions and model work.' },
      { name: 'SQL', note: 'Warehouse modelling, complex analytical queries and KPI correction.' },
      { name: 'Node.js', note: 'Service and API development.' },
      { name: 'HTML / CSS', note: 'Front-end fundamentals for delivery surfaces.' },
    ],
  },
  {
    title: 'Data & Storage',
    items: [
      { name: 'BigQuery', note: 'Cloud warehouse behind Metabase and client BI reporting.' },
      { name: 'PostgreSQL', note: 'RDS target for the serverless email ingestion pipeline.' },
      { name: 'MySQL / MariaDB', note: 'Relational databases across client systems.' },
      { name: 'DynamoDB', note: 'Streams-driven state tracking for event-driven pipelines.' },
      { name: 'OpenSearch', note: 'Search and log analytics engine.' },
      { name: 'Data Warehousing', note: 'Dimensional modelling and warehouse design.' },
    ],
  },
  {
    title: 'Pipelines & Orchestration',
    items: [
      { name: 'Apache Airflow', note: 'DAG orchestration with dependencies, retries and alerting.' },
      { name: 'dbt', note: 'Layered, testable, version-controlled warehouse transformations.' },
      {
        name: 'ETL / ELT Design',
        note: 'End-to-end pipeline design from source API to reporting layer.',
      },
      { name: 'Fivetran', note: 'Managed multi-source ingestion into S3 and Blob storage.' },
      { name: 'Zapier', note: 'Lightweight automation between SaaS tools.' },
      {
        name: 'Data Validation & QA',
        note: 'Automated reconciliation and client-facing audit reporting.',
      },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    items: [
      {
        name: 'AWS Lambda',
        note: 'Event-driven functions across email ingestion and call processing.',
      },
      { name: 'Step Functions', note: 'Orchestration across stages of a serverless AWS pipeline.' },
      { name: 'ECS / Fargate', note: 'Containerized transformation jobs deployed through ECR.' },
      { name: 'AWS S3', note: 'Object storage and event source for triggered pipelines.' },
      { name: 'AWS RDS', note: 'Managed PostgreSQL, hardened behind a private VPC.' },
      { name: 'AWS EC2', note: 'Compute for ETL pipelines feeding model training.' },
      { name: 'Amazon SES', note: 'Inbound email ingestion and outbound status notifications.' },
      {
        name: 'VPC & Security Groups',
        note: 'Private networking, endpoint routing and least-exposure design.',
      },
      { name: 'Secrets Manager', note: 'Credential rotation in place of hardcoded secrets.' },
      { name: 'Docker', note: 'Containerizing jobs and services for consistent deployment.' },
    ],
  },
  {
    title: 'BI & Analytics',
    items: [
      { name: 'Metabase', note: 'Client-facing dashboards over BigQuery.' },
      { name: 'Power BI', note: 'Executive KPI consolidation for Escana.' },
      { name: 'Looker Studio', note: 'Real-time analytics dashboard for Staffan.' },
      { name: 'Streamlit', note: 'Lightweight delivery of model output to end users.' },
      { name: 'Qlik', note: 'BI and analytics tooling.' },
      { name: 'Mixpanel', note: 'Product analytics and KPI reporting.' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    items: [
      { name: 'Amazon Bedrock', note: 'Claude models generating summary notes inside a pipeline.' },
      { name: 'Amazon Transcribe', note: 'Speech-to-text as an event-driven pipeline stage.' },
      { name: 'XGBoost', note: 'Gradient-boosted model for price prediction.' },
      { name: 'Random Forest', note: 'Cross-validated regression outperforming baselines.' },
      { name: 'Regression', note: 'Linear and ensemble regression modelling.' },
      { name: 'Feature Engineering', note: 'EDA-driven feature decisions and preprocessing.' },
      {
        name: 'Computer Vision',
        note: 'MobileNet, InceptionV3 and Siamese networks for cell classification.',
      },
      { name: 'NLP', note: 'Text processing within data and AI workflows.' },
    ],
  },
]

export const exploring = [
  {
    name: 'Machine Learning Engineering',
    note: 'Moving from delivering data for models to owning the models themselves.',
  },
  {
    name: 'MLOps',
    note: 'Applying the orchestration and validation discipline of data engineering to model lifecycles.',
  },
  {
    name: 'LLM Applications',
    note: 'Building on the Bedrock integration work from the call-notes pipeline.',
  },
  { name: 'RAG', note: 'Retrieval over warehouse and metadata corpora as a grounding layer.' },
  { name: 'Scalable Data Systems', note: 'Distributed processing and streaming beyond batch ETL.' },
]

export const education = {
  school: 'University of Central Punjab',
  degree: 'B.S. Computer Science',
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
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]
