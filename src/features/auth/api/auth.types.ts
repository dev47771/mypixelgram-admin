export type AdminLoginInput = {
   email: string
   password: string
}

export type AdminLoginResponse = {
   adminLogin: boolean
}

export type AdminCheckerResponse = {
   AdminChecker: boolean
}

export type AdminLogoutResponse = {
   adminLogout: boolean
}
