<template>
  <div v-dompurify-html="markdown.render(source)" />
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItAbbr from 'markdown-it-abbr';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItDeflist from 'markdown-it-deflist';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import MarkdownItIns from 'markdown-it-ins';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItSub from 'markdown-it-sub';
import MarkdownItSup from 'markdown-it-sup';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right';

const markdown = new MarkdownIt({
  linkify: true,
})
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItDeflist)
  .use(MarkdownItEmoji)
  .use(MarkdownItFootnote)
  .use(MarkdownItHighlightjs)
  .use(MarkdownItIns)
  .use(MarkdownItMark)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTaskLists)
  .use(MarkdownItTocDoneRight);

defineProps({
  source: {
    type: String,
    default: '',
  },
});
</script>
