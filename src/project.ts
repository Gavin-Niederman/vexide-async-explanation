import { makeProject } from "@motion-canvas/core";

import resources from "./scenes/rust-resources?scene";
import async from "./scenes/async?scene";
import asyncCode from "./scenes/async-code?scene";

import "./globals.css";

import audio from "../audio/voice.ogg";

import { Code, LezerHighlighter } from "@motion-canvas/2d";
import { parser } from "@lezer/rust";
import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const githubDark = HighlightStyle.define([
    { tag: [tags.integer, tags.float], color: "#79B8FF" },
    { tag: [tags.standard(tags.tagName), tags.tagName], color: "#7ee787" },
    { tag: [tags.comment], color: "#8b949e" },
    { tag: [tags.className, tags.propertyName], color: "#B392F0" },
    {
        tag: [
            tags.variableName,
            tags.attributeName,
            tags.number,
            tags.operator,
        ],
        color: "#E1E4E8",
    },
    {
        tag: [tags.keyword, tags.typeName, tags.typeOperator, tags.typeName],
        color: "#ff7b72",
    },
    { tag: [tags.string, tags.meta, tags.regexp], color: "#a5d6ff" },
    { tag: [tags.name, tags.quote, tags.function(tags.variableName)], color: "#B392F0" },
    { tag: [tags.heading, tags.strong], color: "#d2a8ff", fontWeight: "bold" },
    { tag: [tags.emphasis], color: "#d2a8ff", fontStyle: "italic" },
    { tag: [tags.deleted], color: "#ffdcd7", backgroundColor: "ffeef0" },
    {
        tag: [tags.atom, tags.bool, tags.special(tags.variableName)],
        color: "#ffab70",
    },
]);

Code.defaultHighlighter = new LezerHighlighter(parser, githubDark);

export default makeProject({
    scenes: [resources, async, asyncCode],
    audio: audio,
    variables: {
        bgPrimary: "#24262e",
        bgSecondary: "#363945",
        bgAccentRed: "#e54543",
        bgAccentYellow: "#e6c85c",
        grid: "#282b33",
        fgPrimary: "#d8dbe9",
        fgSecondary: "#9da4be",
        fgTertiary: "#838aa5",
        fgAccentRed: "#f29e9c",
        fgAccentYellow: "#f2df9c",
    },
});
