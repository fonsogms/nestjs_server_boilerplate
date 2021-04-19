import {
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  username: string;
  @IsString()
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
