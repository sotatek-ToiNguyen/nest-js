export class ResetPasswordDto {
  readonly email: string;
  readonly newPassword: string;
  readonly token: string;
  readonly password: string;
}