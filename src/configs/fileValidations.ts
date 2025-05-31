export const validateImage = (selectedFile: File) => {
    const fileSizeLimit = 2 * 1024 * 1024; // 2MB
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/gif'];

    if (!allowedFileTypes.includes(selectedFile.type)) {
        return {
            success: false,
            message: 'Only jpg, jpeg, png, svg, and gif Image files are allowed'
        }
    }
    if (selectedFile.size > fileSizeLimit) {
        return {
            success: false,
            message: 'Image size should be less than 2MB'
        }
    }
    return {
        success: true,
        message: 'Image is valid'
    }
}