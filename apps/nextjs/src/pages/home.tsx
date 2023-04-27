import { api } from "~/utils/api";
import PostCard from "~/components/PostCard";
import { useMainLayout } from "~/components/layouts/main";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => postQuery.refetch(),
  });

  return (
    <div className="flex flex-col gap-4">
      {postQuery.data ? (
        postQuery.data?.length === 0 ? (
          <span>There are no posts!</span>
        ) : (
          <div className="flex w-full flex-col gap-4">
            {postQuery.data?.map((p) => {
              return (
                <PostCard
                  key={p.id}
                  post={p}
                  onPostDelete={() => deletePostMutation.mutate(p.id)}
                />
              );
            })}
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

Home.useLayout = useMainLayout;

export default Home;
