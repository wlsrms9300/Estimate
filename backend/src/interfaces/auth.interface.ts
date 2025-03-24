export interface TokenPayload {
    user_id: string
    userType: string
}

export interface AuthResponse {
    user: any
    accessToken: string
    refreshToken: string
}
