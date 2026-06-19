import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    
    // DEV mode offline fallback
    const isNetworkError = error.message === 'Network Error' || error.code === 'ERR_NETWORK';
    if (isNetworkError && import.meta.env.DEV) {
      console.warn(`[DEV Mock] Backend offline. Mocking response for: ${original.method?.toUpperCase()} ${original.url}`);
      const url = original.url || '';
      
      if (url.includes('/auth/login')) {
        return {
          data: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            user: { id: 'mock-admin-id', email: 'admin@portfolio.dev', role: 'SUPER_ADMIN' }
          }
        };
      }
      
      if (url.includes('/contact')) {
        if (original.method?.toLowerCase() === 'get') {
          return {
            data: [
              {
                id: '1',
                name: 'Jane Doe',
                email: 'jane@example.com',
                subject: 'Collaboration Proposal',
                message: 'Hi, I love your portfolio website. I would love to collaborate on a Smart Grid project with you!',
                read: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
              },
              {
                id: '2',
                name: 'John Smith',
                email: 'john@techcorp.com',
                subject: 'Job Opportunity',
                message: 'Dear Developer, we are looking for a hybrid Electrical Engineer and React Developer for our automation team. Please let us know if you are interested.',
                read: true,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
              }
            ]
          };
        }
        return { data: { success: true } };
      }
      
      if (url.includes('/admin/stats')) {
        return {
          data: {
            projectsCount: 2,
            blogsCount: 2,
            testimonialsCount: 1,
            contactsCount: 2,
            unreadContacts: 1
          }
        };
      }
      
      if (url.includes('/projects')) {
        return {
          data: [
            {
              id: '1',
              title: 'Smart Grid Monitoring System',
              slug: 'smart-grid-monitoring',
              description: 'A real-time monitoring dashboard for smart grid power systems using IoT sensors.',
              imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
              technologies: ['React', 'Python', 'MQTT', 'Grafana'],
              category: 'Engineering',
              githubUrl: 'https://github.com',
              featured: true
            },
            {
              id: '2',
              title: 'Personal Portfolio Website',
              slug: 'personal-portfolio',
              description: 'A full-stack portfolio website built with React, NestJS, and PostgreSQL.',
              imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
              technologies: ['React', 'NestJS', 'PostgreSQL', 'Prisma'],
              category: 'Web Development',
              githubUrl: 'https://github.com',
              liveUrl: 'http://localhost:5173',
              featured: true
            }
          ]
        };
      }
      
      if (url.includes('/blog')) {
        if (url.includes('/admin/all') || original.method?.toLowerCase() === 'get') {
          const mockBlogs = [
            {
              id: '1',
              title: 'Understanding Smart Grids: A Beginner\'s Guide',
              slug: 'understanding-smart-grids-beginners-guide',
              excerpt: 'Smart grids are transforming the way we generate, distribute, and consume electricity.',
              content: 'Smart grids are transforming the way we generate, distribute, and consume electricity.',
              tags: ['Smart Grid', 'Power Systems'],
              published: true,
              publishedAt: new Date().toISOString(),
              readTime: 6
            },
            {
              id: '2',
              title: 'My Journey: From Engineering to Web Development',
              slug: 'engineering-to-web-development-journey',
              excerpt: 'How my background in electrical engineering shaped the way I approach software architecture.',
              content: 'How my background in electrical engineering shaped the way I approach software architecture.',
              tags: ['Career', 'Web Development'],
              published: true,
              publishedAt: new Date().toISOString(),
              readTime: 5
            }
          ];
          if (url.includes('/admin/all')) return { data: mockBlogs };
          return { data: { data: mockBlogs, meta: { totalPages: 1 } } };
        }
        return { data: { success: true } };
      }
      
      if (url.includes('/testimonials')) {
        return {
          data: [
            {
              id: '1',
              name: 'Dr. Adebayo Ogunleye',
              role: 'Project Supervisor',
              company: 'Department of EEE',
              content: 'An exceptionally talented student who demonstrated deep technical understanding in power systems.',
              rating: 5,
              published: true
            }
          ]
        };
      }
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          localStorage.setItem('access_token', data.accessToken);
          localStorage.setItem('refresh_token', data.refreshToken);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
};
export const projectsApi = {
  getAll: (params?: { category?: string; featured?: boolean }) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: unknown) => api.post('/projects', data),
  update: (id: string, data: unknown) => api.patch(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};
export const contactApi = {
  submit: (data: unknown) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  markRead: (id: string) => api.patch(`/contact/${id}/read`),
};
export const blogApi = {
  getAll: (params?: { page?: number; limit?: number; tag?: string }) => api.get('/blog', { params }),
  getBySlug: (slug: string) => api.get(`/blog/${slug}`),
  getAllAdmin: () => api.get('/blog/admin/all'),
  create: (data: unknown) => api.post('/blog', data),
  update: (id: string, data: unknown) => api.patch(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`),
};
export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  getAllAdmin: () => api.get('/testimonials/admin/all'),
  create: (data: unknown) => api.post('/testimonials', data),
  update: (id: string, data: unknown) => api.patch(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete(`/testimonials/${id}`),
};
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
};

export default api;
