import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ text }) => {
    return <QRCode value={text} />;
};

export default QRCodeGenerator;
