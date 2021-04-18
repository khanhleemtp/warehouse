import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `/Roboto-Regular.ttf`,
    },
    {
      src: `/Roboto-Bold.ttf`,
      fontWeight: "bold",
    },
    {
      src: `/Roboto-Italic.ttf`,
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: `/Roboto-BoldItalic.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    fontFamily: "Roboto",
  },
  header: {
    borderTopWidth: 4,
    borderTopColor: "#0084B4",
    color: "#898989",
    padding: 20,
    display: "flex",
    flexDirection: "row",
  },
  headerLeft: {
    textAlign: "left",
    flex: 1,
    alignSelf: "center",
    fontSize: 32,
    fontWeight: 900,
    lineHeight: 1,
    color: "#0084B4",
  },
  headerRight: {
    textAlign: "right",
    fontSize: 12,
    flex: 1,
  },

  ribbon: {
    backgroundColor: "#0084B4",
    display: "flex",
    flexDirection: "row",
    padding: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
  },
  ribbonGrey: {
    backgroundColor: "#EDEDED",
    display: "flex",
    flexDirection: "row",
    padding: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#0084B4",
  },
  ribbonBox: {
    width: "33.333333%",
  },
  ribbonLabel: {
    fontSize: 14,
  },
  ribbonValue: {
    fontSize: 28,
  },

  table: {
    paddingHorizontal: 20,
    display: "flex",
    marginBottom: 20,
  },
  tableRowA: {
    backgroundColor: "#EDEDED",
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  tableRowB: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  serviceName: {
    fontSize: 10,
    width: "25%",
  },
  serviceDescription: {
    fontSize: 10,
    width: "50%",
  },
  serviceAmount: {
    fontSize: 20,
    width: "25%",
    textAlign: "right",
  },
  tableHeadingA: {
    width: "25%",
    fontSize: 14,
    color: "#0084B4",
  },
  tableHeadingB: {
    width: "50%",
    fontSize: 14,
    color: "#0084B4",
  },
  tableHeadingC: {
    width: "25%",
    textAlign: "right",
    fontSize: 14,
    color: "#0084B4",
  },
  summary: {
    backgroundColor: "#0084B4",
    color: "#FFF",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  summaryMeta: {
    width: "75%",
  },
  summaryAmount: {
    fontSize: 20,
    width: "25%",
    textAlign: "right",
  },

  howToPay: {
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 20,
    color: "#0084B4",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopColor: "#EDEDED",
    borderTopWidth: 1,
    textAlign: "center",
    fontSize: 10,
  },
});

const Invoice = ({ invoiceData }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text>Bên B</Text>
          <Text>{invoiceData.customer.toLocaleUpperCase()}</Text>
        </View>
        <View style={styles.headerRight}>
          <Text>Hà Nội</Text>
          <Text>Quận Hai Bà Trưng</Text>
          <Text>NEU</Text>
          <Text>IT</Text>
        </View>
      </View>

      <View style={styles.ribbon}>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}>Ngày</Text>
          <Text style={styles.ribbonValue}>
            {moment(invoiceData.timeCreate).format("DD-MM-YYYY")}
          </Text>
        </View>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}> </Text>
          <Text style={styles.ribbonValue}></Text>
        </View>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}>
            Hóa đơn {invoiceData.type === "in" ? "nhập kho" : "xuất kho"}
          </Text>
          <Text style={styles.ribbonValue}>#{invoiceData.id}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRowB}>
          <Text style={styles.tableHeadingA}>Sản phẩm</Text>
          <Text style={styles.tableHeadingB}>Giá</Text>
          <Text style={styles.tableHeadingB}>Số lượng</Text>
          <Text style={styles.tableHeadingC}>Thành tiền</Text>
        </View>

        {invoiceData.history.map((item) => {
          let price = invoiceData.type === "in" ? item.inPrice : item.outPrice;
          return (
            <View
              style={
                item.productId % 2 === 0 ? styles.tableRowA : styles.tableRowB
              }
              key={item.productId}
            >
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceDescription}>{price}</Text>
              <Text style={styles.serviceDescription}>{item.quantity}</Text>
              <Text style={styles.serviceAmount}>{item.quantity * price}</Text>
            </View>
          );
        })}

        {/* <View style={styles.tableRowB}>
          <Text style={styles.serviceName}>Development</Text>
          <Text style={styles.serviceDescription}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod
          </Text>
          <Text style={styles.serviceAmount}>£2000.00</Text>
        </View>

        <View style={styles.tableRowA}>
          <Text style={styles.serviceName}>Consultation</Text>
          <Text style={styles.serviceDescription}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod
          </Text>
          <Text style={styles.serviceAmount}>£1500.00</Text>
        </View> */}

        <View style={styles.summary}>
          <Text style={styles.summaryMeta}>Tổng chi phí: </Text>
          <Text style={styles.summaryAmount}>{invoiceData.totalPrice}</Text>
        </View>
      </View>

      <Text style={styles.howToPay}>Bên A</Text>

      <View style={styles.ribbonGrey}>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}></Text>
          <Text style={styles.ribbonValue}></Text>
        </View>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}></Text>
          <Text style={styles.ribbonValue}></Text>
        </View>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}>Ký tên</Text>
          <Text style={styles.ribbonValue}>
            {invoiceData.employee.toLocaleUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>neu.com &bull; neu@neu.com &bull; 0123 456 7890</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;
