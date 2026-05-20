import z from 'zod'

export const signInSchema = z.object({
   email: z.email({ error: 'The email must match the format example@example.com' }),
   password: z.string({ error: 'The email or password are incorrect. Try again please' }),
})
