<template>
  <div>
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator color="#1F8CE6" />
        <NuxtPage :keepalive="{ exclude: ['login', 'register'], max: 30 }" />
        <ScrollTop />
      </div>
    </NuxtLayout>
  </div>
</template>
