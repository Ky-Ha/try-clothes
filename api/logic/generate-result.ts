import { backendApi } from '../client'

export const generateResult = async (
  bodyImages: string[],
  itemImages: string[],
  description: string,
) => {
  const res = await backendApi.post('/api/ai/test', {
    bodyImages,
    itemImages,
    description,
  })

  return res.data.image
}
