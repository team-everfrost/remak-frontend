<template>
  <div
    class="flex w-[480px] flex-col items-start justify-start gap-6 rounded-[20px] bg-[#fefefe] px-4 pb-4 pt-6"
  >
    <div
      class="relative flex flex-shrink-0 flex-grow-0 flex-col items-center justify-start gap-2 self-stretch"
    >
      <p
        class="w-[448px] flex-shrink-0 flex-grow-0 self-stretch text-center text-lg font-bold text-[#1b1c1f]"
      >
        1개의 정보를 삭제하시겠어요?
      </p>
      <p
        class="w-[448px] flex-shrink-0 flex-grow-0 self-stretch text-center text-sm text-[#757779]"
      >
        삭제시 복구가 불가능해요
      </p>
    </div>
    <div
      class="flex flex-shrink-0 flex-grow-0 items-start justify-start gap-3 self-stretch"
    >
      <button
        class="relative flex h-[52px] flex-grow items-center justify-center overflow-hidden rounded-xl bg-[#f4f6f8] px-2 py-4 font-bold"
      >
        취소하기
      </button>
      <button
        class="relative flex h-[52px] flex-grow items-center justify-center overflow-hidden rounded-xl bg-[#F83A41] px-2 py-4 font-bold text-white"
      >
        삭제하기
      </button>
    </div>
  </div>
</template>