"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownPreview = void 0;
require("github-markdown-css/github-markdown-light.css");
const hast_util_to_jsx_runtime_1 = require("hast-util-to-jsx-runtime");
const react_1 = __importDefault(require("react"));
const jsx_runtime_1 = require("react/jsx-runtime");
const rehype_highlight_1 = __importDefault(require("rehype-highlight"));
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_rehype_1 = __importDefault(require("remark-rehype"));
const unified_1 = require("unified");
require("./highlight.module.css");
const MarkdownPreview = ({ doc }) => {
    const processor = (0, unified_1.unified)()
        .use(remark_parse_1.default)
        .use(remark_gfm_1.default)
        .use(remark_rehype_1.default, { allowDangerousHtml: true })
        .use(rehype_highlight_1.default);
    const mdastTree = processor.parse(doc);
    const hastTree = processor.runSync(mdastTree, doc);
    const result = (0, hast_util_to_jsx_runtime_1.toJsxRuntime)(hastTree, {
        Fragment: jsx_runtime_1.Fragment,
        ignoreInvalidStyle: true,
        jsx: jsx_runtime_1.jsx,
        jsxs: jsx_runtime_1.jsxs,
        passKeys: true,
        passNode: true
    });
    return (react_1.default.createElement("div", { className: "markdown-body" }, result));
};
exports.MarkdownPreview = MarkdownPreview;
