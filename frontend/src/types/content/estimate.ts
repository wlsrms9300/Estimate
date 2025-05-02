/**
 * @interface EstimateItem
 * @description 견적서 아이템
 */
export interface EstimateItem {
    itemName: string
    specification: string
    unit: string
    quantity: number
    unitPrice: number
    vat: number
    totalPrice: number
    memo: string
}

/**
 * @interface EstimateForm
 * @description 견적서 폼
 */
export interface EstimateForm {
    title: string
    managerName: string
    ceoName: string
    companyName: string
    quoteDate: string
    phone: string
    bankAccount: string

    postCode: string // 우편번호
    address: string // 주소(지번)
    addressDetail: string // 상세주소
    roadAddress: string // 도로명주소
    sido: string // 시도
    sigungu: string // 시군구
    sigunguCode: string // 시군구코드
    bName: string // 법정동명
    buildingName: string // 건물명

    memo: string
    items: EstimateItem[]
}

/**
 * @interface EstimateListItem
 * @description 견적서 리스트 아이템
 */
export interface EstimateListItem {
    address: string
    addressDetail: string
    bName: string
    bankAccount: string
    buildingName: string
    ceoName: string
    companyName: string
    createdAt: string
    estimateId: string
    managerName: string
    memo: string
    phone: string
    postCode: string
    quoteDate: string
    roadAddress: string
    sido: string
    sigungu: string
    sigunguCode: string
    supplyPrice: number
    title: string
    totalPrice: number
    vat: number
}
