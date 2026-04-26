export type AdminLoginInput = {
   email: string
   password: string
}

export type AdminLoginResponse = {
   adminLogin: {
      accessToken: string
   }
}
