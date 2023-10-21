<template>
  <div class="flex min-h-screen flex-col">
    <TopBar />
    <div class="flex flex-grow flex-row">
      <SideNavigation :active-button="3" class="mt-20"> </SideNavigation>
      <div class="bg-[#F4F6F8] ml-48 mt-20 flex flex-grow">
        <div class="m-20 flex flex-grow flex-col">
          <div class="flex w-full justify-start flex-row">
            <p class="font-bold text-[32px]">컬렉션이름</p>
            <button class="ml-3">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="flex-grow-0 flex-shrink-0 w-6 h-6"
                preserveAspectRatio="none"
              >
                <path
                  d="M20.0029 8.72197C19.614 9.11086 18.9841 9.11272 18.5929 8.72614L15.7655 5.93198C15.371 5.54215 15.3691 4.90576 15.7613 4.5136L17.1679 3.10701C17.5584 2.71648 18.1916 2.71648 18.5821 3.10701L21.3929 5.9178C21.7834 6.30832 21.7834 6.94148 21.3929 7.33201L20.0029 8.72197ZM4 21.4999C3.44772 21.4999 3 21.0522 3 20.4999V17.6641C3 17.3989 3.10536 17.1445 3.29289 16.957L12.8929 7.35701C13.2834 6.96649 13.9166 6.96648 14.3071 7.35701L17.1429 10.1928C17.5334 10.5833 17.5334 11.2165 17.1429 11.607L7.54289 21.207C7.35536 21.3945 7.101 21.4999 6.83579 21.4999H4Z"
                  fill="#28323C"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex w-full flex-row justify-end gap-6 mt-9">
            <button
              class="flex justify-end items-end px-3 py-2 rounded-md bg-[#475161] text-white"
              @click="null"
            >
              편집하기
            </button>
          </div>
          <div v-if="true" class="flex flex-grow">
            <NoItemBox :discription="'등록된 자료가 없어요'" />
          </div>
          <div>
            <!-- 여기에 자료를 넣을 것 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
