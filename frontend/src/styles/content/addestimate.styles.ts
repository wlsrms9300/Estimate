export const addEstimateStyles = {
    contentContainer: 'bg-white/4 backdrop-blur-lg p-8 w-full pb-20',
    container: '!bg-white px-8 py-6 rounded-xl relative w-full mb-16',
    title: 'text-2xl font-bold text-gray-800 mb-6',
    sectionTitle: 'text-lg font-medium text-gray-700 mb-4 mt-6',
    formSection: 'w-full',
    formItem: '[&_.ant-form-item-label]:!text-gray-500 [&_.ant-form-item-label]:!text-sm [&_.ant-form-item-label]:!mb-1',
    formItemError:
        '[&_.ant-form-item-explain-error]:!text-[12px] [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!ml-2.5 [&_.ant-form-item-explain-error]:!mt-1',
    input: '!rounded-lg',
    tableContainer:
        'mt-8 mb-6 w-full [&_.ant-table-wrapper]:w-full [&_.ant-table]:w-full [&_.ant-table-container]:w-full [&_.ant-table-content]:w-full [&_.ant-table-thead]:bg-gray-50',
    tableHeader: '!bg-blue-50/80',
    noWrap: 'whitespace-nowrap',
    addButton:
        'w-full flex justify-center items-center py-2 border border-dashed border-gray-300 rounded-lg mt-2 cursor-pointer hover:border-[#6366f1] hover:text-[#6366f1] transition-colors',
    deleteButton: '!text-red-500 !text-lg !cursor-pointer',
    floatingButton:
        'w-full !mt-15 !h-14 !bg-[#6366f1] !flex !items-center !justify-center !text-white !text-lg !font-medium !shadow-lg hover:!bg-[#4f46e5] !rounded-lg fixed bottom-0 left-0 right-0 z-50',
}
