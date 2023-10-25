<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator color="#1F8CE6" />
        <NuxtPage :keepalive="{ exclude: ['login', 'register'], max: 10 }" />
        <ScrollTop />
      </div>
    </NuxtLayout>
  </div>
</template>
