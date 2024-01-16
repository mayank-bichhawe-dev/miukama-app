export interface SignUpFormInterface {
  firstName: string;
  lastName: string;
  email: string;
  contact?: string;
  address?: string;
  password: string;
  confirmPassword: string;
  termsOfService: boolean;
}
