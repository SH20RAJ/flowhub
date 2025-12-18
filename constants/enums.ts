export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
}

export enum Source {
    Official = 'Official',
    Community = 'Community',
}

export const DIFFICULTY_OPTIONS = [
    { label: 'All Difficulties', value: 'all' },
    { label: Difficulty.Beginner, value: Difficulty.Beginner },
    { label: Difficulty.Intermediate, value: Difficulty.Intermediate },
    { label: Difficulty.Advanced, value: Difficulty.Advanced },
];

export const SOURCE_OPTIONS = [
    { label: 'All Sources', value: 'all' },
    { label: Source.Official, value: Source.Official },
    { label: Source.Community, value: Source.Community },
];
