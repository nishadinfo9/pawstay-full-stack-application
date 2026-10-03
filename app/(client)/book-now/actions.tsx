'use server'

export default async function CreatePost(formData: FormData) {
  const title = formData.get('title')

  console.log('title:', title)
}