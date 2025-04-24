/**
 * @interface EstimateItem
 * @description 견적서 아이템
 */
export interface EstimateItem {
    id: string
    name: string
    specification: string
    unit: string
    quantity: number
    unitPrice: number
    tax: number
    amount: number
    note: string
}

/**
 * @interface EstimateForm
 * @description 견적서 폼
 */
export interface EstimateForm {
    manager: string
    representative: string
    companyName: string
    companyAddress: string
    contactNumber: string
    estimateName: string
    accountNumber: string
    note: string
    items: EstimateItem[]
}
