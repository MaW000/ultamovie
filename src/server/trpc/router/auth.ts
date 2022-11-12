import { router, publicProcedure, protectedProcedure } from "../trpc";
import { createMovieSchema, createGroupSchema } from './schema/movie.schema'
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  saveMovie: protectedProcedure.input(createMovieSchema)
  .mutation(async ({ input, ctx }) => {
    console.log(input, ctx)
    let data = {...input, userId: ctx.session.user.id}
    console.log(data)
    const movie = await ctx.prisma.movie.create({
      data: {
        
        user: {
          connect: {
            id: ctx.session.user.id
          }
        },
        ...input,
      }
    })
    return movie
  }),
  getAll: protectedProcedure.input(createGroupSchema)
  .query(({ ctx, input }) => {
    console.log(ctx)
    return ctx.prisma.movie.findMany({
      where: {
        userId: ctx.session.user.id,
        group: input.group
      }
    });
  }),
  getAllGroups: protectedProcedure
  .query(({ ctx }) => {
    console.log(ctx)
    return ctx.prisma.movie.findMany({
      where: {
        userId: ctx.session.user.id,
        
      },
      select: {
        group: true
      }
    });
  }),
  editGroup: protectedProcedure.input(createGroupSchema)
  .mutation(async ({ input, ctx }) => {
    
    let data = {...input}
    console.log(data)
    // const movie = await ctx.prisma.movie.create({
    //   data: {
        
    //     user: {
    //       connect: {
    //         id: ctx.session.user.id
    //       }
    //     },
    //     ...input,
    //   }
    // })
    return
  }),
});
