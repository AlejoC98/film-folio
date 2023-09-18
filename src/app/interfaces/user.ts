export interface User {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean | null; 
    isAnonymous: boolean | null;
    metadata: Object | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: Array<any> | null;
    providerId: string | null;
    refreshToken: string | null;
    tenantId: string | null;
    uid: string | null;
}