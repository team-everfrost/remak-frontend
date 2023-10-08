<template>
  <div
    class="fixed left-0 top-20 flex h-screen w-48 flex-col border-r border-gray-200 bg-white"
  >
    <button
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm text-gray-500"
    >
      <img src="~/assets/icon_search.svg" alt="검색" />
      검색
    </button>
    <button
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm text-gray-500"
    >
      <img src="~/assets/icon_tag.svg" alt="태그" />
      태그
    </button>

    <button
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm text-gray-500"
    >
      <img src="~/assets/icon_collection.svg" alt="컬렉션" />
      컬렉션
    </button>
    <button
      class="inline-flex h-12 w-full items-center justify-start gap-2 border-b border-gray-200 px-4 text-sm text-gray-500"
    >
      <img src="~/assets/icon_profile.svg" alt="내 정보" />
      내 정보
    </button>
  </div>
</template>

<script>
export default {
  name: 'SideNavigation',
};
</script>
