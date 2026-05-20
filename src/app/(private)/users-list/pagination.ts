export const PAGE_SIZE_OPTIONS = [
   { label: '8', value: '8' },
   { label: '10', value: '10' },
   { label: '50', value: '50' },
] as const

//type PageSize = 8 | 20 | 50 in numbers
export type PageSize =
   (typeof PAGE_SIZE_OPTIONS)[number]['value'] extends `${infer N extends number}` ? N : never

export const START_CURRENT_PAGE = 1
export const START_PAGE_SIZE = Number(PAGE_SIZE_OPTIONS[0].value) as PageSize
