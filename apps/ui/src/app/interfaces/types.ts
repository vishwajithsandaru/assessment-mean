export interface TokenS {
  email: string;
  userId: string;
}

export interface ApiResponse {
  status: string;
  message: string;
  token: string;
}

export interface UserData {
  userid: string;
  useremail: string;
  token: string;
}
