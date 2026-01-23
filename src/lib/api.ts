const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export type StudentStatus = 'PENDING_PAYMENT' | 'UNDER_REVIEW' | 'PARTNER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ENROLLED' | 'COMPLETED';
export type RegistrationType = 'REGULAR' | 'SPONSORED';
export type PaymentMethod = 'MOMO' | 'BANK';
export type EducationLevel = 'HIGH_SCHOOL' | 'BACHELOR' | 'MASTERS' | 'PHD' | 'OTHER';
export type ProgramType = 'GRADUATE_JOB_SEEKER' | 'PROFESSIONAL' | 'INTERNSHIP' | 'ENTREPRENEUR';
export type ClassSession = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'WEEKEND';
export type DocumentType = 'CV' | 'DEGREE' | 'ID_PASSPORT' | 'OTHER';

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface StudentRegistrationRequest {
    fullName: string;
    email: string;
    phone: string;
    district: string;
    educationLevel: EducationLevel;
    university?: string;
    programType: ProgramType;
    courseSelected: string;
    session: ClassSession;
    registrationType: RegistrationType;
    partnerId?: number;
    motivationStatement?: string;
    referralSource?: string;
    paymentMethod: PaymentMethod;
    paymentAmount: number;
}

export interface StudentResponse {
    id: number;
    registrationCode: string;
    fullName: string;
    email: string;
    phone: string;
    phoneNumber?: string;
    district: string;
    city?: string;
    country?: string;
    dateOfBirth?: string;
    educationLevel?: EducationLevel | string;
    university?: string;
    currentOccupation?: string;
    programType?: ProgramType;
    courseSelected: string;
    registrationType: RegistrationType;
    motivation?: string;
    paymentReceipt?: string;
    idDocument?: string;
    status: StudentStatus;
    createdAt: string;
}

export interface Course {
    id: number;
    name: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface StudentStatusResponse {
    registrationCode: string;
    fullName: string;
    program: string;
    status: StudentStatus;
    statusDisplayName: string;
    adminComments?: string;
    nextSteps: string;
    cohort?: {
        name: string;
        startDate: string;
        endDate: string;
    };
}

export interface LoginResponse {
    token: string;
    username: string;
    role: string;
}

export interface DashboardStats {
    totalStudents: number;
    pendingPayment: number;
    underReview: number;
    partnerReview: number;
    approved: number;
    rejected: number;
    enrolled: number;
    regularStudents: number;
    sponsoredStudents: number;
    pendingPaymentVerification: number;
    pendingReviews?: number;
    approvedStudents?: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}

function getAuthHeader(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('asa_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
    // Public
    registerStudent: (data: StudentRegistrationRequest): Promise<ApiResponse<StudentResponse>> =>
        fetch(`${API_BASE_URL}/students/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<StudentResponse>>(res)),

    checkStatus: (code: string): Promise<ApiResponse<StudentStatusResponse>> =>
        fetch(`${API_BASE_URL}/students/status/${code}`).then(res => handleResponse<ApiResponse<StudentStatusResponse>>(res)),

    uploadPaymentProof: (id: number, file: File): Promise<ApiResponse<string>> => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(`${API_BASE_URL}/students/${id}/upload-payment`, {
            method: 'POST',
            body: formData,
        }).then(res => handleResponse<ApiResponse<string>>(res));
    },

    uploadDocument: (id: number, type: DocumentType, file: File): Promise<ApiResponse<string>> => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);
        return fetch(`${API_BASE_URL}/students/${id}/upload-document`, {
            method: 'POST',
            body: formData,
        }).then(res => handleResponse<ApiResponse<string>>(res));
    },

    getPartners: (): Promise<ApiResponse<any[]>> =>
        fetch(`${API_BASE_URL}/public/partners`).then(res => handleResponse<ApiResponse<any[]>>(res)),

    getCohorts: (): Promise<ApiResponse<any[]>> =>
        fetch(`${API_BASE_URL}/public/cohorts`).then(res => handleResponse<ApiResponse<any[]>>(res)),

    getAdminCohorts: (): Promise<ApiResponse<any[]>> =>
        fetch(`${API_BASE_URL}/admin/cohorts`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<any[]>>(res)),

    createCohort: (data: any): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/cohorts`, {
            method: 'POST',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    updateCohort: (id: number, data: any): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/cohorts/${id}`, {
            method: 'PUT',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    login: (credentials: any): Promise<ApiResponse<LoginResponse>> =>
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        }).then(res => handleResponse<ApiResponse<LoginResponse>>(res)),

    // Admin
    getAdminStats: (): Promise<ApiResponse<DashboardStats>> =>
        fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<DashboardStats>>(res)),

    getStudents: (page = 0, size = 10): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/students?page=${page}&size=${size}`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    searchStudents: (query: string): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/students/search?query=${query}`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    filterStudents: (filters: {
        status?: string;
        type?: string;
        search?: string;
        cohortId?: number;
        partnerId?: number;
        page?: number;
        size?: number;
    }): Promise<ApiResponse<any>> => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });
        return fetch(`${API_BASE_URL}/admin/students/filter?${params.toString()}`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<any>>(res));
    },

    verifyPayment: (id: number): Promise<ApiResponse<string>> =>
        fetch(`${API_BASE_URL}/admin/students/${id}/verify-payment`, {
            method: 'POST',
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<string>>(res)),

    approveStudent: (id: number, request: any): Promise<ApiResponse<string>> =>
        fetch(`${API_BASE_URL}/admin/students/${id}/approve`, {
            method: 'POST',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        }).then(res => handleResponse<ApiResponse<string>>(res)),

    getStudentById: (id: number): Promise<ApiResponse<StudentResponse>> =>
        fetch(`${API_BASE_URL}/admin/students/${id}`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<StudentResponse>>(res)),

    // Courses
    getActiveCourses: (): Promise<ApiResponse<Course[]>> =>
        fetch(`${API_BASE_URL}/public/courses`).then(res => handleResponse<ApiResponse<Course[]>>(res)),

    getAllCourses: (): Promise<ApiResponse<Course[]>> =>
        fetch(`${API_BASE_URL}/admin/courses`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<Course[]>>(res)),

    createCourse: (data: Partial<Course>): Promise<ApiResponse<Course>> =>
        fetch(`${API_BASE_URL}/admin/courses`, {
            method: 'POST',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<Course>>(res)),

    updateCourse: (id: number, data: Partial<Course>): Promise<ApiResponse<Course>> =>
        fetch(`${API_BASE_URL}/admin/courses/${id}`, {
            method: 'PUT',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<Course>>(res)),

    deleteCourse: (id: number): Promise<ApiResponse<void>> =>
        fetch(`${API_BASE_URL}/admin/courses/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<void>>(res)),

    // Partner
    getPartnerStudents: (): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/partner/students`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    getStudentDetails: (id: number): Promise<ApiResponse<StudentResponse>> =>
        fetch(`${API_BASE_URL}/partner/students/${id}`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<StudentResponse>>(res)),

    partnerApprove: (id: number, request: any): Promise<ApiResponse<string>> =>
        fetch(`${API_BASE_URL}/partner/students/${id}/approve`, {
            method: 'POST',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        }).then(res => handleResponse<ApiResponse<string>>(res)),

    // User Management
    getUsers: (page = 0, size = 10): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/users?page=${page}&size=${size}`, {
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    createUser: (data: any): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/users`, {
            method: 'POST',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    updateUser: (id: number, data: any): Promise<ApiResponse<any>> =>
        fetch(`${API_BASE_URL}/admin/users/${id}`, {
            method: 'PUT',
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => handleResponse<ApiResponse<any>>(res)),

    deleteUser: (id: number): Promise<ApiResponse<void>> =>
        fetch(`${API_BASE_URL}/admin/users/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader(),
        }).then(res => handleResponse<ApiResponse<void>>(res)),
};
