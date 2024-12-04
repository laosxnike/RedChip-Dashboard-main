// components/TopLikes.tsx
import React from 'react';

interface Post {
  title: string;
  likes: number;
  comments: number;
  imageUrl: string;
}

const posts: Post[] = [
  {
    title: 'The RedChip Daily',
    likes: 14,
    comments: 1,
    imageUrl:
      'https://cdn.usegalileo.ai/stability/64307504-0016-48a2-9d85-fb5937adb679.png',
  },
  {
    title: 'The RedChip Daily',
    likes: 13,
    comments: 1,
    imageUrl:
      'https://cdn.usegalileo.ai/stability/dad057c5-2881-477b-97da-e43c6227a601.png',
  },
  {
    title: 'The RedChip Daily',
    likes: 12,
    comments: 1,
    imageUrl:
      'https://cdn.usegalileo.ai/stability/91a9056f-66cc-4db6-bbc1-10e59a2218f2.png',
  },
  {
    title: 'The RedChip Daily',
    likes: 11,
    comments: 1,
    imageUrl:
      'https://cdn.usegalileo.ai/stability/23c14101-3792-4667-ba63-56f5ffc381e8.png',
  },
  {
    title: 'The RedChip Daily',
    likes: 10,
    comments: 1,
    imageUrl:
      'https://cdn.usegalileo.ai/sdxl10/c9b85e79-f220-4203-a6cf-695bf87b2f26.png',
  },
];

const TopLikes: React.FC = () => {
  return (
    <>
      {posts.map((post, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-[#111518] px-4 py-3"
        >
          <div
            className="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-24"
            style={{ backgroundImage: `url("${post.imageUrl}")` }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-white text-base font-medium leading-normal line-clamp-1">
              {post.title}
            </p>
            <p className="text-[#9cacba] text-sm font-normal leading-normal line-clamp-2">
              {post.likes} likes · {post.comments} comment
              {post.comments !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopLikes;
