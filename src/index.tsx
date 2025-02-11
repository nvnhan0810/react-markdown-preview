import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import React from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from "unified";

export const MarkdownPreview = ({ doc, tocHeading = 'Nội dung' }: { doc: string, tocHeading?: string }) => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlight)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings);

    const mdastTree = processor.parse(doc);
    const hastTree = processor.runSync(mdastTree, doc)

    const result = toJsxRuntime(hastTree, {
        Fragment,
        ignoreInvalidStyle: true,
        jsx,
        jsxs,
        passKeys: true,
        passNode: true
    });

    return (
        <div className="markdown-body">
            {result}
        </div>
    );
}