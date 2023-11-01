import { getSessionUser } from "@/components/get-session-user";
import postgres from "../postgres";

export const getFollowingTags = async ({ id }: { id: number | undefined }) => {
  const followingTags = await postgres.user.findFirst({
    where: { id },
    select: {
      tagfollower: {
        include: {
          tag: true,
        },
      },
      id: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 750));
  return {
    followingTags: JSON.parse(JSON.stringify(followingTags?.tagfollower)),
  };
};

export const getFollowings = async ({ id }: { id: number | undefined }) => {
  const followings = await postgres.user.findFirst({
    where: { id },
    select: {
      Followings: {
        include: {
          following: true,
        },
      },
      id: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 750));
  return { followings: JSON.parse(JSON.stringify(followings?.Followings)) };
};

export const getFollowers = async ({ id }: { id: number | undefined }) => {
  const followers = await postgres.user.findFirst({
    where: { id },
    select: {
      Followers: {
        include: {
          follower: true,
        },
      },
      id: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 750));
  return { followers: JSON.parse(JSON.stringify(followers?.Followers)) };
};

export const getPosts = async ({ id }: { id: number | undefined }) => {
  const posts = await postgres.user.findFirst({
    where: { id },
    select: {
      posts: {
        include: {
          author: true,
          tags: true,
          comments: true,
          likes: true,
        },
      },
      id: true,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 750));
  return { posts: JSON.parse(JSON.stringify(posts?.posts)) };
};

export const getLikes = async ({ id }: { id: number | undefined }) => {
  const likes = await postgres.user.findFirst({
    where: { id },
    select: {
      likes: {
        include: {
          post: true,
        },
      },
      id: true,
    },
  });

  return { likes: JSON.parse(JSON.stringify(likes?.likes)) };
};

export const getComments = async ({ id }: { id: number | undefined }) => {
  const comments = await postgres.user.findFirst({
    where: { id },
    select: {
      comments: {
        include: {
          post: true,
        },
      },
      id: true,
    },
  });

  return { comments: JSON.parse(JSON.stringify(comments?.comments)) };
};

export const getSettings = async ({ id }: { id: number | undefined }) => {
  const settings = await postgres.user.findFirst({
    where: { id },
    select: {
      settings: {
        select: {
          appearance: true,
          language: true,
          userId: true,
        }
      },
      id: true,
    },
  });

  return { settings: JSON.parse(JSON.stringify(settings?.settings)) };
};

export const getBookmarks = async ({ id }: { id: number | undefined }) => {
  const bookmarks = await postgres.user.findFirst({
    where: { id },
    select: {
      bookmarks: true,
      id: true,
    },
  });

  return { bookmarks: JSON.parse(JSON.stringify(bookmarks?.bookmarks)) };
};

export const getNotifications = async ({ id }: { id: number }) => {
  const notifications = await postgres.user.findFirst({
    where: { id },
    select: {
      notifications: true,
      id: true,
    },
  });

  return { notifications: JSON.parse(JSON.stringify(notifications?.notifications)) };
};
