import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactMessage {
    id: string;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export type Time = bigint;
export interface CommissionRequest {
    id: string;
    status: CommissionStatus;
    referencePhotoUrl?: string;
    name: string;
    submittedAt: Time;
    photoRef?: ExternalBlob;
    email: string;
    message?: string;
    commissionType: string;
}
export enum CommissionStatus {
    pending = "pending",
    completed = "completed",
    reviewed = "reviewed"
}
export interface backendInterface {
    getAllCommissionRequests(): Promise<Array<CommissionRequest>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getCommissionRequestById(id: string): Promise<CommissionRequest | null>;
    submitCommissionRequest(name: string, email: string, commissionType: string, referencePhotoUrl: string | null, message: string | null, photoRef: ExternalBlob | null): Promise<string>;
    submitContactMessage(name: string, email: string, message: string): Promise<string>;
    updateCommissionRequest(id: string, name: string, email: string, commissionType: string, referencePhotoUrl: string | null, message: string | null, status: CommissionStatus, photoRef: ExternalBlob | null): Promise<void>;
    updateCommissionStatus(requestId: string, newStatus: CommissionStatus): Promise<void>;
}
