export interface Plan {
  id: string;
  name: string;
  type: "free" | "pro" | "enterprise";
  price: number;
  features: string[];
  projectsLimit: number;
  linksLimit: number;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
