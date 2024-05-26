import AdmZip from 'adm-zip';

const zip = new AdmZip('common.zip');
zip.extractAllTo('.');
