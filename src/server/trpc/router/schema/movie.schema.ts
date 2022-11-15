import z from 'zod'

export const createMovieSchema = z.object({
    plot: z.string(),
    title: z.string(),
    year: z.string(),
    rated: z.string(),
    imdbRating: z.string(),
    poster: z.string(),
    group: z?.string(),
})

export type CreateMovieInput = z.TypeOf<typeof createMovieSchema>

export const createGroupSchema = z.object({
    group: z.string(),
})

export type CreateGroupInput = z.TypeOf<typeof createGroupSchema>

export const editGroupSchema = z.object({
    group: z.string(),
    id: z.string(),
})

export type editGroupSchema = z.TypeOf<typeof editGroupSchema>