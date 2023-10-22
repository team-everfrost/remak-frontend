<template>
  <div>
    <div class="relative flex flex-col items-start justify-start">
      <div
        class="relative flex h-20 w-full flex-shrink-0 flex-grow-0 overflow-hidden border-b border-[#e6e8eb] border-l-0 border-r-0 border-t-0 bg-[#fefefe]"
      >
        <div
          class="ml-6 flex h-20 items-center border-b border-gray-300 bg-topbar-background"
        >
          <NuxtLink to="/">
            <img src="~/assets/logo.svg" alt="logo" />
          </NuxtLink>
        </div>
        <div class="flex-grow"></div>
        <div class="mr-6 flex h-20 items-center justify-start gap-6">
          <div
            class="flex flex-shrink-0 flex-grow-0 items-start justify-start gap-2"
          >
            <NuxtLink to="/login">
              <div
                class="relative flex h-10 flex-shrink-0 flex-grow-0 items-center justify-center rounded-md px-4 hover:cursor-pointer hover:bg-slate-100"
              >
                <p
                  class="flex-shrink-0 flex-grow-0 text-center text-base font-medium text-[#28323c]"
                >
                  로그인
                </p>
              </div>
            </NuxtLink>
          </div>
          <div class="flex flex-shrink-0 flex-grow-0 items-start justify-start">
            <NuxtLink to="/register">
              <div
                class="relative flex h-10 flex-shrink-0 flex-grow-0 items-center justify-center rounded-md bg-[#1f8ce6] px-4"
              >
                <p
                  class="flex-shrink-0 flex-grow-0 text-center text-base font-medium text-white"
                >
                  무료로 시작하기
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        class="relative mt-40 flex w-full flex-shrink-0 flex-grow-0 flex-col justify-center overflow-hidden bg-white"
      >
        <p class="relative text-center text-5xl font-bold text-[#111]">
          <span class="text-center text-5xl font-bold text-[#111]"
            >Your Personal AI Knowledge Base,</span
          ><br /><span class="text-center text-5xl font-bold text-[#111]"
            >Remak</span
          >
        </p>
        <p class="relative mt-5 text-center text-xl font-medium text-[#646f7c]">
          <span class="text-center text-xl font-medium text-[#646f7c]"
            >그때 읽었던 그 내용 어디있지?</span
          ><br /><span class="text-center text-xl font-medium text-[#646f7c]"
            >더 이상 헤매지 마세요</span
          >
        </p>
        <div class="mt-10 flex w-full items-center justify-center">
          <NuxtLink to="/register">
            <div
              class="relatvie flex h-16 w-60 items-center justify-center gap-2 rounded-xl bg-[#1f8ce6]"
            >
              <p
                class="flex-shrink-0 flex-grow-0 text-center text-2xl font-medium text-white"
              >
                무료로 시작하기
              </p>
            </div>
          </NuxtLink>
        </div>
        <div
          class="mb-40 mt-14 inline-flex w-full flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_white_128px,_white_calc(100%-200px),transparent_100%)]"
        >
          <ul
            class="flex animate-infinite-flow items-center justify-center md:justify-start [&_li]:mx-6"
          >
            <li>
              <MainMovingCard :title="'문서.docx'" :type="'file'" />
            </li>
            <li>
              <MainMovingCard :title="'강의자료.png'" :type="'photo'" />
            </li>
            <li>
              <MainMovingCard :title="'메모.txt'" :type="'memo'" />
            </li>
            <li>
              <MainMovingCard :title="'이번주 저널'" :type="'link'" />
            </li>
            <li>
              <MainMovingCard :title="'회의자료.pdf'" :type="'file'" />
            </li>
            <li>
              <MainMovingCard :title="'노트필기.jpg'" :type="'photo'" />
            </li>
          </ul>
          <ul
            class="flex animate-infinite-flow items-center justify-center md:justify-start [&_li]:mx-6"
            aria-hidden="true"
          >
            <li>
              <MainMovingCard :title="'문서.docx'" :type="'file'" />
            </li>
            <li>
              <MainMovingCard :title="'강의자료.png'" :type="'photo'" />
            </li>
            <li>
              <MainMovingCard :title="'메모.txt'" :type="'memo'" />
            </li>
            <li>
              <MainMovingCard :title="'이번주 저널'" :type="'link'" />
            </li>
            <li>
              <MainMovingCard :title="'회의자료.pdf'" :type="'file'" />
            </li>
            <li>
              <MainMovingCard :title="'노트필기.jpg'" :type="'photo'" />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="relative flex w-full flex-shrink-0 flex-grow-0 flex-col items-start justify-start bg-[#f4f6f8]"
      >
        <div
          class="relative mx-auto mt-[200px] flex flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
        >
          <p class="text-left text-[32px] font-bold text-[#111]">
            <span class="text-left text-[32px] font-bold text-[#111]"
              >클릭 한번으로 저장하면</span
            ><br /><span class="text-left text-[32px] font-bold text-[#111]"
              >AI가 자료 분류부터 요약까지</span
            ><br /><span class="text-left text-[32px] font-bold text-[#111]"
              >Remak과 함께라면 당신의 일상이 새로워질 거예요</span
            >
          </p>
          <div
            class="mb-52 mt-10 grid w-full grid-cols-1 content-between items-center justify-center gap-10 lg:grid-cols-2"
          >
            <div
              class="relative mx-auto flex w-[520px] flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
            >
              <img src="/assets/icons/main/icon_folder.svg" />
              <p
                class="mt-9 flex-shrink-0 flex-grow-0 text-left text-[32px] font-bold text-[#111]"
              >
                쉬운 자료저장
              </p>
              <p
                class="mt-5 flex-shrink-0 flex-grow-0 text-left text-xl font-medium text-[#646f7c]"
              >
                브라우저에서 클릭 한번, 스마트폰에서 공유 버튼 한번만에
                저장해요.
              </p>
            </div>
            <div
              class="relative mx-auto flex w-[520px] flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
            >
              <img src="/assets/icons/main/icon_scrap.svg" />
              <p
                class="mt-9 flex-shrink-0 flex-grow-0 text-left text-[32px] font-bold text-[#111]"
              >
                웹 페이지 영구 스크랩
              </p>
              <p
                class="mt-5 flex-shrink-0 flex-grow-0 text-left text-xl font-medium text-[#646f7c]"
              >
                웹 페이지의 본문을 저장해 사라질 걱정 없이 언제든지 찾아볼 수
                있어요.
              </p>
            </div>
            <div
              class="relative mx-auto flex w-[520px] flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
            >
              <img src="/assets/icons/main/icon_search.svg" />
              <p
                class="mt-9 flex-shrink-0 flex-grow-0 text-left text-[32px] font-bold text-[#111]"
              >
                강력한 자료 검색기능
              </p>
              <p
                class="mt-5 flex-shrink-0 flex-grow-0 text-left text-xl font-medium text-[#646f7c]"
              >
                제목이 기억나지 않아도, 정확한 단어가 기억나지 않아도 유사한
                문서를 찾을 수 있어요.
              </p>
            </div>
            <div
              class="relative mx-auto flex w-[520px] flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
            >
              <img src="/assets/icons/main/icon_summary.svg" />
              <p
                class="mt-9 flex-shrink-0 flex-grow-0 text-left text-[32px] font-bold text-[#111]"
              >
                자동화된 자료 분류, 요약
              </p>
              <p
                class="mt-5 flex-shrink-0 flex-grow-0 text-left text-xl font-medium text-[#646f7c]"
              >
                AI가 생성하는 자동 태그와 요약, 사용자가 생성한 기준을 통한
                컬렉션 기능까지.
              </p>
            </div>
            <div
              class="relative mx-auto flex w-[520px] flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
            >
              <img src="/assets/icons/main/icon_chat.svg" />
              <p
                class="mt-9 flex-shrink-0 flex-grow-0 text-left text-[32px] font-bold text-[#111]"
              >
                내 자료와 대화하는 AI 채팅
              </p>
              <p
                class="mt-5 flex-shrink-0 flex-grow-0 text-left text-xl font-medium text-[#646f7c]"
              >
                내가 저장한 자료들을 통한 답변을 받거나, 문서에 대해 AI에게
                물어보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative flex h-[540px] w-full flex-shrink-0 flex-grow-0 flex-col items-center justify-center bg-[#CCE8FF]"
      >
        <p
          class="flex-shrink-0 flex-grow-0 text-center text-[32px] font-bold text-[#28323c]"
        >
          번거로운 자료 관리는 이제 그만
        </p>
        <button
          class="relative mt-8 flex h-16 w-60 flex-shrink-0 flex-grow-0 items-center justify-center gap-2 rounded-xl bg-[#1f8ce6] px-4 py-2.5"
          @click="navigateTo('/register')"
        >
          <p
            class="flex-shrink-0 flex-grow-0 text-center text-2xl font-medium text-white"
          >
            무료로 시작하기
          </p>
        </button>
      </div>
    </div>
    <div
      class="relative flex h-[240px] w-full flex-shrink-0 flex-grow-0 flex-col items-center justify-center bg-black"
    >
      <p class="flex-shrink-0 flex-grow-0 text-center text-sm">
        <span
          class="flex-shrink-0 flex-grow-0 text-center text-sm text-[#646f7c]"
          >개인정보 처리방침</span
        ><span
          class="flex-shrink-0 flex-grow-0 text-center text-sm text-[#464749]"
        >
          ㅣ </span
        ><span
          class="flex-shrink-0 flex-grow-0 text-center text-sm text-[#646f7c]"
          >이용약관</span
        >
      </p>
      <p
        class="mt-3 flex-shrink-0 flex-grow-0 text-center text-sm text-[#646f7c]"
      >
        Copyright © 2023 Team Everfrost All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  onlyLogout: true,
});
</script>
