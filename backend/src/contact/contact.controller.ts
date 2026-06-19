import {
  Controller, Post, Get, Patch, Body, Param,
  HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ short: { limit: 2, ttl: 60000 }, medium: { limit: 5, ttl: 3600000 } })
  @ApiOperation({ summary: 'Submit contact form (public)' })
  submit(@Body() dto: CreateContactDto) {
    return this.contactService.submit(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all submissions (admin only)' })
  findAll() {
    return this.contactService.findAll();
  }

  @Patch(':id/read')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark submission as read (admin only)' })
  markRead(@Param('id') id: string) {
    return this.contactService.markRead(id);
  }
}
