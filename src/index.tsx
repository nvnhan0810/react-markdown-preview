import 'github-markdown-css/github-markdown-light.css';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import React from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from "unified";
import "./highlight.css";

export const MarkdownPreview = ({ doc }: { doc: string }) => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlight);

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