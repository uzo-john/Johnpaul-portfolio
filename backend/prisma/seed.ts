import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Admin User ──────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_SEED_PASSWORD || 'Admin@Portfolio2024!',
    12,
  );

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@portfolio.dev' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.dev',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Admin user seeded');

  // ─── Projects ────────────────────────────────────────────────
  const projects = [
    {
      title: 'Smart Grid Monitoring System',
      slug: 'smart-grid-monitoring',
      description:
        'A real-time monitoring dashboard for smart grid power systems using IoT sensors and data visualization.',
      longDesc:
        'Designed and implemented a comprehensive smart grid monitoring system that collects real-time data from IoT sensors deployed across distribution nodes. The system processes voltage, current, and frequency readings, triggering automated alerts for anomalies.',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      technologies: ['Python', 'MQTT', 'InfluxDB', 'Grafana', 'Raspberry Pi', 'React'],
      category: 'Engineering',
      githubUrl: 'https://github.com/portfolio-user/smart-grid-monitor',
      liveUrl: null,
      featured: true,
      order: 1,
    },
    {
      title: 'Personal Portfolio Website',
      slug: 'personal-portfolio',
      description:
        'A full-stack portfolio website built with React, NestJS, and PostgreSQL following enterprise-level best practices.',
      longDesc:
        'Designed and developed a production-ready portfolio website with a React frontend and NestJS backend. Features include JWT authentication, admin dashboard, dark/light mode, and PWA support.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      technologies: ['React', 'NestJS', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Framer Motion'],
      category: 'Web Development',
      githubUrl: 'https://github.com/portfolio-user/personal-portfolio',
      liveUrl: 'https://portfolio.vercel.app',
      featured: true,
      order: 2,
    },
    {
      title: 'PLC-Based Conveyor Automation',
      slug: 'plc-conveyor-automation',
      description:
        'Ladder logic programming for a conveyor belt automation system with fault detection and HMI interface.',
      longDesc:
        'Programmed a Siemens S7-300 PLC for an industrial conveyor system. Implemented structured ladder logic for motor control, sensor integration, and automated fault detection with HMI visualization.',
      imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800',
      technologies: ['SIMATIC Step 7', 'Ladder Logic', 'HMI', 'SCADA', 'Siemens S7-300'],
      category: 'Automation',
      githubUrl: null,
      liveUrl: null,
      featured: true,
      order: 3,
    },
    {
      title: 'E-Commerce Web Application',
      slug: 'ecommerce-web-app',
      description:
        'A responsive e-commerce platform with product catalog, cart, and Paystack payment integration.',
      longDesc:
        'Built a full-featured e-commerce application with product listing, cart management, user authentication, and payment gateway integration using Paystack. Includes admin panel for inventory management.',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Paystack', 'CSS3'],
      category: 'Web Development',
      githubUrl: 'https://github.com/portfolio-user/ecommerce-app',
      liveUrl: null,
      featured: false,
      order: 4,
    },
    {
      title: 'Power Factor Correction Unit',
      slug: 'power-factor-correction',
      description:
        'Design and simulation of an automatic power factor correction unit using capacitor bank switching.',
      longDesc:
        'Final year project: Designed an automatic power factor correction (APFC) unit that monitors load power factor and switches capacitor banks using thyristor-based circuits. Simulated in MATLAB/Simulink.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      technologies: ['MATLAB', 'Simulink', 'Thyristor Circuits', 'AutoCAD Electrical'],
      category: 'Engineering',
      githubUrl: null,
      liveUrl: null,
      featured: false,
      order: 5,
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      description:
        'A productivity app with drag-and-drop task boards, team collaboration, and real-time updates.',
      longDesc:
        'Developed a Kanban-style task management application with real-time collaboration via WebSockets. Features include drag-and-drop boards, task assignments, due dates, and email notifications.',
      imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
      technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      category: 'Web Development',
      githubUrl: 'https://github.com/portfolio-user/task-manager',
      liveUrl: null,
      featured: false,
      order: 6,
    },
  ];

  for (const project of projects) {
    const { technologies, ...rest } = project;
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        ...rest,
        technologies: technologies.join(','),
      },
    });
  }

  console.log(`✅ ${projects.length} projects seeded`);

  // ─── Testimonials ─────────────────────────────────────────────
  const testimonials = [
    {
      name: 'Dr. Adebayo Ogunleye',
      role: 'Project Supervisor',
      company: 'Department of EEE',
      content:
        'An exceptionally talented student who demonstrated deep technical understanding in power systems. His final year project on power factor correction was among the best in the department.',
      rating: 5,
    },
    {
      name: 'Engr. Fatima Al-Hassan',
      role: 'Senior Engineer',
      company: 'National Grid PLC',
      content:
        'A quick learner with great attention to detail during his internship. He contributed meaningfully to our SCADA integration project and always brought fresh ideas to the team.',
      rating: 5,
    },
    {
      name: 'Chisom Eze',
      role: 'Team Lead',
      company: 'TechHub Lagos',
      content:
        'Worked with him on a web development project and was impressed by his clean code, problem-solving skills, and ability to deliver under pressure. Highly recommend.',
      rating: 5,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.name.replace(/\s/g, '-').toLowerCase() },
      update: {},
      create: { ...t, id: t.name.replace(/\s/g, '-').toLowerCase() },
    });
  }

  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // ─── Blog Posts ───────────────────────────────────────────────
  const blogs = [
    {
      title: 'Understanding Smart Grids: A Beginner\'s Guide',
      slug: 'understanding-smart-grids-beginners-guide',
      excerpt:
        'Smart grids are transforming the way we generate, distribute, and consume electricity. Here\'s a straightforward guide to understanding the technology.',
      content: `# Understanding Smart Grids

A **smart grid** is an electricity network that uses digital communications technology to detect and react to local changes in usage...

## Key Components
- Advanced Metering Infrastructure (AMI)
- Distribution Automation
- Demand Response Systems

## Why It Matters
Smart grids reduce energy waste, improve reliability, and enable integration of renewable energy sources.`,
      tags: ['Smart Grid', 'Power Systems', 'Engineering', 'Technology'],
      published: true,
      publishedAt: new Date('2024-03-15'),
      readTime: 6,
    },
    {
      title: 'My Journey: From Engineering to Web Development',
      slug: 'engineering-to-web-development-journey',
      excerpt:
        'How my background in electrical engineering shaped the way I approach web development and software architecture.',
      content: `# My Journey

When I started studying Electrical & Electronics Engineering, I never imagined I'd end up passionate about web development too...

## The Connection
Engineering taught me to think in systems. Every circuit is a system with inputs, processing, and outputs — just like a web application.

## Skills Transfer
- Problem decomposition
- Debugging systematically
- Documentation habits
- Attention to edge cases`,
      tags: ['Career', 'Web Development', 'Engineering', 'Personal'],
      published: true,
      publishedAt: new Date('2024-05-01'),
      readTime: 5,
    },
  ];

  for (const blog of blogs) {
    const { tags, ...rest } = blog;
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {},
      create: {
        ...rest,
        tags: tags.join(','),
      },
    });
  }

  console.log(`✅ ${blogs.length} blog posts seeded`);
  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
