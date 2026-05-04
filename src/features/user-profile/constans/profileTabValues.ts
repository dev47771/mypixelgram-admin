export const PROFILE_TAB_VALUES = {
   uploadedFiles: 'uploaded-files',
   payments: 'payments',
   followers: 'followers',
   following: 'following',
} as const

export type ProfileTabType = (typeof PROFILE_TAB_VALUES)[keyof typeof PROFILE_TAB_VALUES]
