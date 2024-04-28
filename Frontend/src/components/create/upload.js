// pages/api/upload.js

import multer from 'multer';

const upload = multer({ dest: '../../notebooks/attachments/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req, res) {
    upload.array('files')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'An error occurred while uploading the file' });
        } else if (err) {
            return res.status(500).json({ error: 'An unknown error occurred' });
        }

        const files = req.files.map((file) => ({
            originalname: file.originalname,
            filename: file.filename,
        }));
        return res.status(200).json({ files });
    });
}
