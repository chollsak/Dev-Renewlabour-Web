import axios from "axios";

export const uploadProfilePicture = async (profilePicture: any, category: any, number: any, type: any) => {
    if (profilePicture && profilePicture !== null) {
        const formData = new FormData();
        formData.append('filePaths', profilePicture);
        formData.append('number', number);


        console.log(profilePicture)

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FILE_API}/upload/${category}/${type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error('Profile picture upload failed:', error);
            return { status: 500 };
        }
    } else {
        return { status: 400 };
    }
};

export const uploadFileFormData = async (fileFormData: any, number: any) => {

    const uploadPromises = Object.values(fileFormData).map(async (fileData: any) => {
        if (fileData.file) {
            const formData = new FormData();
            formData.append('filePaths', fileData.file);
            formData.append('number', number);

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_FILE_API}/upload/persons/${fileData.title}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return response;
            } catch (error) {
                return { status: 500 };
            }
        }
    });

    await Promise.all(uploadPromises);
    return { status: 200 };
};

export const uploadOtherFiles = async (uploadedFiles: any, person: any, personId: any) => {
    if (uploadedFiles.length > 0) {
        const otherFilesFormData = new FormData();
        uploadedFiles.forEach((file: any) => {
            otherFilesFormData.append('files', file);
        });
        otherFilesFormData.append('outlanderNo', person.outlanderNo);
        otherFilesFormData.append('personId', personId);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FILE_API}/upload`, otherFilesFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return { status: 500 };
        }
    } else {
        return { status: 400 };
    }
};