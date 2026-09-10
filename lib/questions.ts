import type { CategoryId } from './catalog';
export const questions: Record<
  CategoryId,
  { question: string; invitation: string; note: string }
> = {
  sports: {
    question: 'What would you love to play?',
    invitation:
      'Think of the game you miss. Or the one you’ve always wanted to try.',
    note: 'A real game. A shared moment. Something to remember.',
  },
  art: {
    question: 'What would you love to create?',
    invitation:
      'Something in your own voice. Something made by your own hands.',
    note: 'You don’t need to call yourself an artist.',
  },
  health: {
    question: 'What would you love to feel capable of?',
    invitation:
      'A personal milestone, with the right support and a pace that suits you.',
    note: 'Start with what feels meaningful to you.',
  },
  travel: {
    question: 'Where does your mind wander?',
    invitation:
      'Think of a trip you keep talking about. And who you’d like beside you.',
    note: 'A place becomes different once you’ve been there.',
  },
  tech: {
    question: 'What would you love to bring to life?',
    invitation:
      'A small idea. A useful thing. Something you can put into someone’s hands.',
    note: 'It begins with an idea you care about.',
  },
};
