export const README_PROJECTS = [
  {
    title: 'wheresxi',
    description:
      'Fake-credit arrival betting market built around retention loops, end-to-end test coverage, and insider trading.',
    repoUrl: 'https://github.com/safchow/wheresxi',
  },
  {
    title: 'safchow.com',
    description:
      'Portfolio site with a small first-party analytics loop for pageviews, anonymous sessions, click tracking, and aggregate reads.',
    repoUrl: 'https://github.com/safchow/personal-website',
  },
] satisfies ReadmeProject[];

export interface ReadmeProject {
  title: string;
  description: string;
  repoUrl: string;
}
