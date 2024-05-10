import DataTable from "react-data-table-component";
import { useState } from "react";
import { Edit, Trash, EyeOff } from "react-feather";
import Modal from "../../components/Modal";
import {
  useUpdate,
  usePosts,
  useCreate,
  useDelete,
  useHide,
} from "../../services/posts";
import { useUsers } from "../../services/lookups";

export const HomePage = () => {
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
  const {
    mutateAsync: addPost,
    isLoading: whileSave,
    isError: isIssue,
    error: postError,
  } = useCreate();
  const { mutateAsync: removePost, isLoading: whileRemove } = useDelete();
  const { mutateAsync: hidePost, isLoading: isLodingHide } = useHide();

  const columns = [
    {
      name: "Id",
      selector: (row: any) => row.id,
    },
    {
      name: "name",
      selector: (row: any) => row.name,
    },
    {
      name: "Title",
      selector: (row: any) => row.title,
    },
    {
      cell: (row: any) => (
        <div className="flex gap-1">
          <button
            type="button"
            className="shadow p-2 rounded"
            onClick={async () => editPost(row)}
          >
            <Edit size={10} />
          </button>
          <button
            type="button"
            className="shadow p-2 rounded "
            onClick={async () => deletePost(row.id)}
          >
            <Trash size={10} className="text-red-500" />
          </button>
          <button
            type="button"
            className="shadow p-2 rounded "
            onClick={async () => handleHidePost(row.id)}
          >
            <EyeOff size={10} />
          </button>
        </div>
      ),
    },
  ];

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

  const handleSelectOption = (e: any) => {
    console.log(e.target.value);
    setUserId(e.target.value);
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
      <div className="flex flex-col gap-0 w-[80rem]">
        <div className="flex justify-between">
          <div className="">
            <button
              className="my-10 border border-gray-200 px-6 uppercase shadow text-sm bg-blue-200 py-1 rounded"
              onClick={createPost}
            >
              Add Post
            </button>
          </div>
          <div className="w-40"></div>
        </div>
        <DataTable
          className="w-[80rem]"
          columns={columns}
          data={posts}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          paginationDefaultPage={page}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
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
            <select
              className="border border-gray-300 p-1 rounded  outline-0"
              onChange={handleSelectOption}
              value={userId}
            >
              <option value="" className="">
                --select user--
              </option>
              {users?.map((user: any, index: number) => {
                return (
                  <option
                    key={index}
                    selected={user.id == userId}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                );
              })}
            </select>
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
