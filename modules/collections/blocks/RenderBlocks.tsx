import React, { Fragment } from "react";

// import { CallToActionBlock } from '@/modules/collections/blocks/CallToAction/Component'
// import { ContentBlock } from '@/modules/collections/blocks/Content/Component'
// import { MediaBlock } from '@/modules/collections/blocks/MediaBlock/Component'
import { Post } from "@/payload-types";

// const blockComponents = {
// 	content: ContentBlock,
// 	cta: CallToActionBlock,
// 	mediaBlock: MediaBlock,
// }

export const RenderBlocks: React.FC<{
  // blocks: Page['layout'][0][]
  blocks: Post["content"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {/* {blocks.map((block, index) => {
					const { blockType } = block

					if (blockType && blockType in blockComponents) {
						const Block = blockComponents[blockType]

						if (Block) {
							return (
								<div className='my-16' key={index}>
									@ts-expect-error there may be some mismatch between the expected types here
									<Block {...block} disableInnerContainer />
								</div>
							)
						}
					}
					return null
				})} */}
      </Fragment>
    );
  }

  return null;
};
