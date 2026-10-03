
import Container from '@/components/container/container'
import CreatePost from './actions'

const BookNow = () => {
  return (
    <Container>
      <form action={CreatePost} className="flex flex-col gap-2">
        <input name="title" type="text" placeholder="New Post Title" required />
        <button type="submit">Create Post</button>
      </form>
    </Container>
  )
}

export default BookNow