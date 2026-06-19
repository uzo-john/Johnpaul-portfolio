import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get published testimonials (public)' })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get('admin/all')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all testimonials (admin only)' })
  findAllAdmin() {
    return this.testimonialsService.findAllAdmin();
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create testimonial (admin only)' })
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update testimonial (admin only)' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateTestimonialDto>) {
    return this.testimonialsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete testimonial (admin only)' })
  remove(@Param('id') id: string) {
    return this.testimonialsService.remove(id);
  }
}
