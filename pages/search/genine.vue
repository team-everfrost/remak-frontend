<template>
  <div>
    <TopBarApp />

    <div class="flex h-screen flex-col">
      <div class="flex flex-grow flex-row">
        <SideNavigation :active-button="1" class="mt-20"></SideNavigation>
        <main class="mt-20 flex flex-grow bg-[#F4F6F8] ml-48">
          <div class="flex flex-grow flex-col m-20">
            <div>
              <button
                class="flex flex-row justify-start items-center h-8 pl-2 pr-4 rounded-lg hover:bg-[#e9ecef]"
                @click="$router.back()"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M12.5 15L7.5 10L12.5 5"
                    stroke="#1F8CE6"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <p class="text-sm font-medium text-center ml-2 text-[#1f8ce6]">
                  이전으로 돌아가기
                </p>
              </button>
            </div>

            <div
              class="flex w-full h-full justify-between rounded-2xl bg-white border border-[#e6e8eb] mt-3 flex-col"
            >
              <div class="flex flex-col justify-start items-start gap-1">
                <GenineBotChat />
                <GenineUserChat />
              </div>

              <div class="flex items-end bottom-0 content-end h-12 mx-10 mb-9">
                <input
                  class="flex pl-4 items-center flex-grow h-12 rounded-lg bg-[#f4f6f8] border border-[#e6e8eb]"
                  type="text"
                  placeholder="궁금하신 내용을 입력해주세요"
                />
                <button
                  class="flex items-center justify-center h-12 w-24 rounded-lg text-[#646f7c] text-sm bg-[#E0E0E0] ml-2"
                >
                  전송하기
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
