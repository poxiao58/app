<template>
  <mu-container style="background: black;">
    <mu-card style="width: 100%; max-width: 375px; margin: 0 0;">
      <mu-carousel hide-controls>
        <mu-carousel-item>
          <img src="../assets/images/home_1.jpeg" HEIGHT="500">
        </mu-carousel-item>
        <mu-carousel-item>
          <img src="../assets/images/home_2.jpeg" HEIGHT="500">
        </mu-carousel-item>
      </mu-carousel>
      <img width="100%" src="../assets/images/home_description.png">
      <mu-card-actions style="background: black">
        <label class="btn" for="upload2" style="color: white;font-weight: bold;">进入相册选择图片</label>
        <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);"
               accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,1)">
<!--        <mu-button flat color="primary" @click="uploadImg($event,2)" style="color: white;font-weight: bold;">进入相册选择图片</mu-button>-->
<!--                <el-upload-->
<!--                  ref="upload"-->
<!--                  class="upload-demo"-->
<!--                  action="http://192.168.1.7:9002/yzd/file/imageFileUploadApp"-->
<!--                  :limit="1"-->
<!--                  :on-success="handleAvatarSuccess"-->
<!--                  >-->
<!--                  <el-button size="small" type="primary" @click="uploadFile" style="background: black;border: 0px;">进入相册选择图片</el-button>-->
<!--                </el-upload>-->
      </mu-card-actions>
    </mu-card>
  </mu-container>
</template>


<script>
  export default {
    name: "home",
    data() {
      return {
        home_1: '../assets/images/home_1.jpeg',
        home_2: '../assets/images/home_2.jpg',
        imageUrl: '11',
        picData:[],
      }
    },
    methods: {
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
          this.$router.push({name:'uploadImgs',query: {imageUrl: this.imageUrl}})
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
        this.$router.push({name:'uploadImgs',query: {imageUrl: this.imageUrl}})
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
          console.log(base64)
        }

      }
    }

    }
</script>

<style scoped>

</style>
