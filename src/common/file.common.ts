import { extname } from "path";

export const imageFilter = (req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/)))
    return callback(null, false);
  callback(null, true);
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
