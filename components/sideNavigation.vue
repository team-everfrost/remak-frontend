import { Script } from 'vm';

<template>
    <div class="fixed top-20 left-0 w-48 h-screen bg-white flex flex-col border-r border-gray-200">
        <button
            class="w-full h-12 px-4 border-b border-gray-200 justify-start items-center gap-2 inline-flex text-gray-500 text-sm">
            <img src="~/assets/icon_search.svg" alt="검색" />
            검색
        </button>
        <button
            class="w-full h-12 px-4 border-b border-gray-200 justify-start items-center gap-2 inline-flex text-gray-500 text-sm">
            <img src="~/assets/icon_tag.svg" alt="태그" />
            태그
        </button>

        <button
            class="w-full h-12 px-4 border-b border-gray-200 justify-start items-center gap-2 inline-flex text-gray-500 text-sm">
            <img src="~/assets/icon_collection.svg" alt="컬렉션" />
            컬렉션
        </button>
        <button
            class="w-full h-12 px-4 border-b border-gray-200 justify-start items-center gap-2 inline-flex text-gray-500 text-sm">
            <img src="~/assets/icon_profile.svg" alt="내 정보" />
            내 정보
        </button>
    </div>
</template>


<script>
export default {
    name: 'sideNavigation',
}
</script>