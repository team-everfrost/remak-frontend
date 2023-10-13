<template>
  <div>
    <div class="flex h-screen flex-col">
      <TopBar />
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="4" class="mt-20"> </SideNavigation>
        <div class="mt-20 w-full bg-[#F4F6F8] ml-48 flex-col">
          <div
            class="flex relative mx-20 mt-20 flex-col md:flex-row bg-white items-center"
          >
            <p class="text-[32px] font-bold">내 정보</p>
            <button
              class="justify-center h-8 items-center px-3 rounded-md ml-4 bg-[#475161] text-white"
            >
              프로필 편집
            </button>
            <div class="flex-grow"></div>
            <button
              class="justify-center h-8 items-center px-3 rounded-md border border-[#e6e8eb] ml-4 bg-[#fefefe] font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
