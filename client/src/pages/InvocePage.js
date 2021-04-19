import { PDFViewer } from "@react-pdf/renderer";
import { Fragment } from "react";
import InvoicePdf from "../components/Invoice";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Typography } from "@material-ui/core";
// import Report from "../components/Report";

// const productsList = [
//   {
//     id: 7,
//     type: "in",
//     outPrice: 10000,
//     inPrice: 8000,
//     avaiable: 6,
//     description: "Mì tôm ngon ",
//     name: "Mì tôm",
//     totalIn: 10,
//     totalOut: 4,
//   },
//   {
//     id: 8,
//     type: "in",
//     outPrice: 3000,
//     inPrice: 1000,
//     avaiable: 3,
//     description: "Mì chính ngon",
//     name: "Mì chính",
//     totalIn: 7,
//     totalOut: 4,
//   },
// ];

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
          <PDFViewer height={600} width={1200}>
            <InvoicePdf invoiceData={invoice?.data} />
          </PDFViewer>
        )
      )}

      {/* <PDFViewer height={600} width={1200}>
        <Report productsList={productsList} />
      </PDFViewer> */}
    </Fragment>
  );
};

export default InvocePage;
