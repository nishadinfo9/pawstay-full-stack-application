export {}

// Create a type for the Roles
export type Roles = 'admin' | 'customer'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}