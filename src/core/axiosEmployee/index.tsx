import axios from "axios";

export const uploadProfilePicture = async (profilePicture: any, person: any, personId: any) => {
    if (profilePicture || profilePicture !== null) {
        const formData = new FormData();
        formData.append('filePaths', profilePicture);
        formData.append('outlanderNo', person.outlanderNo);
        formData.append('personId', personId);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FILE_API}/upload/persons/picpath`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Profile picture upload response:', response.data);
        } catch (error) {
            console.error('Profile picture upload failed:', error);
        }
    }
};

export const uploadFileFormData = async (fileFormData: any, person: any, personId: any) => {
    for (let key in fileFormData) {
        const fileData = fileFormData[key];
        if (fileData.file) {
            const formData = new FormData();
            formData.append('filePaths', fileData.file);
            formData.append('outlanderNo', person.outlanderNo);
            formData.append('personId', personId);

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_FILE_API}/upload/persons/${fileData.title}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Files upload response:', response.data);
            } catch (error) {
                console.error('Files upload failed:', error);
            }
        }
    }
};

export const uploadOtherFiles = async (uploadedFiles: any, person: any, personId: any) => {
    if (uploadedFiles.length > 0) {
        const otherFilesFormData = new FormData();
        uploadedFiles.forEach((file: any, index: any) => {
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
            console.log('Other files upload response:', response.data);
        } catch (error) {
            console.error('Other files upload failed:', error);
        }
    }
};