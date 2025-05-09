export const profileStyles = {
    container: '!bg-white px-10 py-6 rounded-xl overflow-auto',
    title: 'text-2xl font-bold text-gray-800 mb-6',
    form: 'w-full',
    sectionTitle: 'text-lg font-medium text-gray-700 mb-2',
    sectionDescription: 'text-sm text-gray-500 mb-4',
    infoSection: 'py-6',
    infoItem: 'flex justify-between items-center py-3',
    infoLabel: 'text-gray-500 font-medium text-sm mb-1',
    infoValue: 'text-gray-800 font-medium text-lg h-10 flex items-center',
    emptyValue: 'text-gray-300 font-medium text-lg h-10 flex items-center',
    bioValue: 'text-gray-800 font-medium text-lg min-h-[74px] py-2 flex-col items-start justify-center',
    valueContainer: 'flex flex-col justify-center',
    infoEditButton: 'border border-[#6366f1] text-[#6366f1] hover:text-[#4f46e5] hover:border-[#4f46e5]',
    editActions: 'flex gap-2 ml-4',
    editCancelButton: 'border border-gray-300 text-gray-600',
    editSaveButton: '!bg-[#6366f1] !text-white hover:!bg-[#4f46e5]',
    input: 'h-10 rounded-lg w-full max-w-sm',
    inputError:
        'h-10 rounded-lg w-full max-w-sm !border-red-500 hover:!border-red-500 focus:!border-red-500 focus:!shadow-[0_0_0_2px_rgba(239,68,68,0.1)]',
    textArea: 'min-h-[74px] rounded-lg',
    divider: 'my-0 border-gray-200',
    formItemError:
        '[&_.ant-form-item-explain-error]:!text-[12px] [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!ml-2.5 [&_.ant-form-item-explain-error]:!mt-1',
    formItem: '[&_.ant-form-item-label]:!text-gray-500 [&_.ant-form-item-label]:!text-sm [&_.ant-form-item-label]:!mb-1',
    inputLarge: '!h-10 !rounded-xl !w-full !max-w-sm',

    // StepEmailChange
    stepContainer: '!bg-white !flex !flex-col !justify-between !pt-20',
    buttonSize: '!h-[45px] !rounded-xl !w-full',
}
