import React, { useState, useEffect } from 'react'
import {
  Upload,
  Button,
  message,
  Modal
} from 'antd'
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons'
const imgTypeLimit = ['image/png', 'image/jpg']
const imgLimitSize = 3 * 1024 * 1024
const MyUpload = (props) => {
  const [fileList, setFileList] = useState([])
  // 图片预览框
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  // 上传button加个loading
  const [loading, setLoading] = useState(false)

  const beforeUpload = (file, fileList) => {
    // 判断文件格式
    if ((imgTypeLimit.includes(file.type)) && file.size < imgLimitSize) {
      setFileList(fileList)
    } else {
      message.error('上传的图片格式或尺寸不符合要求!')
      return Upload.LIST_IGNORE  // 不加入fileList
    }
    // 返回false表示不上传
    return false
  }
  // 移除图片
  const handleRemove = (file) => {
    setFileList([]);
  }
  const handleChange = (info) => {
    setFileList(info.fileList)
  }
  // 图片预览
  const handlePreview = (file) => {
    setPreviewTitle(file.name)
    setPreviewUrl(file.url || file.thumbUrl)
    setPreviewVisible(true)
  }
  // 图片预览结束/取消
  const handlePreviewCancel = () => {
    setPreviewVisible(false)
  }
  // 点击上传
  const handleUpload = () => {
    const formData = new FormData()
    if (!fileList || fileList.length === 0) return message.error('请上传图片')
    formData.append('file', fileList[0])
    setLoading(true)
    // 发起请求...
    setTimeout(() => { console.log("timeout"); }, 1000)
    setLoading(false)
  }

  useEffect(() => {
  }, [loading])

  return (
    <div
    >
      <Upload
        classNmae="avatar-uploader"
        listType="picture-card"
        maxCount={1}  // 限制最大上传
        fileList={fileList}
        showUploadList={true}  // 列表缩略图
        accept=".jpg, .png"  // 打开的文件框默认的文件类型，对于其他文件属性的限制用beforeUpload判断
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {
          // fileList && fileList.length >= 1 ? null : (
          //   <div>
              <PlusOutlined />
          //   </div>
          // )
        }
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handlePreviewCancel}>
        <img src={previewUrl} alt="" />
      </Modal>
      <Button
        type="primary"
        onClick={handleUpload}
        loading={loading}
      >上传</Button>
    </div>
  )
}

export default MyUpload
