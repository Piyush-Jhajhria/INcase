
import { QRCodeSVG } from 'qrcode.react';
import { Download, Info } from 'lucide-react';


interface QRCodeDisplayProps {
  qrValue: string;
  onDownload: () => void;
  isLoading?: boolean;
  accessInstructions?: string;
}

export default function QRCodeDisplay({
  qrValue,
  onDownload,
  isLoading = false,
  accessInstructions
}: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg h-full">
      <div className="bg-white p-4 rounded-lg shadow-sm min-h-[280px] flex items-center justify-center w-full">
        {qrValue ? (
          <QRCodeSVG
            value={qrValue}
            size={250}
            level="M"
            includeMargin={true}
            className="qr-code-svg"
          />
        ) : (
          <div className="text-center text-gray-400">
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-sm">QR Code</span>
            </div>
            <p className="text-sm">Fill form and generate QR</p>
          </div>
        )}
      </div>

      {/* IMPORTANT: Instructions for mobile access */}
      {qrValue && accessInstructions && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg w-full">
          <div className="flex gap-2 text-xs text-blue-800">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div className="whitespace-pre-line text-xs">{accessInstructions}</div>
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600 text-center">
        {qrValue
          ? "Scan with mobile to view emergency info"
          : "Complete the form and click Generate"
        }
      </p>
      <button
        onClick={onDownload}
        disabled={isLoading}
        className="mt-6 flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base font-bold shadow-lg"
      >
        <Download className="h-5 w-5" />
        {isLoading ? 'Generating...' : qrValue ? 'Download QR' : 'Generate QR Code'}
      </button>
    </div>
  );
}