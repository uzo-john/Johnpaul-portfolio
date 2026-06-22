import {
  IsString, IsOptional, IsArray, IsBoolean,
  IsInt, MinLength, MaxLength, Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(20)
  @MaxLength(600)
  excerpt: string;

  @ApiProperty()
  @IsString()
  @MinLength(1000)
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readTime?: number;
}
