import axios from "axios";

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const url = "http://localhost:8081/estore/api/file/upload"
    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки файла!", error);
        throw error;
    }
};

export default uploadFile;
