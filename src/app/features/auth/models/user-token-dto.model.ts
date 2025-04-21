export interface UserTokenDto {
  token: string;
  user: UserSessionDto;
}

export interface UserSessionDto {
  id: number;
  username: string;
  email: string;
  role: string;
}
