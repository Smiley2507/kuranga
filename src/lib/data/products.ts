export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    longDescription?: string;
    features: string[];
    image: string;
    category: string;
}

export const products: Product[] = [
    {
        id: '1',
        slug: 'quickbooks-desktop',
        name: 'QuickBooks Desktop',
        description: 'A powerful, feature-rich accounting solution designed for organizations that need advanced financial controls, industry-specific tools, and full on-premise data ownership.',
        longDescription: 'QuickBooks Desktop is a powerful, feature-rich accounting solution designed for organizations that need advanced financial controls, industry-specific tools, and full on-premise data ownership. Ideal for manufacturing, NGOs, hotels, schools, and enterprises with complex workflows. We provide all versions (Pro, Premier, and Enterprise) and help you choose the one that best fits your business. QuickBooks brings budgeting, accounting, inventory, payroll, production, taxation, and reporting into one modern platform.',
        features: [
            'Advanced financial controls',
            'Industry-specific tools',
            'On-premise data ownership',
            'Budgeting & Accounting',
            'Inventory & Payroll',
            'Taxation & Reporting'
        ],
        image: '/images/products/quickbooks-desktop.png',
        category: 'Accounting'
    },
    {
        id: '2',
        slug: 'quickbooks-online',
        name: 'QuickBooks Online',
        description: 'A modern cloud-based accounting platform that gives you real-time access to your business finances from anywhere, on any device.',
        longDescription: 'QuickBooks Online is a modern cloud-based accounting platform that gives you real-time access to your business finances from anywhere, on any device (phone, tablet, or computer). It is ideal for SMEs looking for automation, easy collaboration, online invoicing, and seamless integration with third-party applications. We provide all business versions (Simple Start, Essentials, Plus, and Advanced) and help you choose the one that best fits your needs. With QuickBooks Online, you gain better financial visibility, save time on manual tasks, and make smarter business decisions through accurate, real-time reporting.',
        features: [
            'Real-time access anywhere',
            'Automation & Easy collaboration',
            'Online invoicing',
            'Third-party integrations',
            'Accurate reporting'
        ],
        image: '/images/products/quickbooks-online.png',
        category: 'Cloud Accounting'
    },
    {
        id: '3',
        slug: 'quickbooks-desktop-remote',
        name: 'QuickBooks Desktop Remote',
        description: 'Combines the robust features of QuickBooks Desktop with the flexibility of cloud technology.',
        longDescription: 'It is a modern, secure, and scalable solution that combines the robust features of QuickBooks Desktop versions(Pro,Premier,Enterprise) with the flexibility of cloud technology. Hosted on a remote server, it allows businesses to access their accounting system anytime, anywhere, and on any device. This setup enables real-time multi-user collaboration, centralized data management, secure backups, and encrypted data exchange. Ideal for SMEs, accountants, and finance teams, QuickBooks Desktop Cloud delivers powerful accounting capabilities with the convenience of mobility, transparency, and efficient financial control without the need for costly IT infrastructure.',
        features: [
            'Remote access to Desktop version',
            'Real-time multi-user collaboration',
            'Centralized data management',
            'Secure backups & Encryption',
            'Cost-effective IT infrastructure'
        ],
        image: '/images/products/quickbooks-remote.jpg',
        category: 'Cloud Solutions'
    },
    {
        id: '4',
        slug: 'teamroll',
        name: 'TeamRoll (HR & Payroll Software)',
        description: 'Innovative cloud-based HR & Payroll software customised for Rwanda compliant.',
        longDescription: 'TeamRoll is an innovative cloud-based HR & Payroll software customised for Rwanda compliant. It automates employee records, leave and contract management, payroll processing, taxes, RSSB deductions, and payslip generation, fully integrable with QuickBooks and other core business systems.',
        features: [
            'Rwanda compliant payroll',
            'Employee records & Leave management',
            'Tax & RSSB automation',
            'QuickBooks integration',
            'Payslip generation'
        ],
        image: '/images/products/teamroll.jpg',
        category: 'HR & Payroll'
    },
    {
        id: '5',
        slug: 'asset-accountant',
        name: 'AssetAccountant',
        description: 'A smart fixed-asset management software that tracks assets from acquisition to disposal.',
        longDescription: 'A smart fixed-asset management software that tracks assets from acquisition to disposal. It automates depreciation, reporting, and compliance, seamlessly integrating with QuickBooks and Xero for accurate asset accounting.',
        features: [
            'Asset lifecycle tracking',
            'Automated depreciation',
            'Compliance reporting',
            'QuickBooks & Xero integration'
        ],
        image: '/images/products/asset-accountant.jpg',
        category: 'Asset Management'
    },
    {
        id: '6',
        slug: 'xero',
        name: 'Xero',
        description: 'User-friendly cloud accounting software offering automated reconciliation and online invoicing.',
        longDescription: 'A user-friendly cloud accounting software offering automated reconciliation, online invoicing, budgeting, and insightful financial reporting for small and medium businesses.',
        features: [
            'Automated reconciliation',
            'Online invoicing',
            'Budgeting',
            'Financial reporting'
        ],
        image: '/images/products/xero.jpg',
        category: 'Cloud Accounting'
    },
    {
        id: '7',
        slug: 'fathom',
        name: 'Fathom',
        description: 'A powerful financial analysis and performance-reporting tool.',
        longDescription: 'A powerful financial analysis and performance-reporting tool. It converts your accounting data into dynamic dashboards, KPIs, and visual insights to enhance strategic decision-making.',
        features: [
            'Dynamic dashboards',
            'KPI tracking',
            'Visual insights',
            'Performance reporting'
        ],
        image: '/images/products/fathom.jpg',
        category: 'Analytics'
    },
    {
        id: '8',
        slug: 'transaction-pro',
        name: 'Transaction Pro',
        description: 'Easily manage your QuickBooks data with Transaction Pro Importer.',
        longDescription: 'Easily manage your QuickBooks data with Transaction Pro Importer. Import, export, and delete batch transactions, invoices, customers, vendors, and other lists effortlessly. It saves time, reduces errors, and streamlines your accounting workflow by handling large volumes of data quickly and accurately, making QuickBooks work smarter for your business.',
        features: [
            'Batch import/export/delete',
            'Reduce data entry errors',
            'Streamline accounting workflow',
            'Handle large data volumes'
        ],
        image: '/images/products/transaction-pro.jpg',
        category: 'Utility'
    }
];
