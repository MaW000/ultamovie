import z from 'zod'

export const createMovieSchema = z.object({
    plot: z.string(),
    title: z.string(),
    year: z.string(),
    rated: z.string(),
    imdbRating: z.string(),
    poster: z.string(),
})

export type CreateMovieInput = z.TypeOf<typeof createMovieSchema>