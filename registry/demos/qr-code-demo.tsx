"use client";

import { QRCode } from "@/registry/spark-ui/qr-code";

export default function QRCodeDemo() {
  return (
    <div className="flex items-center justify-center p-6">
      <QRCode value="https://spark-ui-olive.vercel.app" />
    </div>
  );
}
