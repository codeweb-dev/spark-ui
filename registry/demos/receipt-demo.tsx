import { Receipt } from "@/registry/spark-ui/receipt";

export default function ReceiptDemo() {
  return (
    <Receipt
      title="Thanks for using Spark UI!"
      description="Your next polished interface starts here."
      ticketId="SPARK-UI-001"
      amount="$0.00"
      dateTime="14 Jul 2026 · 22:42"
      cardholder="Spark UI"
      cardLastFour="2026"
      barcodeValue="SPARK UI 2026"
    />
  );
}
