import { gql, useMutation, useQuery } from "@apollo/client";
import { TTag } from "../types/tags";
import { removeFieldInObject } from "../utils/object";
import { getFilterLocalStorage, setFilterLocalStorage } from "./asyncStorage";

export const queryGetTags = gql`
  query tags {
    tags {
      id
      name
      color
    }
  }
`;

interface TUserTag {
  tags: TTag[];
}

export function useTags() {
  const { data, ...rest } = useQuery<TUserTag>(queryGetTags);

  return { ...rest, data: data?.tags ?? [], query: queryGetTags };
}

// ---------- //
// --Delete-- //
// ---------- //

const mutationDeleteTag = gql`
  mutation deleteTag($id: String!) {
    deleteTag(id: $id)
  }
`;

export function useDeleteTag() {
  const [mutation, { client }] = useMutation(mutationDeleteTag);

  async function onMutate(id: string) {
    await mutation({ variables: { id } });

    client.cache.updateQuery(
      {
        query: queryGetTags,
      },
      (tags: TUserTag | null): TUserTag | null => {
        return { tags: tags?.tags.filter((tag) => tag.id != id) ?? [] };
      }
    );
    // Update filter
    const currentFilter = await getFilterLocalStorage();
    const newTags = currentFilter.tags?.filter((t) => t != id);
    if (newTags?.length != currentFilter.tags?.length) {
      // need to remove one tag in filter
      await setFilterLocalStorage({ ...currentFilter, tags: newTags });
    }
  }
  return onMutate;
}

// ---------- //
// --Create-- //
// ---------- //

const mutationAddTag = gql`
  mutation createTag($tag: TagBody!) {
    createTag(tag: $tag) {
      id
      name
      color
    }
  }
`;

export function useAddTag() {
  const [mutation, { client }] = useMutation<{ createTag: TTag }>(
    mutationAddTag
  );

  async function onMutate(name: string, color: string) {
    const { data: newTag } = await mutation({
      variables: {
        tag: {
          name,
          color,
        },
      },
    });
    if (newTag) {
      client.cache.updateQuery(
        {
          query: queryGetTags,
        },
        (tags: TUserTag | null): TUserTag | null => {
          return { tags: [...(tags?.tags ?? []), newTag.createTag].sort() };
        }
      );
    }
  }
  return onMutate;
}

// ---------- //
// --Update-- //
// ---------- //

const mutationUpdateTag = gql`
  mutation updateTag($id: String!, $tag: TagBody!) {
    updateTag(id: $id, tag: $tag) {
      id
      name
      color
    }
  }
`;

export function useUpdateTag() {
  const [mutation, { client }] = useMutation<{ updateTag: TTag }>(
    mutationUpdateTag
  );

  function onMutate(id: string, tag: { name: string; color: string }) {
    removeFieldInObject({ obj: tag, key: "__typename", recursively: true });

    mutation({
      variables: {
        id,
        tag,
      },
    });
  }
  return onMutate;
}
