import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
export class AuthDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Exclude()
  password: string;
}
