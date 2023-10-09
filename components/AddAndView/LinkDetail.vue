<template>
  <div
    class="flex max-w-[995px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-2xl border border-[#e6e8eb] bg-[#fefefe] px-[130px] pb-12 pt-10"
  >
    <div
      class="flex w-full flex-shrink-0 flex-grow-0 flex-col justify-start gap-2"
    >
      <div
        class="relative flex flex-shrink-0 flex-grow-0 items-center justify-between"
      >
        <div
          class="relative flex flex-shrink-0 flex-grow-0 items-center justify-start gap-2"
        >
          <p
            class="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-[#646f7c]"
          >
            URL
          </p>
          <div class="h-3 w-px flex-shrink-0 flex-grow-0 bg-[#646f7c]"></div>
          <p
            class="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-[#646f7c]"
          >
            YYYY.MM.DD
          </p>
        </div>
        <button class="relativeflex-shrink-0 ml-auto flex-grow-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              fill="#28323C"
            ></path>
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              stroke="#28323C"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <p
        class="flex-shrink-0 flex-grow-0 text-left text-[28px] font-bold text-[#111]"
      >
        Exploring Kotlin’s Rise and Rutube’s Impack on Online Video Sharing
      </p>
      <div
        class="flex flex-shrink-0 flex-grow-0 items-start justify-start gap-3"
      >
        <AddAndViewTagBox />
        <AddAndViewTagBox />
        <AddAndViewTagBox />
      </div>
      <p
        class="mt-9 flex-shrink-0 flex-grow-0 text-left text-base font-bold text-[#28323c]"
      >
        요약
      </p>
      <div
        class="relative flex flex-shrink-0 flex-grow-0 items-start justify-start gap-2.5 self-stretch rounded-xl border border-[#e6e8eb] bg-[#fefefe] px-4 py-5"
      >
        <p class="flex-grow text-left text-sm font-medium text-[#111]">
          애플은 퀄컴과의 협상을 통해 5G 모뎀칩을 공급받고 있으며, 삼성전자는
          최신 5G 모뎀칩을 출시하여 기술력을 과시하고 있다. 애플은 모뎀칩 개발의
          난이도와 퀄컴의 노하우 부족을 인정받고 있으며, 삼성전자는 자사의
          반도체 개발 역량을 바탕으로 모뎀칩 개발에 성공하였다.
        </p>
      </div>
      <p
        class="mt-6 flex-shrink-0 flex-grow-0 text-left text-base font-bold text-[#28323c]"
      >
        본문
      </p>
      <p
        class="flex-shrink-0 flex-grow-0 self-stretch text-left text-base text-[#28323c]"
        v-html="htmlContent"
      ></p>
      <button
        class="relative mt-12 flex h-[52px] w-full flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden rounded-xl bg-[#1f8ce6]"
      >
        <p class="flex-grow text-center text-lg font-bold text-white">
          웹 페이지로 이동하기
        </p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlContent:
        '<div>\n\t\t<article>\n\t\t\t<strong>퀄컴이 장악한 모뎀칩 시장<br />애플 \'독자 개발\' 추진했지만<br />현재까지 실패하고 자존심에 상처<p>모뎀칩 개발엔 오랜 노하우 필요<br />삼성전자는 1990년대 개발 성공<br />최신 5G 모뎀칩 출시로 기술 과시</p></strong><span><div>\n\t<p><img src="https://image.remak.io/c0ec0227-9a33-462b-89de-6adde162aaf4/73101ffe-8f16-4a7f-aa4b-5a1525ab7d5d.jpg" />\n\t</p>\n</div><em>애플 로고/연합뉴스',
    };
  },
};
</script>
