<script setup>
useSeoMeta({
    title: '메인 - Remak',
});
</script>
<template>
    <div class="flex flex-col h-screen">
        <TopBar />
        <div class="flex flex-row flex-grow mt-16"> <!-- mt-16을 추가하여 TopBar 아래에 공간을 제공 -->
            <SideNavigation />
            <!-- 나머지 콘텐츠는 이 공간에 배치 -->
            <div class="flex-grow">
                <!-- 여기에 콘텐츠 추가 -->
            </div>
        </div>
    </div>
</template>
