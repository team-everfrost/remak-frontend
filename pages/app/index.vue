<template>
  <div class="flex h-screen flex-col">
    <TopBarBase />
    <div class="flex flex-grow flex-row">
      <SideNavigation class="mt-20" />
      <div class="mt-20 flex-grow bg-[#F4F6F8] ml-48">
        <div class="flex flex-col m-20">
          <div class="flex items-center justify-between mb-4">
            <p class="text-2xl font-bold text-[#1b1c1f]">메인</p>
            <button
              class="h-8 w-[78px] rounded-md bg-gray-600 text-base font-medium text-white"
            >
              편집하기
            </button>
          </div>
          <div ref="cardContainer" class="relative">
            <div class="relative">
              <div class="sticky">오늘</div>
              <masonry-wall
                :items="documentCards"
                :column-width="258"
                :gap="16"
                :scroll-container="cardContainer"
              >
                <template #default="{ item }">
                  <MainDocumentCard
                    :type="item.type"
                    :image-url="item.imageUrl"
                    :url="item.url"
                    :title="item.title"
                    :summary="item.summary"
                    :date="item.date"
                  />
                </template>
              </masonry-wall>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cardContainer = ref<HTMLElement | null>(null);

const documentCards = [
  {
    type: 'MEMO',
    imageUrl: '',
    url: '',
    title: '메모1',
    summary: '메모 내용',
    date: '2021.10.10',
  },
  {
    type: 'IMAGE',
    imageUrl: 'jkl',
    url: '',
    title: '이미지2',
    summary: '이미지 내용',
    date: '2021.10.10',
  },
  {
    type: 'WEBPAGE',
    imageUrl: 'jlk',
    url: '',
    title: '링크3',
    summary: '링크 내용',
    date: '2021.10.10',
  },
  {
    type: 'FILE',
    imageUrl: '',
    url: '',
    title: '파일4',
    summary: '파일 내용',
    date: '2021.10.10',
  },
  {
    type: 'MEMO',
    imageUrl: '',
    url: '',
    title: '메모5',
    summary: '메모 내용',
    date: '2021.10.10',
  },
  {
    type: 'IMAGE',
    imageUrl: 'jkl',
    url: '',
    title: '이미지6',
    summary: '이미지 내용',
    date: '2021.10.10',
  },
  {
    type: 'WEBPAGE',
    imageUrl: '',
    url: '',
    title: '링크7',
    summary: '링크 내용',
    date: '2021.10.10',
  },
  {
    type: 'FILE',
    imageUrl: 'jkl',
    url: '',
    title: '파일8',
    summary: '파일 내용',
    date: '2021.10.10',
  },
  {
    type: 'MEMO',
    imageUrl: '',
    url: '',
    title: '메모9',
    summary: '메모 내용',
    date: '2021.10.10',
  },
  {
    type: 'IMAGE',
    imageUrl: 'jkl',
    url: '',
    title: '이미지10',
    summary: '이미지 내용',
    date: '2021.10.10',
  },
];
</script>
