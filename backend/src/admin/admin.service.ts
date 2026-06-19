import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [projects, testimonials, blogs, contacts, unreadContacts] =
      await this.prisma.$transaction([
        this.prisma.project.count(),
        this.prisma.testimonial.count(),
        this.prisma.blogPost.count(),
        this.prisma.contactSubmission.count(),
        this.prisma.contactSubmission.count({ where: { read: false } }),
      ]);

    return {
      projects,
      testimonials,
      blogs,
      contacts,
      unreadContacts,
    };
  }
}
