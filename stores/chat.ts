import {
  createParser,
  type ParsedEvent,
  type ReconnectInterval,
} from 'eventsource-parser';
import { useAuthStore } from './auth';

export const useChatStore = defineStore('chat', () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  const lastMessage = ref('');

  const $reset = () => {
    lastMessage.value = '';
  };

  const resetChat = () => {
    if (!authStore.isSignedIn) return false;

    lastMessage.value = '';

    return true;
  };

  const onParse = (event: ParsedEvent | ReconnectInterval) => {
    if (event.type === 'event') {
      lastMessage.value += event.data;
    }
  };

  const startChat = async (query: string) => {
    if (!authStore.isSignedIn) return false;
    if (!query) return false;

    lastMessage.value = '';

    try {
      const res = await fetch(
        apiBaseUrl + '/chat/rag?query=' + encodeURIComponent(query),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        },
      );

      if (res.status !== 200 || !res.body) return false;

      const eventStream = res.body.getReader();
      const parser = createParser(onParse);

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await eventStream.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });

        parser.feed(text);
      }

      const last = decoder.decode();
      parser.feed(last);

      parser.reset();
    } catch (e) {
      return false;
    }
    return true;
  };

  return {
    $reset,
    lastMessage,
    resetChat,
    startChat,
  };
});
