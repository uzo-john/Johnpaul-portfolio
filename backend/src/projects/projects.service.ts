import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import slugify from 'slugify';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapProject(project: any) {
    if (!project) return project;
    return {
      ...project,
      technologies: project.technologies ? project.technologies.split(',') : [],
    };
  }

  async findAll(category?: string, featured?: boolean) {
    const projects = await this.prisma.project.findMany({
      where: {
        ...(category && { category }),
        ...(featured !== undefined && { featured }),
      },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
    return projects.map((project) => this.mapProject(project));
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return this.mapProject(project);
  }

  async create(dto: CreateProjectDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const { technologies, ...rest } = dto;
    const project = await this.prisma.project.create({
      data: {
        ...rest,
        slug,
        technologies: technologies ? technologies.join(',') : '',
      },
    });
    return this.mapProject(project);
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    const slug = dto.title
      ? slugify(dto.title, { lower: true, strict: true })
      : undefined;
    const { technologies, ...rest } = dto;
    const project = await this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(slug && { slug }),
        ...(technologies && { technologies: technologies.join(',') }),
      },
    });
    return this.mapProject(project);
  }

  async remove(id: string) {
    await this.findOne(id);
    const project = await this.prisma.project.delete({ where: { id } });
    return this.mapProject(project);
  }
}
