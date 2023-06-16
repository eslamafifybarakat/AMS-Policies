export const patterns = {
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
}
