import { backendApi } from '../client'

export const generateResult = async (
  bodyImages: string[],
  itemImages: string[],
  description: string,
) => {
  const res = await backendApi.post('/api/ai/generate', {
    bodyImages,
    itemImages,
    description,
  })

  return res.data.image
}
