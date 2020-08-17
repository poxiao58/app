<template>
  <mu-container STYLE="background: black">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
          <div class="cropper-content">
            <div class="cropper" :style="scrollHeight">
              <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canScale="true"
                :centerBox="true"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed-number="option.fixedNumber"
                :fixed="true"
                :fixedBox="option.fixedBox">
              </vueCropper>
            </div>
          </div>
      <mu-card-actions style="background: black;">
        <mu-button flat style="color: white">左旋转</mu-button>
        <mu-button flat style="color: white">右旋转</mu-button>
      </mu-card-actions>
      <mu-card-actions style="background: black;">
        <mu-button flat style="color: white">横排</mu-button>
        <mu-button flat style="color: white">竖排</mu-button>
      </mu-card-actions>
      <mu-card-actions style="background: black;">
        <mu-button flat style="color: white">上传图片</mu-button>
      </mu-card-actions>
    </mu-card>
  </mu-container>
<!--  <div>-->
<!--    <div class="rj-header">-->
<!--      <mu-appbar :z-depth="0" title="修剪图片">-->
<!--      </mu-appbar>-->
<!--    </div>-->
<!--    <div class="cropper-content">-->
<!--      <div class="cropper" :style="scrollHeight">-->
<!--        <vueCropper-->
<!--          ref="cropper"-->
<!--          :img="option.img"-->
<!--          :outputSize="option.size"-->
<!--          :outputType="option.outputType"-->
<!--          :info="true"-->
<!--          :full="option.full"-->
<!--          :canScale="true"-->
<!--          :centerBox="true"-->
<!--          :canMove="option.canMove"-->
<!--          :canMoveBox="option.canMoveBox"-->
<!--          :autoCrop="option.autoCrop"-->
<!--          :autoCropWidth="option.autoCropWidth"-->
<!--          :autoCropHeight="option.autoCropHeight"-->
<!--          :fixedBox="option.fixedBox">-->
<!--        </vueCropper>-->
<!--        <div  >-->
<!--          <mu-button flat @click="rotateRight" color="primary" slot="left">-->
<!--            旋转-->
<!--          </mu-button>-->
<!--          <mu-button flat  @click="confirm" color="primary" slot="right" >确定</mu-button>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
</template>
<script>
  export default {
    name:'uploadImg',
    props:['imgUrl'],
    data() {
      return {
        crap: false,
        previews: {},
        option: {
          img: '',
          size: 1,
          full: false,
          outputType: 'png',
          canMove: false,
          canMoveBox: false,
          autoCrop: true,
          autoCropWidth: 300,
          autoCropHeight: 250,
          fixedNumber:[4,3],
          downImg: '#'
        }
      }
    },
    mounted(){
      this.option.img = this.$route.query.imageUrl
    },
    computed:{
      scrollHeight(){
        return "height:" + ((window.screen.height))/1.4 + "px";
      }
    },
    methods: {
      rotateRight () {
        this.$refs.cropper.rotateLeft();
      },
      confirm () {
        let _this = this;
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob((data) => {
          // do something
          let param = new FormData();
          param.append('file', data, 'image.png');
          let ajaxLoading = _this.$layer.open({
            type: 2
          })
          _this.$http.post(_this.$lib.url + 'space/file', param).then(res => {
            console.log(res)
            if(res.status == 0) {
              let data = {
                avatar:res.data.url
              }
              _this.$http.post(_this.$lib.url + 'user/info', _this.$qs.stringify(data)).then(res => {
                _this.$layer.close(ajaxLoading);
                if(res.status == 0){
                  _this.$layer.open({
                    content: '上传成功',
                    skin: 'msg',
                    time: 2
                  });
                  _this.$router.replace('/my');
                }
              }).catch(err => {})
            } else {
              _this.$layer.open({
                content: res.msg,
                skin: 'msg',
                time: 2 //2秒后自动关闭
              });
            }
          }).catch(err => {})
        })
      },
    },
  }
</script>
<style lang="css">
  .cropper-content{
    z-index: 199;
    width: 100%;
    height: 50%;
  }
  .cropper{
    width: 100%;
  }
</style>

