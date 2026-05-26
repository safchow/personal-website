export const README_PROJECTS = [
  {
    title: 'Opulus',
    description:
      'Personal finance dashboard prototype with Plaid account linking, transaction sync, webhook ingestion, and shared DTOs.',
    repoUrl: 'https://github.com/OpulusProject/opulus-mono',
  },
  {
    title: 'wheresxi',
    description:
      'Fake-credit arrival betting market built around retention loops, end-to-end test coverage, and insider trading.',
    repoUrl: 'https://github.com/safchow/wheresxi',
  },
  {
    title: 'safchow.dev',
    description:
      'Portfolio site with a small first-party analytics loop for pageviews, anonymous sessions, click tracking, and aggregate reads.',
    repoUrl: 'https://github.com/safchow/personal-website',
  },
  {
    title: 'Supportive Housing',
    description:
      'Location management platform for Supportive Housing of Waterloo with a Flask API and React TypeScript frontend.',
    repoUrl: 'https://github.com/uwblueprint/supportive-housing',
  },
] satisfies ReadmeProject[];

export interface ReadmeProject {
  title: string;
  description: string;
  repoUrl: string;
}
