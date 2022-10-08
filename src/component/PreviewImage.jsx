import { useState } from 'react';

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState();
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <div>
      {preview !== null ? (
        <img src={preview} alt='preview' width='200px' height='200px' />
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default PreviewImage;
