import { FILE_TYPES } from '@constants';
import { API } from '@utils';

export const handleFileLinkClick = async (url: string, file, removeLink?: boolean) => {
  const { data: downloadedFile } = await API.get(url, {
    responseType: 'blob',
  });
  const fileUrl = window.URL.createObjectURL(new Blob([downloadedFile], { type: downloadedFile.type }));
  const link = document.createElement('a');
  link.setAttribute('data-testid', `file-${file.id}`);
  link.href = fileUrl;
  link.target = '_blank';
  downloadedFile.type !== FILE_TYPES.pdf && link.setAttribute('download', file.name);
  document.body.appendChild(link);
  link.click();
  if (removeLink && link?.parentNode) link.parentNode.removeChild(link);
};
