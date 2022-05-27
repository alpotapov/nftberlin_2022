import axios from 'axios';

const upload = async (selectedImage) => {
  try {
    const data = new FormData();
    data.append('NFT', selectedImage);

    const result = await axios.post('/api/upload', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    return result.data?.IpfsHash;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

const uploadGameProfileImage = async (selectedImage) => {
  try {
    const data = new FormData();
    data.append('image', selectedImage);

    const result = await axios.post('/api/images', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    return result.data?.link;
  } catch (error) {
    console.log(error);
  }

  return undefined;
};

export default {
  upload,
  uploadGameProfileImage,
};
