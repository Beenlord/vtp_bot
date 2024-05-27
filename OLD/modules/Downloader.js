import murmurhash from 'murmurhash';
import https from 'https';
import fs from 'fs';
import path from 'path';

export default class Downloader
{
	salt;
	folder;

	constructor(folder, salt = 86574) {
		this.salt = salt;
		this.folder = folder;
	}

	upload(url) {
		return new Promise((resolve, reject) => {
			const file = path.basename(url)
			const ext = path.extname(file);

			const hashName = murmurhash(file);
			const hashMask = murmurhash(file, Date.now());

			const fName = `${hashName}${ext}`;
			const fPath = path.join(this.folder, fName);

			const fWrite = fs.createWriteStream(fPath);

			const req = https.get(url, (res) => {
				res.pipe(fWrite);

				fWrite.on('finish', () => {
					fWrite.close();
					resolve({
						file: fName,
						path: fPath,
						hash: hashMask,
					});
				});
			});
		});
	}
}
