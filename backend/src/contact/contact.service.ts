import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('app.smtpHost'),
      port: this.config.get<number>('app.smtpPort'),
      secure: false,
      auth: {
        user: this.config.get<string>('app.smtpUser'),
        pass: this.config.get<string>('app.smtpPass'),
      },
    });
  }

  async submit(dto: CreateContactDto) {
    // Persist submission
    const submission = await this.prisma.contactSubmission.create({
      data: dto,
    });

    // Send notification email (non-blocking — don't fail request if email fails)
    this.sendNotificationEmail(dto).catch((err) => {
      console.error('Failed to send notification email:', err);
    });

    return { success: true, id: submission.id };
  }

  async findAll() {
    return this.prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markRead(id: string) {
    return this.prisma.contactSubmission.update({
      where: { id },
      data: { read: true },
    });
  }

  private async sendNotificationEmail(dto: CreateContactDto) {
    const contactEmail = this.config.get<string>('app.contactEmail');
    if (!contactEmail) return;

    await this.transporter.sendMail({
      from: `"Portfolio Contact" <${this.config.get('app.smtpUser')}>`,
      to: contactEmail,
      subject: `[Portfolio] New Message: ${dto.subject}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${dto.name}</p>
        <p><strong>Email:</strong> ${dto.email}</p>
        <p><strong>Subject:</strong> ${dto.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${dto.message.replace(/\n/g, '<br>')}</p>
      `,
    });
  }
}
