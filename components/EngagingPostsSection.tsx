// components/EngagingPostsSection.tsx

import React from 'react';

interface EngagingPost {
  image: string;
  title: string;
}

interface EngagingPostsSectionProps {
  posts: EngagingPost[];
}

const EngagingPostsSection: React.FC<EngagingPostsSectionProps> = ({ posts }) => {
  if (!posts.length) {
    return (
      <section className="my-8">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Most Engaging Posts
        </h2>
        <p className="text-gray-500 px-4">No engaging posts available.</p>
      </section>
    );
  }

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Most Engaging Posts
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex flex-1 gap-3 rounded-lg border border-[#3b4954] bg-[#1b2227] p-4 items-center"
          >
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
            <h2 className="text-white text-base font-bold leading-tight">
              {post.title}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default EngagingPostsSection;
