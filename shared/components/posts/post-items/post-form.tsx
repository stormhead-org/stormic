"use client";

import { PostItem } from "@/shared/components/posts/post-items/post-item";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { Post } from "@/payload-types";

interface Props {
  post: Post[];
  limit?: number;
  loading?: boolean;
  relatedPost?: boolean;
  className?: string;
}

export const PostForm: React.FC<Props> = ({
  post,
  limit = 5,
  loading,
  relatedPost,
  className,
}) => {
  if (loading) {
    return (
      <div className={className}>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      {post.map((item, index) => (
        <PostItem key={index} post={item} relatedPost={relatedPost} />
      ))}
    </div>
  );
};
