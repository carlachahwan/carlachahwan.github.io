import cvAsset from '../../imports/Carla_Chahwan_s_-__CV.pdf';
import { trackEvent } from './analytics';

export function downloadCV() {
  trackEvent('cv_download', { file_name: 'Carla_Chahwan_CV.pdf' });
  const link = document.createElement('a');
  link.href = cvAsset;
  link.download = 'Carla_Chahwan_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
