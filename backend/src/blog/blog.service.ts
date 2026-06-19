import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  private mapPost(post: any) {
    if (!post) return post;
    return {
      ...post,
      tags: post.tags ? post.tags.split(',') : [],
    };
  }

  async findAll(page = 1, limit = 6, tag?: string) {
    const skip = (page - 1) * limit;
    const where = {
      published: true,
      ...(tag && { tags: { contains: tag } }),
    };

    const [posts, total] = await this.prisma.$transaction([
      this.prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true, title: true, slug: true, excerpt: true,
          coverImage: true, tags: true, publishedAt: true,
          readTime: true, createdAt: true,
        },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return {
      data: posts.map((post) => this.mapPost(post)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAllAdmin() {
    const posts = await this.prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    return posts.map((post) => this.mapPost(post));
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post || !post.published) throw new NotFoundException('Post not found');
    return this.mapPost(post);
  }

  async create(dto: CreateBlogPostDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const { tags, ...rest } = dto;
    const post = await this.prisma.blogPost.create({
      data: {
        ...rest,
        slug,
        tags: tags ? tags.join(',') : '',
        publishedAt: dto.published ? new Date() : null,
      },
    });
    return this.mapPost(post);
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    const existing = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Post not found');

    const slug = dto.title
      ? slugify(dto.title, { lower: true, strict: true })
      : undefined;

    const publishedAt =
      dto.published && !existing.publishedAt ? new Date() : existing.publishedAt;

    const { tags, ...rest } = dto;

    const post = await this.prisma.blogPost.update({
      where: { id },
      data: {
        ...rest,
        ...(slug && { slug }),
        ...(tags && { tags: tags.join(',') }),
        publishedAt,
      },
    });
    return this.mapPost(post);
  }

  async remove(id: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    const deletedPost = await this.prisma.blogPost.delete({ where: { id } });
    return this.mapPost(deletedPost);
  }
}
