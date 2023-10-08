<template>
  <div class="flex h-screen flex-col">
    <TopBar />
    <div class="flex flex-grow flex-row">
      <!-- mt-16을 추가하여 TopBar 아래에 공간을 제공 -->
      <SideNavigation class="mt-20" />
      <!-- 나머지 콘텐츠는 이 공간에 배치 -->
      <div class="mt-20 flex-grow bg-[#F4F6F8] pl-48">
        <!-- pl-12를 추가하여 왼쪽 패딩 제공 -->
        <!-- 여기에 콘텐츠 추가 -->
        <div class="ml-20 mr-20 mt-20">
          <div class="flex flex-row items-center justify-between">
            <p class="text-2xl font-bold text-[#1b1c1f]">메인</p>
            <button
              class="h-8 w-[78px] rounded rounded-md bg-gray-600 text-base font-medium text-white"
            >
              편집하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
