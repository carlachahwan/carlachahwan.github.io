import cvAsset from '../../imports/Carla_Chahwan_s_-__CV.pdf';

export function downloadCV() {
  const link = document.createElement('a');
  link.href = cvAsset;
  link.download = 'Carla_Chahwan_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
