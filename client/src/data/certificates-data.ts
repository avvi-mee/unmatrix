export interface Certificate {
  student_name: string;
  role: string;
  start_date: string;
  end_date: string;
  issued_date: string;
  status: "verified" | "revoked";
}

// Add a new entry here every time you issue a certificate.
// The key is the certificate ID that goes in the verify link + QR code.
export const certificates: Record<string, Certificate> = {
  "UM-2026-0001": {
    student_name: "Sujal Pandurang Chavan",
    role: "Cyber-security Intern",
    start_date: "1 May 2026",
    end_date: "12 June 2026",
    issued_date: "12 June 2026",
    status: "verified",
  },
};