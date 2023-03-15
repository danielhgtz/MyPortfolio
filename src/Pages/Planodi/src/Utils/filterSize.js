import imageCompression from "browser-image-compression";

/**
 * Filtra imagenes muy grandes y no deja subirlas
 * @param maxSize - int en bits (1000000 = 1MB)
 * @param files - en formato de {size: number, etc.}[]
 *
 * return
 * {
 *     filteredImages: obj[],
 *     deleted: bool
 * }
 * */

export const filterImageSize = (maxSize, files) => {
  const filteredImages = files.filter((file) => file.size <= maxSize);
  return {
    filteredImages,
    deleted: files.length > filteredImages.length,
  };
};

export const imageCompressorAndFilter = async (maxSize, files) => {
  const resizedImages = await Promise.all(
    files.map(async (img) => {
      let newImg;
      if (img.size > 2000000) {
        newImg = await imageCompression(img, {
          maxSizeMB: 2,
        });
      } else {
        newImg = img;
      }
      return newImg;
    })
  );
  const filteredImages = resizedImages.filter((file) => {
    return file.size <= maxSize;
  });
  return {
    filteredImages,
    deleted: files.length > filteredImages.length,
  };
};
