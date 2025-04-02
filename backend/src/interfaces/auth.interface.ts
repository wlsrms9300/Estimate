export interface TokenPayload {
    userId: string
    id: number
}

export interface AuthResponse {
    user: any
    accessToken: string
    refreshToken: string
}
