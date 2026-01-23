# ASA SMS - Complete UI Specification

## 🎨 Overall UI Structure

```
ASA SMS Frontend
│
├── Public Website (No Auth)
│   ├── Landing Page
│   ├── Registration Page
│   └── Status Check Page
│
├── Admin Dashboard (Admin Auth)
│   ├── Dashboard Overview
│   ├── Students Management
│   ├── Payment Verification
│   ├── Cohorts Management
│   └── Settings
│
└── Partner Dashboard (Partner Auth)
    ├── Dashboard Overview
    ├── Sponsored Students
    └── Profile Settings
```

---

## 📱 1. PUBLIC WEBSITE (No Authentication)

### 1.1 ASA Landing Page (`/asa`)

**Purpose:** Marketing page to attract students

**Components:**
- `HeroSection`
  - Headline: "Advanced Skills Academy - Transform Your Career"
  - Subheadline: "Industry-focused training programs"
  - CTA Button: "Apply Now" → `/asa/register`
  - CTA Button: "Check Application Status" → `/asa/status`

- `ProgramsSection`
  - Display 4 program types with icons:
    - Graduate/Job Seeker
    - Professional Development
    - Internship Program
    - Entrepreneur Track
  - Each with description and "Learn More" button

- `HowItWorksSection`
  - Step 1: Register & Choose Program
  - Step 2: Submit Payment
  - Step 3: Application Review
  - Step 4: Get Admitted

- `TestimonialsSection`
  - Student success stories
  - Carousel of testimonials

- `FAQSection`
  - Common questions about registration
  - Payment requirements
  - Timeline information

- `CTASection`
  - Final call to action
  - "Start Your Journey Today"

**Actions:**
- Click "Apply Now" → Navigate to `/asa/register`
- Click "Check Status" → Navigate to `/asa/status`

---

### 1.2 Registration Page (`/asa/register`)

**Purpose:** Student registration with dynamic forms

**Layout:** Multi-step wizard or single scrollable form

**Components:**

#### Step 1: Registration Type Selector
```
┌─────────────────────────────────────────┐
│  How do you want to register?          │
│                                         │
│  ○ Regular Student                      │
│     Pay caution fee and apply           │
│                                         │
│  ○ Sponsored Student (Chancen)          │
│     Apply for scholarship sponsorship   │
│                                         │
│            [ Continue → ]               │
└─────────────────────────────────────────┘
```

**Component:** `RegistrationTypeSelector`
- Two radio button options
- Brief description under each
- Highlights for sponsored option
- Validation: Must select one

---

#### Step 2: Personal Information
```
┌─────────────────────────────────────────┐
│  Personal Information                   │
│                                         │
│  Full Name *          [___________]     │
│  Email Address *      [___________]     │
│  Phone Number *       [___________]     │
│  District of Residence * [Dropdown ▼]   │
│                                         │
│         [ ← Back ]  [ Continue → ]      │
└─────────────────────────────────────────┘
```

**Component:** `PersonalInfoForm`
- Text inputs with validation
- District dropdown (Kigali, Gasabo, etc.)
- Real-time validation
- Error messages below fields

---

#### Step 3: Education Background
```
┌─────────────────────────────────────────┐
│  Education Background                   │
│                                         │
│  Highest Education Level * [Dropdown ▼] │
│    - High School                        │
│    - Bachelor's Degree                  │
│    - Master's Degree                    │
│    - PhD                                │
│                                         │
│  University/School Name  [___________]  │
│                                         │
│  [!] For Chancen sponsorship, minimum   │
│      Bachelor's degree required         │
│                                         │
│         [ ← Back ]  [ Continue → ]      │
└─────────────────────────────────────────┘
```

**Component:** `EducationForm`
- Dropdown for education level
- Conditional validation (Sponsored students need Bachelor+)
- Warning message for sponsored students
- Auto-disable "Continue" if validation fails

---

#### Step 4: Program Selection
```
┌─────────────────────────────────────────┐
│  Choose Your Program                    │
│                                         │
│  Training Program *      [Dropdown ▼]   │
│    - Graduate/Job Seeker                │
│    - Professional                       │
│    - Internship                         │
│    - Entrepreneur                       │
│                                         │
│  Course Selection *                     │
│    ☐ Software Development               │
│    ☐ Data Science                       │
│    ☐ Digital Marketing                  │
│    ☐ Graphic Design                     │
│    ☐ Business Management                │
│                                         │
│  Preferred Class Session * [Dropdown ▼] │
│    - Morning (8AM - 12PM)               │
│    - Afternoon (1PM - 5PM)              │
│    - Evening (6PM - 9PM)                │
│                                         │
│         [ ← Back ]  [ Continue → ]      │
└─────────────────────────────────────────┘
```

**Component:** `ProgramSelectionForm`
- Program type dropdown
- Multi-select or single select for courses
- Session time dropdown with descriptions
- Visual icons for each option

---

#### Step 5: Additional Information
```
┌─────────────────────────────────────────┐
│  Additional Information                 │
│                                         │
│  How did you hear about us? [Dropdown ▼]│
│    - Instagram                          │
│    - Facebook                           │
│    - Twitter/X                          │
│    - Radio                              │
│    - Friend/Family                      │
│    - Other                              │
│                                         │
│  FOR SPONSORED STUDENTS ONLY:           │
│  ─────────────────────────────────      │
│  Sponsorship Partner    [Chancen ▼]     │
│                                         │
│  Motivation Statement * (Required)      │
│  [________________________]             │
│  [________________________]             │
│  [________________________]             │
│  (Why do you want this sponsorship?)    │
│                                         │
│         [ ← Back ]  [ Continue → ]      │
└─────────────────────────────────────────┘
```

**Component:** `AdditionalInfoForm`
- Referral source dropdown
- Conditional rendering for sponsored students
- Large textarea for motivation (500 chars minimum)
- Character counter
- Partner selection dropdown

---

#### Step 6: Payment Information
```
┌─────────────────────────────────────────┐
│  Payment Information                    │
│                                         │
│  Caution Fee: 50,000 RWF               │
│                                         │
│  Payment Method *        [Dropdown ▼]   │
│    - Mobile Money (MoMo)                │
│    - Bank Transfer                      │
│    - Cash                               │
│                                         │
│  Payment Instructions:                  │
│  ──────────────────────                 │
│  Mobile Money (MTN/Airtel):             │
│  • Dial *182*8*1#                       │
│  • Enter: 123456 (ASA Account)          │
│  • Amount: 50,000 RWF                   │
│                                         │
│  Bank Transfer:                         │
│  • Bank: Bank of Kigali                 │
│  • Account: 0123456789                  │
│  • Account Name: Kuranga ASA            │
│                                         │
│  Upload Payment Proof *                 │
│  [Click to upload or drag & drop]       │
│  Supported: JPG, PNG, PDF (Max 5MB)     │
│                                         │
│  [Preview of uploaded file]             │
│                                         │
│         [ ← Back ]  [ Submit → ]        │
└─────────────────────────────────────────┘
```

**Component:** `PaymentForm`
- Payment method dropdown
- Dynamic payment instructions based on method
- File upload with drag & drop
- File preview
- File size validation
- File type validation
- For sponsored students: Show "Amount: 0 RWF" or optional

---

#### Step 7: Document Uploads (SPONSORED ONLY)
```
┌─────────────────────────────────────────┐
│  Required Documents                     │
│                                         │
│  1. Curriculum Vitae (CV) *             │
│     [Upload File] [✓ cv.pdf]            │
│                                         │
│  2. Degree Certificate *                │
│     [Upload File] [✓ degree.pdf]        │
│                                         │
│  3. National ID / Passport *            │
│     [Upload File] [✓ id_scan.jpg]       │
│                                         │
│  All documents must be:                 │
│  • Clear and readable                   │
│  • PDF or Image format                  │
│  • Less than 5MB each                   │
│                                         │
│         [ ← Back ]  [ Submit → ]        │
└─────────────────────────────────────────┘
```

**Component:** `DocumentUploadForm`
- Multiple file upload fields
- Individual upload buttons
- Upload progress indicators
- File preview/remove options
- Validation for required files

---

#### Step 8: Review & Submit
```
┌─────────────────────────────────────────┐
│  Review Your Application                │
│                                         │
│  Personal Information                   │
│  ────────────────────────               │
│  Name: John Doe                         │
│  Email: john@example.com                │
│  Phone: +250788123456                   │
│  District: Kigali                       │
│  [Edit]                                 │
│                                         │
│  Education                              │
│  ────────────────────────               │
│  Level: Bachelor's Degree               │
│  School: University of Rwanda           │
│  [Edit]                                 │
│                                         │
│  Program                                │
│  ────────────────────────               │
│  Type: Graduate/Job Seeker              │
│  Course: Software Development           │
│  Session: Morning                       │
│  [Edit]                                 │
│                                         │
│  Payment                                │
│  ────────────────────────               │
│  Method: Mobile Money                   │
│  Proof: ✓ Uploaded                      │
│  [Edit]                                 │
│                                         │
│  ☐ I confirm all information is correct │
│                                         │
│         [ ← Back ]  [ Submit Application]│
└─────────────────────────────────────────┘
```

**Component:** `ReviewSubmitForm`
- Summary of all entered data
- Edit buttons for each section
- Final confirmation checkbox
- Terms & conditions link
- Submit button (disabled until checkbox)

---

#### Step 9: Success Screen
```
┌─────────────────────────────────────────┐
│          ✓ Registration Successful!     │
│                                         │
│  Thank you for registering with ASA!    │
│                                         │
│  Your Registration Code:                │
│  ┌───────────────────┐                  │
│  │  ASA-2026-00123   │                  │
│  └───────────────────┘                  │
│  [Copy Code]                            │
│                                         │
│  Important: Save this code!             │
│  You'll need it to check your status.   │
│                                         │
│  A confirmation email has been sent to: │
│  john@example.com                       │
│                                         │
│  Next Steps:                            │
│  1. Wait for payment verification       │
│  2. Check status using your code        │
│  3. We'll email you about next steps    │
│                                         │
│  [Check Status Now] [Back to Home]      │
└─────────────────────────────────────────┘
```

**Component:** `RegistrationSuccess`
- Large registration code display
- Copy to clipboard functionality
- Email confirmation message
- Clear next steps
- Action buttons

---

### 1.3 Status Check Page (`/asa/status`)

**Purpose:** Students check application status without login

```
┌─────────────────────────────────────────┐
│  Check Your Application Status          │
│                                         │
│  Enter Your Registration Code           │
│  [_________________________]            │
│  Example: ASA-2026-00123                │
│                                         │
│         [ Check Status ]                │
│                                         │
│  Don't have a code?                     │
│  [Register Now]                         │
└─────────────────────────────────────────┘
```

**After Entering Valid Code:**
```
┌─────────────────────────────────────────┐
│  Application Status                     │
│                                         │
│  ┌─ Student Information ───────────┐    │
│  │ Name: John Doe                  │    │
│  │ Code: ASA-2026-00123            │    │
│  │ Program: Software Development   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Current Status                         │
│  ┌─────────────────────────────────┐    │
│  │     ● APPROVED                  │    │
│  │  ───────────────────────────    │    │
│  │  Your application has been      │    │
│  │  approved! Welcome to ASA.      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Cohort Information                     │
│  Cohort: 2026-Q1                        │
│  Start Date: February 1, 2026           │
│                                         │
│  Admin Comments                         │
│  "Excellent application. Looking        │
│   forward to having you in our program."│
│                                         │
│  Status Timeline                        │
│  ✓ Registered - Jan 15, 2026            │
│  ✓ Payment Verified - Jan 16, 2026      │
│  ✓ Under Review - Jan 17, 2026          │
│  ✓ Approved - Jan 20, 2026              │
│  ○ Enrolled - Pending                   │
│                                         │
│  Next Steps:                            │
│  • Check your email for enrollment info │
│  • Prepare required materials           │
│  • Attend orientation (TBA)             │
│                                         │
│  [Check Again] [Print Status]           │
└─────────────────────────────────────────┘
```

**Component:** `StatusChecker`
- Input field for registration code
- Validation for code format
- Loading state while fetching

**Component:** `StatusDisplay`
- Student info card
- Large status badge with color coding:
  - PENDING_PAYMENT → Yellow
  - UNDER_REVIEW → Blue
  - PARTNER_REVIEW → Purple
  - APPROVED → Green
  - REJECTED → Red
  - ENROLLED → Dark Green
- Status timeline/progress tracker
- Cohort information (if assigned)
- Admin/Partner comments
- Next steps section
- Action buttons

---

## 🔐 2. ADMIN DASHBOARD (`/admin/*`)

**Requires:** Admin authentication

### 2.1 Admin Login Page (`/admin/login`)

```
┌─────────────────────────────────────────┐
│           ASA SMS - Admin Login         │
│                                         │
│  Username                               │
│  [_________________________]            │
│                                         │
│  Password                               │
│  [_________________________] [👁]       │
│                                         │
│  ☐ Remember me                          │
│                                         │
│         [ Login ]                       │
│                                         │
│  Forgot password?                       │
└─────────────────────────────────────────┘
```

**Component:** `AdminLogin`
- Username/password fields
- Show/hide password toggle
- Remember me checkbox
- Error messages for invalid credentials
- Loading state on submit

---

### 2.2 Admin Dashboard Layout

**Component:** `AdminLayout`

**Sidebar Navigation:**
```
┌────────────────────┐
│  ASA SMS           │
│                    │
│  ● Dashboard       │
│  ● Students        │
│  ● Payments        │
│  ● Cohorts         │
│  ● Partners        │
│  ● Reports         │
│  ● Settings        │
│                    │
│  ─────────────     │
│  👤 Admin          │
│  Logout →          │
└────────────────────┘
```

**Top Bar:**
```
┌──────────────────────────────────────────────┐
│  Dashboard > Overview     [🔍 Search] [🔔] [👤]│
└──────────────────────────────────────────────┘
```

---

### 2.3 Dashboard Overview (`/admin/dashboard`)

**Purpose:** High-level statistics and recent activity

```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard Overview                                         │
│                                                             │
│  Statistics Cards                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Total   │ │ Pending │ │ Under   │ │ Approved│          │
│  │ 150     │ │ Review  │ │ Review  │ │ 80      │          │
│  │ Students│ │ 20      │ │ 15      │ │ Students│          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Rejected│ │ Enrolled│ │ Regular │ │Sponsored│          │
│  │ 10      │ │ 70      │ │ 120     │ │ 30      │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  Quick Actions                                              │
│  [Verify Payments (18)] [Review Applications (15)]         │
│                                                             │
│  Recent Applications (Last 7 days)                          │
│  ┌───────────────────────────────────────────────────┐     │
│  │  📊 [Chart: Applications by day]                 │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  Latest Students                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Name          Email         Status      Date        │   │
│  │─────────────────────────────────────────────────────│   │
│  │ John Doe      john@...      Under Review Jan 22     │   │
│  │ Jane Smith    jane@...      Pending Pay  Jan 22     │   │
│  │ Alice M.      alice@...     Partner Rev  Jan 21     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Pending Actions                                            │
│  • 18 payments awaiting verification                        │
│  • 15 applications awaiting review                          │
│  • 5 students awaiting partner approval                     │
└─────────────────────────────────────────────────────────────┘
```

**Components:**
- `StatCard` (x8) - Individual statistic cards
- `QuickActions` - Action buttons with counts
- `RecentApplicationsChart` - Line/bar chart
- `LatestStudentsTable` - Last 10 students
- `PendingActionsList` - Actionable items

---

### 2.4 Students Management (`/admin/students`)

**Purpose:** View, filter, search all students

```
┌─────────────────────────────────────────────────────────────┐
│  Students Management                          [+ Add Manual] │
│                                                              │
│  Filters & Search                                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ [Search: Name, Email, Code...]                    │     │
│  │                                                    │     │
│  │ Status: [All ▼] Type: [All ▼] Cohort: [All ▼]    │     │
│  │ Partner: [All ▼]     [Apply Filters] [Clear]     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Results (150 students) [Export CSV] [Export PDF]            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │Code      Name        Email      Status    Actions   │   │
│  │──────────────────────────────────────────────────────│   │
│  │ASA-001   John Doe    john@...   APPROVED  [View]   │   │
│  │          +25078...   Regular               [Edit]   │   │
│  │                      Bachelor              [Delete] │   │
│  │                                                      │   │
│  │ASA-002   Jane Smith  jane@...   UNDER_REV [View]   │   │
│  │          +25078...   Sponsored             [Verify] │   │
│  │                      Masters               [Approve]│   │
│  │                                                      │   │
│  │ASA-003   Alice M.    alice@...  PARTNER_R [View]   │   │
│  │          +25078...   Sponsored             [Details]│   │
│  │                      Masters                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Pagination                                                  │
│  [◀] Page 1 of 8 [▶]    Showing 1-20 of 150                │
└──────────────────────────────────────────────────────────────┘
```

**Components:**
- `SearchBar` - Real-time search
- `FilterPanel` - Multiple dropdown filters
- `StudentsTable` - Sortable, paginated table
- `TableRow` - Individual student row with actions
- `Pagination` - Page navigation
- `ExportButtons` - CSV/PDF export

**Actions Available:**
- **View** - See full student details
- **Edit** - Modify student information
- **Verify** - Verify payment (if pending)
- **Approve/Reject** - Change status
- **Delete** - Remove student (with confirmation)

---

### 2.5 Student Detail Page (`/admin/students/:id`)

**Purpose:** Complete student profile with all actions

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Students        Student Details                  │
│                                                              │
│  ┌─ Student Information ───────────────────────────────┐    │
│  │ Registration Code: ASA-2026-00123                   │    │
│  │ Status: [UNDER_REVIEW ▼]              [Save]       │    │
│  │                                                     │    │
│  │ Full Name: John Doe                    [Edit]      │    │
│  │ Email: john@example.com                             │    │
│  │ Phone: +250788123456                                │    │
│  │ District: Kigali                                    │    │
│  │                                                     │    │
│  │ Education: Bachelor's Degree                        │    │
│  │ University: University of Rwanda                    │    │
│  │                                                     │    │
│  │ Program: Graduate/Job Seeker                        │    │
│  │ Course: Software Development                        │    │
│  │ Session: Morning                                    │    │
│  │                                                     │    │
│  │ Registration Type: Regular                          │    │
│  │ Registered: Jan 15, 2026 10:30 AM                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Payment Information ───────────────────────────────┐    │
│  │ Method: Mobile Money                                │    │
│  │ Amount: 50,000 RWF                                  │    │
│  │ Status: ○ Not Verified                              │    │
│  │                                                     │    │
│  │ Payment Proof:                                      │    │
│  │ [📄 payment_proof.jpg] [View] [Download]           │    │
│  │                                                     │    │
│  │ [✓ Verify Payment]                                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Documents ─────────────────────────────────────────┐    │
│  │ • Payment Proof - payment.jpg [View] [Download]     │    │
│  │ • CV - john_cv.pdf [View] [Download]                │    │
│  │ • Degree - degree.pdf [View] [Download]             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Cohort Assignment ─────────────────────────────────┐    │
│  │ Current Cohort: None                                │    │
│  │ Assign to Cohort: [2026-Q1 ▼]           [Assign]   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Admin Actions ─────────────────────────────────────┐    │
│  │ Admin Comments:                                     │    │
│  │ [________________________________]                  │    │
│  │ [________________________________]                  │    │
│  │                                                     │    │
│  │ [✓ Approve Application]  [✗ Reject Application]    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Activity Timeline ─────────────────────────────────┐    │
│  │ ● Registered - Jan 15, 2026 10:30 AM                │    │
│  │ ● Payment uploaded - Jan 15, 2026 11:00 AM          │    │
│  │ ● Payment verified by admin - Jan 16, 2026          │    │
│  │ ● Status: Under Review - Jan 16, 2026               │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

**Components:**
- `StudentInfoCard` - Personal & program details
- `PaymentCard` - Payment status & verification
- `DocumentsList` - Uploaded documents
- `CohortAssignment` - Assign student to cohort
- `AdminActionsPanel` - Approve/reject with comments
- `ActivityTimeline` - Chronological events

**Actions:**
- Edit student information
- Verify payment
- View/download documents
- Assign to cohort
- Add comments
- Approve/reject application

---

### 2.6 Payment Verification Page (`/admin/payments`)

**Purpose:** Quick payment verification workflow

```
┌─────────────────────────────────────────────────────────────┐
│  Payment Verification                    Pending: 18         │
│                                                              │
│  Filter: [Pending Only ▼] [All Types ▼]                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Student: John Doe (ASA-2026-00123)                   │   │
│  │ Email: john@example.com                              │   │
│  │ Amount: 50,000 RWF | Method: Mobile Money            │   │
│  │ Submitted: Jan 15, 2026 11:00 AM                     │   │
│  │                                                      │   │
│  │ Payment Proof:                                       │   │
│  │ ┌──────────────────┐                                │   │
│  │ │  [Payment Image] │  [View Full Size]             │   │
│  │ │                  │  [Download]                    │   │
│  │ └──────────────────┘                                │   │
│  │                                                      │   │
│  │ [✓ Verify & Approve] [✗ Reject]                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Student: Jane Smith (ASA-2026-00124)                 │   │
│  │ ... (Next pending payment)                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [Previous] [Next] (1 of 18)                                 │
└──────────────────────────────────────────────────────────────┘
```

**Component:** `PaymentVerificationQueue`
- Card-based layout for each pending payment
- Image preview with zoom
- Quick approve/reject buttons
- Navigation between payments
- Counter of remaining verifications

---

### 2.7 Cohorts Management (`/admin/cohorts`)

**Purpose:** Create and manage cohorts

```
┌─────────────────────────────────────────────────────────────┐
│  Cohorts Management                        [+ Create Cohort] │
│                                                              │
│  Active Cohorts                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Cohort Name    Start Date    End Date    Students   │   │
│  │──────────────────────────────────────────────────────│   │
│  │ 2026-Q1        Feb 1, 2026   May 31      45         │   │
│  │ [Active]                                [View][Edit] │   │
│  │                                                      │   │
│  │ 2026-Q2        May 1, 2026   Aug 31      0          │   │
│  │ [Active]                                [View][Edit] │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Past Cohorts                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 2025-Q4        Nov 1, 2025   Jan 31      38         │   │
│  │ [Completed]                             [View]       │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

**Create Cohort Modal:**
```
┌─────────────────────────────────────┐
│  Create New Cohort          [✕]    │
│                                     │
│  Cohort Name *                      │
│  [_________________________]        │
│  Example: 2026-Q3                   │
│                                     │
│  Start Date *                       │
│  [____/____/________] 📅            │
│                                     │
│  End Date *                         │
│  [____/____/________] 📅            │
│                                     │
│  Status                             │
│  ○ Active  ○ Inactive               │
│                                     │
│       [Cancel]  [Create Cohort]     │
└─────────────────────────────────────┘
```

**Components:**
- `CohortsTable` - List of all cohorts
- `CreateCohortModal` - Form to create new cohort
- `CohortCard` - Individual cohort display
- `CohortDetailsPage` - View all students in cohort

---

### 2.8 Partners Management (`/admin/partners`)

**Purpose:** Manage sponsorship partners

```
┌─────────────────────────────────────────────────────────────┐
│  Partners Management                      [+ Add Partner]    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Partner: Chancen International                       │   │
│  │ Email: chancen@partner.com                           │   │
│  │ Contact: Chancen Representative                      │   │
│  │ Phone: +250788000000                                 │   │
│  │ Status: ● Active                                     │   │
│  │                                                      │   │
│  │ Sponsored Students: 30                               │   │
│  │ • Pending Review: 5                                  │   │
│  │ • Approved: 20                                       │   │
│  │ • Rejected: 5                                        │   │
│  │                                                      │   │
│  │ [View Students] [Edit] [Deactivate]                 │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

### 2.9 Reports Page (`/admin/reports`)

**Purpose:** Analytics and data export

```
┌─────────────────────────────────────────────────────────────┐
│  Reports & Analytics                                         │
│                                                              │
│  Date Range: [Jan 1, 2026] to [Jan 22, 2026]   [Generate]  │
│                                                              │
│  Applications Overview                                       │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Chart: Applications by Status - Pie Chart]      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Chart: Applications over Time - Line Graph]     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Program Distribution                                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │  [Chart: Students by Program Type - Bar Chart]    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Export Reports                                              │
│  [Download All Students (CSV)]                               │
│  [Download Approved Students (PDF)]                          │
│  [Download Payment Report (Excel)]                           │
│  [Download Custom Report]                                    │
└──────────────────────────────────────────────────────────────┘
```

**Components:**
- `DateRangePicker` - Select report period
- `PieChart` - Status distribution
- `LineChart` - Applications over time
- `BarChart` - Program distribution
- `ExportButtons` - Various export formats

---

### 2.10 Settings Page (`/admin/settings`)

**Purpose:** System configuration

```
┌─────────────────────────────────────────────────────────────┐
│  Settings                                                    │
│                                                              │
│  Profile Settings                                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Username: admin                                    │     │
│  │ Email: admin@kuranga.rw          [Change]          │     │
│  │ Password: ••••••••               [Change]          │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  System Settings                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Caution Fee Amount: [50000] RWF                    │     │
│  │ Auto-approve payments: ☐                           │     │
│  │ Email notifications: ☑                             │     │
│  │ SMS notifications: ☐                               │     │
│  │                                                    │     │
│  │ [Save Settings]                                    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  User Management                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │ Admin Users                      [+ Add Admin]     │     │
│  │ • admin@kuranga.rw (You)                           │     │
│  │ • admin2@kuranga.rw              [Edit] [Remove]   │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## 👥 3. PARTNER DASHBOARD (`/partner/*`)

**Requires:** Partner authentication

### 3.1 Partner Login (`/partner/login`)

Same as admin login but branded for partners

---

### 3.2 Partner Dashboard Layout

**Sidebar:**
```
┌────────────────────┐
│  Chancen Portal    │
│                    │
│  ● Dashboard       │
│  ● My Students     │
│  ● Profile         │
│                    │
│  ─────────────     │
│  👤 Chancen        │
│  Logout →          │
└────────────────────┘
```

---

### 3.3 Partner Dashboard Overview (`/partner/dashboard`)

```
┌─────────────────────────────────────────────────────────────┐
│  Chancen - Dashboard Overview                                │
│                                                              │
│  Your Statistics                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Total   │ │ Pending │ │ Approved│ │ Rejected│          │
│  │ 30      │ │ Review  │ │ 20      │ │ 5       │          │
│  │ Students│ │ 5       │ │ Students│ │ Students│          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                              │
│  Pending Your Review (5)                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Alice Mukamana   alice@...    PARTNER_REVIEW  [Review]│  │
│  │ Bob Uwimana      bob@...      PARTNER_REVIEW  [Review]│  │
│  │ Carol Imena      carol@...    PARTNER_REVIEW  [Review]│  │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Recent Decisions                                            │
│  • Alice M. - Approved (Jan 20)                              │
│  • David K. - Approved (Jan 19)                              │
│  • Emma N. - Rejected (Jan 18)                               │
└──────────────────────────────────────────────────────────────┘
```

---

### 3.4 Partner Students Page (`/partner/students`)

```
┌─────────────────────────────────────────────────────────────┐
│  My Sponsored Students                                       │
│                                                              │
│  Filter: [Pending Review ▼] [Search...]                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │Code    Name         Education  Status      Actions   │   │
│  │──────────────────────────────────────────────────────│   │
│  │ASA-05  Alice M.     Masters    PARTNER_R   [Review]  │   │
│  │        alice@...    CMU                              │   │
│  │                                                      │   │
│  │ASA-12  Bob U.       Bachelor   APPROVED    [View]   │   │
│  │        bob@...      UR                               │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

### 3.5 Partner Student Review (`/partner/students/:id`)

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back        Student Review: Alice Mukamana                │
│                                                              │
│  ┌─ Student Profile ───────────────────────────────────┐    │
│  │ Name: Alice Mukamana                                │    │
│  │ Email: alice@example.com                            │    │
│  │ Phone: +250788654321                                │    │
│  │ Education: Master's Degree - CMU                    │    │
│  │ Program: Entrepreneur - AI & Machine Learning       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Motivation Statement ──────────────────────────────┐    │
│  │ "I have always been passionate about using          │    │
│  │  technology to solve local problems. With this      │    │
│  │  sponsorship, I can develop AI solutions for        │    │
│  │  agriculture in Rwanda..."                          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Documents ─────────────────────────────────────────┐    │
│  │ CV:                [john_cv.pdf]        [View]      │    │
│  │ Degree Certificate: [degree.pdf]       [View]      │    │
│  │ National ID:       [id_scan.jpg]       [View]      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─ Your Decision ─────────────────────────────────────┐    │
│  │ Comments:                                           │    │
│  │ [_________________________________]                 │    │
│  │ [_________________________________]                 │    │
│  │                                                     │    │
│  │ Assign to Cohort (optional): [2026-Q1 ▼]          │    │
│  │                                                     │    │
│  │ [✓ Approve for Sponsorship]  [✗ Reject]           │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

**Components:**
- `StudentProfileCard` - Student details
- `MotivationDisplay` - Full motivation statement
- `DocumentViewer` - View/download documents
- `ReviewActions` - Approve/reject with comments

---

## 🎨 4. COMMON COMPONENTS

### Reusable UI Components

1. **Navigation Components**
   - `Navbar` - Top navigation
   - `Sidebar` - Side navigation
   - `Breadcrumbs` - Page location
   - `MobileMenu` - Responsive menu

2. **Form Components**
   - `Input` - Text input with validation
   - `Select` - Dropdown select
   - `Textarea` - Multi-line text
   - `FileUpload` - File upload with drag-drop
   - `DatePicker` - Date selection
   - `Checkbox` - Checkbox input
   - `RadioButton` - Radio button group

3. **Display Components**
   - `Card` - Container card
   - `Table` - Data table with sorting/pagination
   - `Badge` - Status badge
   - `Avatar` - User avatar
   - `ProgressBar` - Progress indicator
   - `Timeline` - Event timeline
   - `Tooltip` - Hover tooltip
   - `Modal` - Popup modal

4. **Feedback Components**
   - `Alert` - Success/error messages
   - `Toast` - Notification toast
   - `Loader` - Loading spinner
   - `EmptyState` - No data state
   - `ErrorBoundary` - Error handling

5. **Chart Components**
   - `PieChart` - Pie chart
   - `LineChart` - Line graph
   - `BarChart` - Bar chart
   - `AreaChart` - Area chart

6. **Status Components**
   - `StatusBadge` - Colored status indicator
   - `ProgressTracker` - Multi-step progress
   - `ActivityFeed` - Activity list

---

## 🎯 5. KEY USER FLOWS

### Student Flow
1. Visit `/asa` → Learn about ASA
2. Click "Apply Now" → `/asa/register`
3. Choose registration type (Regular/Sponsored)
4. Fill multi-step form
5. Upload payment proof & documents
6. Submit application
7. Receive registration code
8. Check status at `/asa/status`

### Admin Flow
1. Login at `/admin/login`
2. View dashboard overview
3. Click "Verify Payments" → See pending list
4. Review payment proof → Verify
5. Go to Students → Filter by "Under Review"
6. Click student → View details
7. Assign cohort → Add comments → Approve
8. Student receives approval email

### Partner Flow
1. Login at `/partner/login`
2. View dashboard → See pending reviews
3. Click "Review" on student
4. Read motivation statement
5. View CV and documents
6. Add comments → Approve/Reject
7. Student receives sponsorship decision email

---

## 📱 6. RESPONSIVE DESIGN NOTES

### Mobile Views
- Collapsible sidebar on mobile
- Stacked cards instead of rows
- Touch-friendly buttons (min 44px)
- Swipe gestures for tables
- Bottom navigation on mobile

### Tablet Views
- Two-column layout
- Optimized table views
- Landscape-friendly charts

---

## 🎨 7. DESIGN SPECIFICATIONS

### Color Scheme
```
Primary: #2563EB (Blue)
Success: #10B981 (Green)
Warning: #F59E0B (Orange)
Danger: #EF4444 (Red)
Info: #8B5CF6 (Purple)

Neutral:
- Background: #F9FAFB
- Card: #FFFFFF
- Border: #E5E7EB
- Text Primary: #111827
- Text Secondary: #6B7280
```

### Status Colors
```
PENDING_PAYMENT → #F59E0B (Orange)
UNDER_REVIEW → #3B82F6 (Blue)
PARTNER_REVIEW → #8B5CF6 (Purple)
APPROVED → #10B981 (Green)
REJECTED → #EF4444 (Red)
ENROLLED → #059669 (Dark Green)
COMPLETED → #6B7280 (Gray)
```

### Typography
```
Headings: 'Inter', sans-serif
Body: 'Inter', sans-serif
Code: 'Monaco', monospace

H1: 32px, Bold
H2: 24px, Semibold
H3: 20px, Semibold
Body: 16px, Regular
Small: 14px, Regular
```

### Spacing
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

---

## ✅ 8. IMPLEMENTATION CHECKLIST

### Phase 1: Public Website
- [ ] Landing page
- [ ] Registration form (multi-step)
- [ ] File upload functionality
- [ ] Status check page
- [ ] Email notifications integration

### Phase 2: Admin Dashboard
- [ ] Admin login
- [ ] Dashboard overview with stats
- [ ] Students management table
- [ ] Student detail page
- [ ] Payment verification
- [ ] Approve/reject workflow
- [ ] Cohorts management
- [ ] Reports & analytics

### Phase 3: Partner Dashboard
- [ ] Partner login
- [ ] Partner dashboard
- [ ] Sponsored students list
- [ ] Student review page
- [ ] Approve/reject for partners

### Phase 4: Polish
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Form validation
- [ ] Toast notifications
- [ ] Export functionality
- [ ] Search & filters
- [ ] Pagination

---

## 🛠️ 9. RECOMMENDED TECH STACK

**Frontend Framework:**
- React.js / Next.js
- TypeScript (recommended)

**UI Libraries:**
- Tailwind CSS (styling)
- Shadcn/ui or Headless UI (components)
- React Hook Form (forms)
- Zod (validation)

**State Management:**
- React Query (API calls)
- Zustand or Context API (global state)

**Charts:**
- Recharts or Chart.js

**File Upload:**
- React Dropzone

**Tables:**
- TanStack Table

**Date Picker:**
- React DatePicker

**HTTP Client:**
- Axios

---

This is your complete UI specification! Each page, component, and interaction is mapped out. Ready to start building! 🚀