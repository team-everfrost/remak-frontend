import {
  createParser,
  type ParsedEvent,
  type ReconnectInterval,
} from 'eventsource-parser';
import { useAuthStore } from './auth';
import { Document } from './document';

export type Conversation = {
  chatId: string;
  title: string;
  messages: {
    type: 'user' | 'assistant';
    message?: string;
    documents?: Document[];
    hasError?: boolean;
  }[];
};

export const useChatStore = defineStore(
  'chat',
  () => {
    const authStore = useAuthStore();
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const currentConversation = ref<Conversation>({
      chatId: '',
      title: '',
      messages: [],
    });
    const chatHistory = ref<Conversation[]>([]);

    const $reset = () => {
      currentConversation.value = {
        chatId: '',
        title: '',
        messages: [],
      };
      chatHistory.value = [];
    };

    const resetChat = () => {
      if (!authStore.isSignedIn) return false;

      currentConversation.value = {
        chatId: '',
        title: '',
        messages: [],
      };

      return true;
    };

    const getChatHistories = computed(() => () => {
      return chatHistory.value.map((conv) => {
        return {
          title: conv.title,
          chatId: conv.chatId,
        };
      });
    });

    const restoreConversation = (chatId: string) => {
      const conversation = chatHistory.value.find(
        (conv) => conv.chatId === chatId,
      );
      if (conversation) currentConversation.value = conversation;
    };

    const deleteChatHistory = (chatId: string) => {
      const index = chatHistory.value.findIndex(
        (conv) => conv.chatId === chatId,
      );
      if (index > -1) chatHistory.value.splice(index, 1);
    };

    const clearChatHistory = () => {
      chatHistory.value = [];
    };

    const saveConversation = () => {
      const conversation = currentConversation.value;

      const index = chatHistory.value.findIndex(
        (conv) => conv.chatId === conversation.chatId,
      );
      if (index > -1) chatHistory.value.splice(index, 1);

      chatHistory.value.push(conversation);
    };

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === 'event') {
        if (event.event === 'chat') {
          currentConversation.value.messages[
            currentConversation.value.messages.length - 1
          ].message += JSON.parse(event.data).text;
        } else if (event.event === 'documents') {
          currentConversation.value.messages[
            currentConversation.value.messages.length - 1
          ].documents = JSON.parse(event.data);
        }
      }
    };

    const useChatFetch = async (query: string) => {
      // TODO: API 수정 전까진 마지막 user 채팅만 보냄

      if (!authStore.isSignedIn) return false;
      if (!query) return false;

      currentConversation.value.messages.push({
        type: 'user',
        message: query,
      });

      saveConversation();

      currentConversation.value.messages.push({
        type: 'assistant',
        message: '',
        documents: [],
        hasError: false,
      });

      const res = await fetch(apiBaseUrl + '/chat/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.accessToken}`,
        },
        body: JSON.stringify({
          query,
          context: '',
        }),
      });

      if (res.status !== 201 || !res.body) {
        currentConversation.value.messages[
          currentConversation.value.messages.length - 1
        ].hasError = true;
        return false;
      }

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

      saveConversation();
    };

    const startChat = async (query: string) => {
      resetChat();
      currentConversation.value.chatId = crypto.randomUUID();
      currentConversation.value.title = query
        .trim()
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 100);

      try {
        await useChatFetch(query);
      } catch (e) {
        currentConversation.value.messages[
          currentConversation.value.messages.length - 1
        ].hasError = true;
        return false;
      }
      return true;
    };

    const continueChat = async (query: string) => {
      try {
        await useChatFetch(query);
      } catch (e) {
        currentConversation.value.messages[
          currentConversation.value.messages.length - 1
        ].hasError = true;
        return false;
      }
      return true;
    };

    return {
      $reset,
      currentConversation,
      chatHistory,
      getChatHistories,
      restoreConversation,
      deleteChatHistory,
      clearChatHistory,
      resetChat,
      startChat,
      continueChat,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
);
