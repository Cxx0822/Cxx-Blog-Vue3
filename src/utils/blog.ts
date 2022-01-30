// 计算正文内容的字数
export const computeWords = (content: string):number => {
  return content.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').length
}
