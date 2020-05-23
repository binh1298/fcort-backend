export interface UserDTO {
  id: string;
  createdDate: Date;
  email: string;
  password: string;
  fullname: string;
  avatar: string;
}

export interface UserAuthDTO {
  email: string;
  password: string;
  confirmPassword: string;  
}