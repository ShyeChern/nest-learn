import { BadRequestException } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';

export const fileStorage = (filepath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/' + filepath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
};

/**
 * List of mime type -- https://www.freeformatter.com/mime-types-list.html
 */
export const imageFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
  if (!allowedMimes.includes(file.mimetype)) {
    cb(new BadRequestException('Only jpeg, png and gif file is accepted'));
  } else {
    cb(null, true);
  }
};

/**
 * List of mime type -- https://www.freeformatter.com/mime-types-list.html
 */
export const attachmentFilter = (req, file, cb) => {
  const allowedMimes = ['application/pdf'];
  if (!allowedMimes.includes(file.mimetype)) {
    cb(new BadRequestException('Only pdf file is accepted'));
  } else {
    cb(null, true);
  }
};

export const csvFilter = (req, file, cb) => {
  const allowedMimes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  if (!allowedMimes.includes(file.mimetype)) {
    cb(new BadRequestException('Only csv and excel file is accepted'));
  } else {
    cb(null, true);
  }
};
