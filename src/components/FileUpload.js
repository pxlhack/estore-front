import React, { useState } from "react";
import uploadFile from "../api/uploadFile";

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert("Выберите файл!");
            return;
        }

        try {
            await uploadFile(file);
            alert("Файл загружен!");
        } catch (error) {
            alert("Ошибки загрузки!");
        }
    };

    return (
        <div>
            <input type="file" accept=".zip" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Загрузка zip файла</button>
        </div>
    );
};

export default FileUpload;
