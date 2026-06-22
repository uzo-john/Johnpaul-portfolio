import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Admin User ──────────────────────────────────────────────
  const targetEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.dev';
  if (targetEmail !== 'admin@portfolio.dev') {
    await prisma.user.deleteMany({
      where: { email: 'admin@portfolio.dev' },
    });
  }

  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_SEED_PASSWORD || 'Admin@Portfolio2024!',
    12,
  );

  await prisma.user.upsert({
    where: { email: targetEmail },
    update: {
      passwordHash,
    },
    create: {
      email: targetEmail,
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
      title: 'Electrical Energy Management in Nigeria: Practical Strategies for Reducing Power Consumption and Costs',
      slug: 'electrical-energy-management-in-nigeria-practical-strategies-for-reducing-power-consumption-and-costs',
      excerpt: 'Managing electrical consumption in Nigeria is essential due to rising energy costs and unreliable power supply. Using energy-efficient appliances such as LED bulbs and inverter systems, turning off unused devices, and monitoring electricity usage can significantly reduce energy waste. Additionally, adopting solar energy solutions helps reduce dependence on the national grid and generators. These practices lower electricity bills, improve energy efficiency, and promote a more sustainable and reliable power system.',
      content: `Electrical Energy Management in Nigeria: Practical Strategies for Reducing Power Consumption and Costs

Introduction

Nigeria's power sector continues to face significant challenges, including unstable grid supply, rising electricity tariffs, increasing fuel prices, and growing energy demand. As a result, effective electrical energy management has become a necessity for households, commercial facilities, and industrial organisations.

Energy management involves the systematic monitoring, control, and optimisation of electrical energy usage to improve efficiency while maintaining productivity and comfort. By adopting proper energy management practices, Nigerians can significantly reduce electricity costs, improve equipment lifespan, and minimise dependence on generators.

Understanding Electrical Energy Consumption

Electrical energy consumption is measured in kilowatt-hours (kWh), which represents the amount of energy consumed by a device over a specified period.

The energy consumed by an appliance can be calculated using:

Energy (kWh) = Power (kW) × Time (Hours)**

For example:

* A 60W LED television operating for 10 hours consumes the following:

  0.06 × 10 = 0.6 kWh

* A 1.5 kW air conditioner operating for 8 hours consumes:

  1.5 × 8 = 12 kWh

Understanding these calculations helps consumers identify which appliances contribute most to their electricity bills.

Major Sources of Energy Waste in Nigerian Homes

Many households unknowingly waste electricity through inefficient practices. Common examples include:

1. Inefficient Lighting Systems

Traditional incandescent bulbs consume significantly more energy than modern LED lamps. Replacing conventional bulbs with LEDs can reduce lighting energy consumption by up to 80%.

2. Poor Appliance Selection

Older refrigerators, freezers, and air conditioners often consume more power due to outdated technology and wear.

3. Standby Power Losses

Devices such as televisions, decoders, chargers, microwaves, and sound systems continue drawing power even when switched off through remote controls.

4. Poor Power Factor

Commercial and industrial facilities often suffer from poor power factor due to inductive loads such as motors and transformers. This leads to inefficient power utilisation and increased operating costs.

Practical Energy Management Strategies

Upgrade to Energy-Efficient Equipment

Investing in inverter-based appliances and energy-efficient equipment can significantly reduce energy consumption.

Examples include:

* Inverter air conditioners
* LED lighting systems
* Energy-efficient refrigerators
* Variable speed drives (VSDs)
* High-efficiency electric motors

Although the initial investment may be higher, the long-term savings usually justify the cost.

Conduct Energy Audits

An energy audit identifies areas where energy is being wasted and provides recommendations for improvement.

A comprehensive audit typically examines:

* Lighting systems
* Air conditioning systems
* Electrical distribution networks
* Motor-driven equipment
* Generator performance
* Renewable energy opportunities

Energy audits are among the most effective methods for reducing operational costs.

Implement Load Management

Load management involves controlling when and how electrical loads operate.

Examples include:

* Running heavy appliances during off-peak periods
* Scheduling industrial processes efficiently
* Disconnecting non-essential loads during generator operation
* Using automatic control systems

This strategy prevents unnecessary energy consumption and improves system efficiency.

Solar Energy as a Long-Term Solution

Nigeria receives abundant solar radiation throughout the year, making solar photovoltaic (PV) systems one of the most practical alternatives to grid electricity and generators.

Benefits include:

* Reduced electricity bills
* Lower fuel consumption
* Reduced carbon emissions
* Increased energy independence
* Improved reliability during grid failures

Modern solar installations combined with lithium battery storage can provide stable power for homes, offices, schools, and healthcare facilities.

Smart Grid Technologies and the Future of Energy Management

The future of Nigeria's power sector lies in smart energy systems.

Smart grid technologies enable:

* Real-time monitoring of electricity consumption
* Automated fault detection
* Improved load balancing
* Demand-side management
* Remote meter reading
* Enhanced grid reliability

By integrating intelligent monitoring and control systems, power utilities can improve efficiency while consumers gain greater visibility into their energy usage.

The Role of Engineers in Energy Conservation

Electrical engineers play a critical role in promoting energy efficiency through:

* System design optimization
* Power quality improvement
* Renewable energy integration
* Protection coordination
* Smart grid development
* Energy auditing and consulting

As Nigeria's energy demand continues to grow, engineering innovations will be essential for building a more reliable and sustainable power infrastructure.

Conclusion

Effective electrical energy management is one of the most practical solutions to Nigeria's ongoing power challenges. Whether in homes, businesses, or industrial facilities, reducing energy waste leads to lower operating costs, improved reliability, and better utilisation of available power resources.

By combining energy-efficient technologies, regular energy audits, smart monitoring systems, and renewable energy solutions, Nigerians can achieve substantial savings while contributing to a more sustainable energy future.

The most affordable unit of electricity is the one that is never wasted. Therefore, energy efficiency should not be viewed as an option but as a fundamental strategy for economic growth and sustainable development in Nigeria.`,
      tags: ['Electrical Energy Management in Nigeria', 'Energy Efficiency', 'Electricity Consumption', 'Smart Grid Technology', 'Solar Energy Nigeria', 'Power Distribution', 'Energy Audit', 'Electrical Engineering', 'Renewable Energy', 'Electricity Cost Reduction'],
      published: true,
      publishedAt: new Date('2026-06-22'),
      readTime: 5,
      coverImage: '/energy_management.png',
    },
  ];

  for (const blog of blogs) {
    const { tags, ...rest } = blog;
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {
        title: rest.title,
        excerpt: rest.excerpt,
        content: rest.content,
        coverImage: rest.coverImage,
        tags: tags.join(','),
        published: rest.published,
        publishedAt: rest.publishedAt,
        readTime: rest.readTime,
      },
      create: {
        ...rest,
        tags: tags.join(','),
      },
    });
  }

  // Prune blog posts not present in the seed file
  const activeSlugs = blogs.map((b) => b.slug);
  await prisma.blogPost.deleteMany({
    where: {
      slug: { notIn: activeSlugs },
    },
  });



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
