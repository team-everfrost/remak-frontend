<template>
  <div class="flex min-h-screen flex-col">
    <TopBar />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="1" class="mt-20"> </SideNavigation>
      <div class="w-full bg-[#F4F6F8] ml-48 flex-col items-start mt-20">
        <div class="mx-20">
          <div class="flex w-full justify-between flex-row mt-20">
            <p class="font-bold text-[32px]">검색</p>
          </div>
          <div
            class="flex h-[56px] w-full flex-row mt-9 px-4 items-center rounded-xl bg-white border border-[#e6e8eb]"
          >
            <img src="~/assets/icons/icon_search.svg" alt="검색" />
            <input
              type="text"
              class="w-full h-full text-[#646f7c] text-base font-medium outline-none"
              placeholder="검색어를 입력해주세요"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
