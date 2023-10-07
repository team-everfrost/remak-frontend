
import { Script } from 'vm';
<template>
    <div class="top-bar">
        <img src="~/assets/logo.svg" alt="logo" />
    </div>
</template>

<Script>
export default {
    name: 'TopBar',
}
</Script>

<style scoped>
.top-bar {
  background-color: #FEFEFE;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center; /* 로고를 상단바의 중앙에 위치시킵니다 */
  padding-left: 24px;  /* 로고가 왼쪽에서 24px만큼 떨어져 있도록 설정합니다 */
  border-bottom: 1px solid #E6E8EB; 
}
</style>



