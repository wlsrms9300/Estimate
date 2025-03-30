export interface TokenPayload {
    userId: string
}

export interface AuthResponse {
    user: any
    accessToken: string
    refreshToken: string
}
