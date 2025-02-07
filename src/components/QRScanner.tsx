
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QRScannerProps {
  onCodeScanned: (code: string) => void;
}

export const QRScanner = ({ onCodeScanned }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          if (scannerRef.current) {
            scannerRef.current.clear();
            scannerRef.current = null;
            setIsScanning(false);
            onCodeScanned(decodedText);
          }
        },
        (error) => {
          console.warn(error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [isScanning, onCodeScanned]);

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg rounded-xl">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Scan Group Code</h2>
        {!isScanning ? (
          <Button
            onClick={() => setIsScanning(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Start Scanning
          </Button>
        ) : (
          <div className="space-y-4">
            <div id="qr-reader" className="rounded-lg overflow-hidden" />
            <Button
              onClick={() => {
                if (scannerRef.current) {
                  scannerRef.current.clear();
                  scannerRef.current = null;
                }
                setIsScanning(false);
              }}
              variant="outline"
              className="w-full"
            >
              Cancel Scanning
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
