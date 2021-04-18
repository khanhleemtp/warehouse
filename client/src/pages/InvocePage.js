import { PDFViewer } from "@react-pdf/renderer";
import { Fragment } from "react";
import InvoicePdf from "../components/Invoice";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Typography } from "@material-ui/core";

const InvocePage = () => {
  const params = useParams();
  console.log(params);
  // fetch all product
  const { data: invoice, isPending, error } = useFetch(
    "http://127.0.0.1:8000/api/v1/invoices/" + params.id
  );

  return (
    <Fragment>
      {error && <Typography>{error}</Typography>}
      {isPending ? (
        <div>Loading..</div>
      ) : (
        invoice && (
          <PDFViewer height={600} width={600}>
            <InvoicePdf invoiceData={invoice?.data} />
          </PDFViewer>
        )
      )}
    </Fragment>
  );
};

export default InvocePage;
