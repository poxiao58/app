<template>
<div class="homeDiv" >
  <div class="imgDiv">
  <img @click="uploadClk" class="btnImg" src="../assets/images/btn.jpg">
  </div>
  <input type="file" ref="upload" id="upload2" style="position:absolute; clip:rect(0 0 0 0);"
         accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,1)">
<!--  <el-image z-index="111" :lazy="true" src="../assets/images/btn.jpg"></el-image>-->
</div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        imageUrl: '11',
        picData:[],
        machineNo:'',
        scrollHeight: "300px"
      }
    },
    created() {
      this.machineNo=this.$route.query.machineNo;
      console.log("获取携带参数："+this.machineNo);
    },
    methods: {
      //点击上传
      uploadClk(){
        this.$refs.upload.click();
      },
      uploadImg(e, num) {
        //上传图片
        this.imageUrl = ''
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          data = e.target.result
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.imageUrl = data
          } else if (num === 2) {
            this.imageUrl = data
          }
          this.$router.push({name:'uploadImgs',query: {imageUrl: this.imageUrl,machineNo:this.machineNo}})
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blobcs
        reader.readAsArrayBuffer(file)
      },
      //上传成功
      handleAvatarSuccess(response, file, fileList) {
        console.log("上传成功！")
        this.imageUrl = URL.createObjectURL(file.raw);
        // this.$router.replace({ path: '/uploadImg' })
        this.$router.push({name:'uploadImgs',query: {imageUrl: this.imageUrl,machineNo:this.machineNo}})
      },
      //上传图片
      uploadFile() {
        this.$refs.upload.submit();
      },
      getGallery() {
        var that = this;
        if (that.picData.length <= 1) {
          plus.gallery.pick(function (path) {

            //将相册的图片编码为base64
            that.uploadPics(path);
          }, function (e) {
            console.log("取消选择图片");
          }, {
            filename: "_doc/gallery/", //我是根据文档写的
            filter: "image"
          });
        } else {
          that.$toast.error("只能上传一张照片")
        }
        // console.log("上传成功")
        // this.imageUrl = URL.createObjectURL(file.raw);
        // this.$router.push({name:'uploadImg',query: {imageUrl: this.imageUrl}})
      },
      //编码为base64
      uploadPics: function (url) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
          var that = img;
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = 320 || w;
          h = w / scale;
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          $(canvas).attr({
            width: w,
            height: h
          });
          ctx.drawImage(that, 0, 0, w, h);
          var base64 = canvas.toDataURL('image/png', 'image/jpeg', 'image/jpg', 1 || 0.8);
          // console.log(base64)
        }

      }
    }

  }
</script>

<style scoped>
.homeDiv{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: #fff;
  background: url(../assets/images/bg.jpg) no-repeat;
  background-size: cover;
  -webkit-background-size: 100% 100%;
  /*-o-background-size: 100% 100%;*/
  background-position: center 0;
}
  .btnImg{
  width: 100%;
  }
  .imgDiv{
    position: fixed;
    bottom: -5%;
  }
</style>
