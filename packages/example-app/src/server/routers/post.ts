/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { updatePostSchema } from '~/pages';
import { z } from 'zod';

// DON'T DO THAT IN PRODUCTION
const post: z.infer<typeof updatePostSchema> = {
  id: '0b64baee-cf1f-474a-b161-44878b24817f',
  title: 'My Title',
  text: 'My Content Text',
  age: 28,
};

export const postRouter = router({
  update: publicProcedure
    .input(updatePostSchema)
    .mutation(async ({ input }) => {
      Object.assign(post, input);
    }),
  get: publicProcedure.query(() => {
    return post;
  }),
});
