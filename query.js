const output = [
  { invoice_id: 1, invoice_title: "DON1" },
  { invoice_id: 1, invoice_title: "DON1" },
  { invoice_id: 2, invoice_title: "DON 3" },
];

const listUniqInvoiceId = [...new Set(output.map((item) => item.invoice_id))];
const extractedInvoice = listUniqInvoiceId.map((invoiceId) => {
  const history = output.filter((item) => item.invoice_id == invoiceId);
  console.log(history);
  const invoice = {
    id: history[0].invoice_id,
    name: history[0].invoice_title,
    history,
  };
  return invoice;
});
console.log(extractedInvoice);
