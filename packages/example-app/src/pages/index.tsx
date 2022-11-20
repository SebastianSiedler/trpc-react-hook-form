import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { z } from 'zod';
import { useTRPCForm } from 'lib';

export const updatePostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(32),
  text: z.string().min(1),
  age: z.number().optional(),
});

const IndexPage: NextPageWithLayout = () => {
  const postQuery = trpc.post.get.useQuery();

  const { register, ...form } = useTRPCForm({
    validator: updatePostSchema,
    mutation: trpc.post.update,
    mutationOptions: {},
    formOptions: {
      values: postQuery.data,
    },
  });

  return (
    <div>
      {postQuery.status === 'success' && (
        <>
          <pre>{JSON.stringify(postQuery.data, null, 4)}</pre>

          <form
            onSubmit={form.handleSubmit}
          >
            <input type="text" {...register('text')} />
            <input type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default IndexPage;
