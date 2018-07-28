<template>
  <div class="wrapper">
    <img
      class="bg-image"
      v-if="introData.bg"
      :src="introData.bg"
      alt="background">

      <div class="content">
        <div class="transparent-bg">
          <div class="header display-1">
            {{ introData.text }}
          </div>

          <div class="awesome-divider my-3"></div>

          <div class="footer">
            <img
              class="circle rotate"
              :src="require('@/assets/img/q-circle.png')" alt="logo">

              <img
              class="circle rotate"
              :src="require('@/assets/img/q-circle.png')" alt="logo">
            
            <img
              class="circle rotate"
              :src="require('@/assets/img/q-circle.png')" alt="logo">

            <img
              class="circle rotate"
              :src="require('@/assets/img/q-circle.png')" alt="logo">

              <img
              class="circle rotate"
              :src="require('@/assets/img/q-circle.png')" alt="logo">
            
            <img
              class="circle rotate"
              :src="require('@/assets/img/q-circle.png')" alt="logo">
            
            <v-btn
              large
              @click="$emit('start')"
              color="success">
              Start
            </v-btn>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'StartPage',
  props: {
    introData: {
      type: Object,
      default() {
        return {
          text: 'Press start',
          bg: '',
        }
      },
    },
  },
}
</script>

<style scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.wrapper > .bg-image {
  position: absolute;
  z-index: -1;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.full-height {
  min-height: 100vh;
  height: 100%; 
}

.wrapper .content  {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  height: 100vh;
}

.wrapper .content .transparent-bg {
  max-width: 95vw;
  position: relative;
  width: 630px;
  padding: 30px;
  background-repeat: repeat;
  background-size: contain;
  text-align: center;
  
}

.wrapper .content .transparent-bg::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  filter: blur(10px);
  background-color: rgba(0, 0, 0, .75);
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 1);
}

.wrapper .content .transparent-bg .footer {
  position: relative;
}

.wrapper .content .transparent-bg .footer .circle {
  position: absolute;
}

.wrapper .content .transparent-bg .footer .circle:nth-of-type(1) {
  bottom: 10px;
  opacity: .75;
  left: 15px;
  width: 30px;
  height: 30px;
  transform: rotate(4003deg)
}

.wrapper .content .transparent-bg .footer .circle:nth-of-type(2) {
  bottom: 15px;
  opacity: .5;
  left: 45px;
  width: 50px;
  height: 50px;
  transform: rotate(-1430deg)
}

.wrapper .content .transparent-bg .footer .circle:nth-of-type(3) {
  bottom: 5px;
  opacity: .6;
  left: 100px;
  width: 40px;
  height: 40px;
  transform: rotate(20020deg)
}

.wrapper .content .transparent-bg .footer .circle:nth-of-type(4) {
  bottom: 10px;
  opacity: .75;
  right: 15px;
  width: 30px;
  height: 30px;
  transform: rotate(343deg)
}

.wrapper .content .transparent-bg .footer .circle:nth-of-type(5) {
  bottom: 15px;
  opacity: .5;
  right: 45px;
  width: 50px;
  height: 50px;
  transform: rotate(-60deg)
}

.wrapper .content .transparent-bg .footer .circle:nth-of-type(6) {
  bottom: 0;
  opacity: .6;
  right: 100px;
  width: 40px;
  height: 40px;
  transform: rotate(-220deg)
}

.wrapper .content .header {
  color: whitesmoke;
}
</style>
