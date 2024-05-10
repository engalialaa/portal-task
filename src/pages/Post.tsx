import { useState } from "react";
import { usePosts } from "../services/posts/use-posts";
import { useCreate, useDelete, useHide, useUpdate } from "../services/posts";
import { useUsers } from "../services/lookups";
import Modal from "../components/Modal";

export const Posts = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [id, setId] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<any>(null);
  const [body, setBody] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { posts, isLoading, totalCount, refetch } = usePosts(page, limit);
  const { users, refetchUsers, isLoadingUsers, isErrorUsers } = useUsers();
  const { mutateAsync, isLoading: editLoading, isError } = useUpdate();
  const { mutateAsync: addPost } = useCreate();
  const { mutateAsync: removePost, isLoading: whileRemove } = useDelete();
  const { mutateAsync: hidePost, isLoading: isLodingHide } = useHide();

  const editPost = (post: any) => {
    setTitle(post.title);
    setBody(post.body);
    setId(post.id);
    setUserId(post.userId);
    setIsEdit(true);

    setOpenEdit(true);
  };

  const deletePost = async (id: number) => {
    await removePost(id);
    await refetch();
  };

  const createPost = () => {
    setTitle("");
    setBody("");
    setId("");
    setUserId("");
    setIsEdit(false);

    setOpenEdit(true);
  };
  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPage(page);
    setLimit(newPerPage);
  };
  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  const editSubmit = async () => {
    const payload = {
      id: id,
      title: title,
      body: body,
      userId: userId,
    };
    await mutateAsync(payload);
    await refetch();
  };

  const submit = async () => {
    const payload = {
      title: title,
      body: body,
      userId: userId,
    };
    await addPost(payload);
    await refetch();
    setOpenEdit(false);
  };

  const handleHidePost = async (id: number) => {
    await hidePost(id);
    await refetch();
  };

  return (
    <div className="flex justify-center">
      {!isLoading ? (
        <div className="flex flex-col gap-2 h-[50rem] overflow-y-scroll">
          <div className="flex justify-between">
            <div className="">
              <button
                className="my-6 border border-gray-200 px-6 uppercase shadow text-sm bg-blue-200 py-1 rounded"
                onClick={createPost}
              >
                Add Post
              </button>
            </div>
            <div className="w-40"></div>
          </div>
          {posts?.map((post: any, index: number) => {
            return (
              <div
                className="max-w-2xl px-8 pb-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                key={index}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                    {post.createdAt}
                  </span>
                  <a
                    className="px-3 py-1 text-xs font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                    role="button"
                  >
                    {post.isBelongToMe ? "Yours" : ""}
                  </a>
                </div>

                <div className="mt-2">
                  <a
                    href="#"
                    className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                    role="link"
                  >
                    {post.title}
                  </a>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {post.body}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex gap-2">
                    {post.isBelongToMe && (
                      <>
                        <button
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          role="link"
                          onClick={async () => editPost(post)}
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-600 dark:text-blue-400 hover:underline"
                          role="link"
                          onClick={async () => deletePost(post.id)}
                        >
                          Delete
                        </button>

                        <button
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          role="link"
                          onClick={async () => hidePost(post.id)}
                        >
                          Hide
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center">
                    <img
                      className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                      src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                      alt="avatar"
                    />
                    <a
                      className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
                      role="link"
                    >
                      {post.name}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <div className="flex justify-center py-10 px-5">
          <div className="flex flex-col gap-2 w-[25rem]">
            <input
              type="text"
              className="border border-gray-300 p-1 rounded  outline-0"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 p-1 rounded h-[8rem] outline-0"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            {isEdit ? (
              <button className="" onClick={editSubmit}>
                SaveChange
              </button>
            ) : (
              <button className="" onClick={submit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
