export type Profile = {
  id: string
  fullName: string
  email: string
  avatar: string | null
  role: 'customer' | 'admin'
}