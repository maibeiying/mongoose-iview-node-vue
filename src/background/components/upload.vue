<template>
  <div class="upload">
    <div class="upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="1024"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      multiple
      type="drag"
      action="./upload/upload"
      v-show="uploadList.length < maxUploadLen"
      style="display: inline-block;width:58px;">
      <div class="camera">
        <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  export default {
    props: ['defaultList', 'uploadFiles', 'maxUploadLen'],
    data () {
      return {
        imgUrl: '',
        visible: false,
        uploadList: []
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    },
    methods: {
      handleView (item) {
        this.imgUrl = item.url
        this.visible = true
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        file.url = file.response.url
        file.name = file.response.name
      },
      handleFormatError (file) {
        this.$Message.error(`${file.name}文件格式不对`)
      },
      handleMaxSize (file) {
        this.$Message.error(`${file.name}文件大小不能超过1M`)
      }
    },
    watch: {
      uploadList () {
        this.$emit('update:uploadFiles', this.uploadList)
      },
      defaultList () {
        this.$nextTick(() => {
          this.uploadList = this.$refs.upload.fileList
        })
      }
    }
  }
</script>
<style scoped>
  .upload-list{
    display: inline-block;
    max-width: 200px;
    max-height: 200px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin: 0 4px 4px 0;
  }
  .upload-list img{
    max-width: 100%;
    max-height: 100%;
  }
  .upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .upload-list:hover .upload-list-cover{
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .upload-list-cover i{
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    margin: 0 20px;
  }
  .camera{
    width: 58px;
    height:58px;
    display:flex;
    align-items:center;
    justify-content: center;
  }
</style>
