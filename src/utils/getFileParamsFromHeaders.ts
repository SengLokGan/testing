export const getFileParamsFromHeaders = (headers): { fileName: string; fileType: string } => {
  const contentDisposition = headers['content-disposition'] || '';
  const contentType = headers['content-type'];
  const start = contentDisposition.indexOf('filename="') + 'filename="'.length;
  const name = contentDisposition.slice(start, contentDisposition.indexOf('"', start));
  return {
    fileName: name || '',
    fileType: contentType,
  };
};
