export const categories = [
  {
    id: 'sports',
    name: 'Sports',
    cue: 'The joy of playing again.',
    description:
      'Take your place on the field. Play a real game, with a result you can hold on to.',
    color: '#dfefe5',
    icon: 'Trophy',
    options: [
      {
        id: 'cricket',
        title: 'Play a proper game of cricket',
        detail:
          'A hosted match, people cheering you on, and a printed scorecard with your name on it.',
        artifact: 'Your named, printed scorecard',
        witness: 'Invite family and friends to watch your match.',
      },
      {
        id: 'badminton',
        title: 'Play my first badminton doubles match',
        detail:
          'Prepare with a small group, find a partner, and play a friendly match.',
        artifact: 'A match record and team photograph',
        witness: 'Share the court with a partner and a small audience.',
      },
    ],
  },
  {
    id: 'art',
    name: 'Art',
    cue: 'Something only you could make.',
    description:
      'Make something, finish it, and let someone experience what you have created.',
    color: '#f3e5e0',
    icon: 'Palette',
    options: [
      {
        id: 'song',
        title: 'Record one song in my own voice',
        detail:
          'Rehearse a song you love, record it, and share a listening moment with your people.',
        artifact: 'Your finished song recording',
        witness: 'A listening session with people you choose.',
      },
      {
        id: 'painting',
        title: 'Paint a piece I can put on my wall',
        detail:
          'Go from an idea to a finished painting, with guidance along the way.',
        artifact: 'Your original finished painting',
        witness: 'A small showing for friends and family.',
      },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    cue: 'Find out what you can do.',
    description:
      'Discover a new capability at your own pace, with the right support.',
    color: '#e8e9f5',
    icon: 'Waves',
    options: [
      {
        id: 'swimming',
        title: 'Swim a distance that feels meaningful to me',
        detail:
          'Work with a qualified instructor towards a personally suitable swimming milestone.',
        artifact: 'A personal capability record',
        witness: 'An instructor witnesses your agreed milestone.',
      },
      {
        id: 'walk',
        title: 'Finish a walking route I have chosen',
        detail:
          'Choose an appropriate route and prepare for a supported group walk.',
        artifact: 'Your route and finishing photograph',
        witness: 'Walk alongside a supportive small group.',
      },
    ],
  },
  {
    id: 'travel',
    name: 'Travel',
    cue: 'Go where your mind wanders.',
    description:
      'Turn a place you have talked about into a memory you actually share.',
    color: '#f3eed9',
    icon: 'Compass',
    options: [
      {
        id: 'parents-trip',
        title: 'Take that first trip with my parents',
        detail:
          'Make room for a thoughtfully planned trip together, at a pace that suits your family.',
        artifact: 'A printed photo story of your trip',
        witness: 'Experience it together with your family.',
      },
      {
        id: 'solo-trip',
        title: 'Take my first supported solo trip',
        detail:
          'Try travelling independently, with a clear plan and support for the unfamiliar parts.',
        artifact: 'Your personal travel journal',
        witness: 'Share a trip story with people who matter to you.',
      },
    ],
  },
  {
    id: 'tech',
    name: 'Tech',
    cue: 'Bring that little idea to life.',
    description:
      'Build a small, useful thing. Put it into the hands of someone who needs it.',
    color: '#dfeaf5',
    icon: 'Code2',
    options: [
      {
        id: 'useful-tool',
        title: 'Build a little tool someone actually uses',
        detail:
          'Choose one everyday problem, build a working solution, and let someone try it.',
        artifact: 'Your working tool and first-use record',
        witness: 'Show it to the people you built it for.',
      },
      {
        id: 'website',
        title: 'Publish a website for something I care about',
        detail:
          'Bring a personal project or community idea online, one useful page at a time.',
        artifact: 'A published website you can share',
        witness: 'Invite your community to use the finished site.',
      },
    ],
  },
] as const;
export type CategoryId = (typeof categories)[number]['id'];
export type Option = (typeof categories)[number]['options'][number];
export const findOption = (id: string) =>
  categories.flatMap((c) => [...c.options]).find((o) => o.id === id);
