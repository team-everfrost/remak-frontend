<template>
  <div
    class="flex max-w-[995px] w-screen flex-shrink-0 flex-grow-0 items-center justify-center rounded-2xl border border-[#e6e8eb] bg-[#fefefe] px-10 pb-12 pt-10"
  >
    <div class="flex w-full flex-grow-0 flex-col justify-start gap-2">
      <div class="flex flex-shrink-0 flex-grow-0 items-center justify-between">
        <div class="flex items-center justify-start gap-2">
          <p class="flex text-left text-sm font-medium text-[#646f7c]">메모</p>
          <div class="h-3 w-px flex-shrink-0 flex-grow-0 bg-[#646f7c]"></div>
          <p
            class="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-[#646f7c]"
          >
            YYYY.MM.DD
          </p>
        </div>
        <button class="flex-shrink-0 ml-auto flex-grow-0">
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
      <textarea
        placeholder="메모를 입력하세요"
        class="relative mt-8 h-[278px] flex-grow resize-none self-stretch overflow-auto rounded-xl border border-[#e6e8eb] bg-[#F4F6F8] p-4 outline-none"
        rows="1"
      ></textarea>
    </div>
  </div>
</template>
