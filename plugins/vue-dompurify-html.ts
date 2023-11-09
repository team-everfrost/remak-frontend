import VueDOMPurifyHTML from 'vue-dompurify-html';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueDOMPurifyHTML, {
    hooks: {
      afterSanitizeAttributes: (node: any) => {
        if (node.hasAttribute('href')) {
          node.setAttribute('target', '_blank');
          node.setAttribute('rel', 'noopener noreferrer');
          node.setAttribute(
            'href',
            '/redirect?url=' + node.getAttribute('href'),
          );
        }
      },
    },
  });
});
