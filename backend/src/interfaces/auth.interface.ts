export interface TokenPayload {
    userId: string
    password: string
}

export interface AuthResponse {
    user: any
    accessToken: string
    refreshToken: string
}
