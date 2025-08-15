export const COLLECTIONS = {
  CREATIVITY_USERS: 'creatives-users',
  RULIT_USERS: 'rulit-users',
  META: 'creatives-meta',
  RULIT_CONFIG: 'rulit-config',
  RULIT_SOLUTIONS: 'rulit-solutions',
  ADMIN_USERS: 'admin-users',
} as const;

export const docPaths = {
  creativityUser: (id: string) => `${COLLECTIONS.CREATIVITY_USERS}/${id}`,
  rulitUser: (id: string) => `${COLLECTIONS.RULIT_USERS}/${id}`,
  meta: (id: string) => `${COLLECTIONS.META}/${id}`,
  adminUser: (id: string) => `${COLLECTIONS.ADMIN_USERS}/${id}`,
};
