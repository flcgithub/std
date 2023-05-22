import { ElMessage } from 'element-plus'

export const elMsg = (type, message) => {
  ElMessage({
    type,
    message
  })
}