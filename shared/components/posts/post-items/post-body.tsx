import { PostHero } from "@/modules/heros/PostHero";
import { Post } from "@/payload-types";
import RichText from "@/shared/components/RichText";
import { Title } from "@/shared/components/title";
import { cn } from "@/shared/lib/utils";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Link from "next/link";
import React from "react";

interface Props {
  postTitle: string;
  postContent: SerializedEditorState;
  postHero: Post;
  postUrl: string;
  className?: string;
  maxLength: number;
}

const truncateEditorState = (
  serializedState: SerializedEditorState,
  maxLength: number,
): SerializedEditorState => {
  if (!serializedState || !serializedState.root) return serializedState;

  let charCount = 0;

  const truncateNode = (node: any): any => {
    if (charCount >= maxLength) return null;

    if (node.children) {
      const newChildren = [];
      for (const child of node.children) {
        const newChild = truncateNode(child);
        if (!newChild) break;
        newChildren.push(newChild);
      }
      return { ...node, children: newChildren };
    } else if (node.text) {
      const remaining = maxLength - charCount;
      const truncatedText = node.text.slice(0, remaining);
      charCount += truncatedText.length;
      return { ...node, text: truncatedText };
    }

    return node;
  };

  return {
    ...serializedState,
    root: truncateNode(serializedState.root),
  };
};

export const PostBody: React.FC<Props> = ({
  postTitle,
  postContent,
  postHero,
  postUrl,
  className,
  maxLength,
}) => {
  return (
    <div className={cn("", className)}>
      <Link href={postUrl}>
        <Title text={postTitle} size="sm" className="font-extrabold my-2" />
        <RichText
          className="max-w-[48rem] mx-auto mb-4"
          data={truncateEditorState(postContent, maxLength)}
          enableGutter={false}
        />
        {PostHero ? <PostHero post={postHero} /> : null}
      </Link>
    </div>
  );
};
