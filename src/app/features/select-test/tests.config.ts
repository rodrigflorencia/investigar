export interface TestEntry {
  key: string;
  title: string;
  route: string;
  icon: string;
  enabled: boolean;
}

export const TESTS: TestEntry[] = [
  {
    key: 'creativity',
    title: 'Creatividad',
    route: '/creativity/instructions',
    icon: 'assets/icons/creativity.svg',
    enabled: true,
  },
  {
    key: 'rulit',
    title: 'Memoria (RULIT)',
    route: '/rulit/instructions',
    icon: 'assets/icons/memory.svg',
    enabled: true,
  },
];
