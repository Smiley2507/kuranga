export interface Service {
    id: string;
    slug: string;
    title: string;
    description: string;
    image: string;
    features?: string[];
}

export const services: Service[] = [
    {
        id: '1',
        slug: 'software-sales-installation',
        title: 'Software Sales & Installation',
        description: 'We provide discounted sales and installation of leading desktop accounting software, including QuickBooks, as well as affordable online solutions and specialized add-ons. Our goal is to offer reliable, cost-effective tools that support efficient financial management for businesses of all sizes.',
        image: '/images/services/software-sales.png',
        features: [
            'Discounted software licenses',
            'Expert onsite installation',
            'Comprehensive software configuration',
            'Cross-platform compatibility'
        ]
    },
    {
        id: '2',
        slug: 'initial-setup',
        title: 'Initial Setup',
        description: 'Professional installation and configuration of accounting and business systems. We align your chart of accounts, workflows, user roles, and settings to best fit your industry needs.',
        image: '/images/services/setup.png',
        features: [
            'Chart of accounts alignment',
            'Workflow optimization',
            'User role & permission management',
            'Industry-specific settings'
        ]
    },
    {
        id: '3',
        slug: 'software-customization',
        title: 'Software Customization',
        description: 'Tailoring QuickBooks, TeamRoll, AssetAccountant, Xero, Fathom, and Taxation Systems to match your operations.',
        image: '/ASA2.jpg',
        features: [
            'Personalized report templates',
            'Custom dashboard creation',
            'Integration of niche tools',
            'User-interface adjustments'
        ]
    },
    {
        id: '4',
        slug: 'system-analysis-development',
        title: 'System Analysis & Development',
        description: 'We examine workflows, identify gaps, and design Custom-built digital systems tailored to your operations for efficiency and compliance, including HR solutions, payroll automation, dashboards, ERP modules, and workflow tools—built for efficiency and growth.',
        image: '/business.jpg',
        features: [
            'Gap analysis in current workflows',
            'Custom ERP module development',
            'Automated HR & Payroll pipelines',
            'Scalable system architecture'
        ]
    },
    {
        id: '5',
        slug: 'trainings',
        title: 'Trainings',
        description: 'We offer practical, certified training in QuickBooks (all versions), endorsed by the Ministry of Education, along with other essential accounting and business tools. Our programs are customized for individuals, professionals, organizations, and educational institutions.',
        image: '/images/services/trainings.png',
        features: [
            'Ministry of Education endorsed',
            'One-on-one personal coaching',
            'Corporate group sessions',
            'Practical, real-world case studies'
        ]
    },
    {
        id: '6',
        slug: 'bookkeeping',
        title: 'Bookkeeping',
        description: 'Reliable, accurate, and compliant bookkeeping services tailored to your business. We ensure clean financial records, proper reconciliation, and adherence to Rwanda’s accounting and tax standards.',
        image: '/ASA4.jpg',
        features: [
            'Daily/Weekly transaction entries',
            'Bank reconciliation',
            'Accounts payable & receivable',
            'Standardized record archives'
        ]
    },
    {
        id: '7',
        slug: 'report-analysis-customization',
        title: 'Report Analysis & Customization',
        description: 'Advanced interpretation and analysis of financial reports including performance metrics, cash flow, profitability, variances, and risk indicators. We provide insights and custom dashboards for informed decision-making.',
        image: '/ASA3.jpg',
        features: [
            'Cash flow & profitability analysis',
            'Risk indicator tracking',
            'Strategic financial insights',
            'Custom management dashboards'
        ]
    },
    {
        id: '8',
        slug: 'multi-user-environment-setup',
        title: 'Multi-User Environment Setup (LAN)',
        description: 'Secure and optimized office network setup for multi-user systems such as QuickBooks Desktop. Ensures fast performance, stability, and protected access across your organization.',
        image: '/kuranga-meet3.jpg',
        features: [
            'High-speed office network LAN',
            'Secure multi-user database access',
            'System performance tuning',
            'Stability & redundancy'
        ]
    },
    {
        id: '9',
        slug: 'data-migration',
        title: 'Data Migration',
        description: 'Whether moving from another accounting software to QuickBooks or upgrading your existing QuickBooks version, we ensure all your transactions are accurately migrated. We seamlessly transfer your financial data to QuickBooks with our secure data migration services.',
        image: '/images/services/data-migration.png',
        features: [
            'Zero data loss guarantee',
            'Cleanup of legacy data',
            'System upgrade management',
            'Minimal downtime migration'
        ]
    },
    {
        id: '10',
        slug: 'daas',
        title: 'DaaS (Desktop as a Service)',
        description: 'Secure, cloud-based access to your desktop software from anywhere. Enables multiple users to work on all Desktop Applications in real time with automatic backups and strong security.',
        image: '/ASA2.jpg'
    },
    {
        id: '11',
        slug: 'integration',
        title: 'Integration',
        description: 'Connecting your QuickBooks and Xero with HR&Payroll platforms, POS, CRM tools, banking APIs, Inventory systems, and other digital solutions to create a unified business ecosystem.',
        image: '/business.jpg'
    },
    {
        id: '12',
        slug: 'system-maintenance-support',
        title: 'System Maintenance, Assistance & Support',
        description: 'End-to-end technical support covering system updates, troubleshooting, security checks, performance optimization, and ongoing system guidance.',
        image: '/kuranga1.jpg'
    },
    {
        id: '13',
        slug: 'advisory-services',
        title: 'Advisory Services',
        description: 'Expert guidance in digital finance, system optimization, financial processes, automation, compliance, and best practices to help businesses operate efficiently.',
        image: '/ASA4.jpg'
    }
];
