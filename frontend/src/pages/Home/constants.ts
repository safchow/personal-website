export const README_PROJECTS = [
  {
    title: 'opulus',
    description:
      'Personal finance workspace for turning scattered bank activity into clearer account, spending, and transaction insights.',
    repoUrl: 'https://github.com/OpulusProject/opulus-mono',
  },
  {
    title: 'wheresxi',
    description:
      'Fake-credit arrival betting market built around retention loops, end-to-end test coverage, and insider trading.',
    repoUrl: 'https://github.com/safchow/wheresxi',
  },
  {
    title: 'personal website',
    description:
      'Portfolio site with a small first-party analytics loop for pageviews, anonymous sessions, click tracking, and aggregate reads.',
    repoUrl: 'https://github.com/safchow/personal-website',
  },
  {
    title: 'supportive housing',
    description:
      'Operational hub for housing staff to manage residents, locations, daily logs, and team workflows in one place.',
    repoUrl: 'https://github.com/uwblueprint/supportive-housing',
  },
] satisfies ReadmeProject[];

export interface ReadmeProject {
  title: string;
  description: string;
  repoUrl: string;
}
