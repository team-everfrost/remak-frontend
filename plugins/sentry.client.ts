import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/vue';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const {
    public: { sentry },
  }: any = useRuntimeConfig();

  if (!sentry.dsn || process.env.NODE_ENV === 'development') return;

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        // tracePropagationTargets: [
        //   'localhost',
        //   /^https:\/\/yourserver\.io\/api/,
        // ],
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
      new RewriteFrames(),
    ],

    trackComponents: true,

    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    // 돈없어서 ㅎ
    replaysSessionSampleRate: 0.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.

    ignoreErrors: [
      'ResizeObserver loop completed with undelivered notifications.',
    ],
  });

  const authStore = useAuthStore();
  const token = authStore.accessToken;
  if (token && token !== '') {
    const decoded = jwtDecode(token);
    Sentry.setUser({ uid: decoded.aud as string });
  }
});
