import { formatDateTime } from "@/shared/lib/formatDateTime";
import React from "react";

import type { Post } from "@/payload-types";

import { Media } from "@/shared/components/Media";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            <React.Fragment>
              {post.community && post.community?.title}
            </React.Fragment>
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">
              {post.community && post.community?.title}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {post.author && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{post.author.name}</p>
                </div>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={post.publishedAt}>
                  {formatDateTime(post.publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {post.heroImage && typeof post.heroImage !== "string" && (
          <Media
            fill
            priority
            imgClassName="-z-10 rounded-md object-cover"
            resource={post.heroImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};
