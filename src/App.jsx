import React, { useState } from "react";

export default function ImageUploader() {
    const [imageFile, setImageFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", imageFile);

        fetch("http://localhost:5000/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setResult(data))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>

            {result && (
                <ul>
                    {result.map((item, index) => (
                        <li key={index}>
                            {item.className}: {item.probability.toFixed(4)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
