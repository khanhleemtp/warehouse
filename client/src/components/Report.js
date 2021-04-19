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
    fontSize: 14,
    fontWeight: 900,
    lineHeight: 1,
    color: "#0084B4",
  },
  textLarge: {
    fontSize: 20,
  },
  headerCenter: {
    textAlign: "center",
  },
  headerRight: {
    textAlign: "right",
    fontSize: 14,
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
    fontSize: 20,
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
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#EDEDED",
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
    fontSize: 12,
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

const Report = ({ productsList }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.header}>
        {/* Sửa địa chỉ */}
        <View style={styles.headerCenter}>
          {/* TODO Sửa đơn vị */}
          <Text style={{ fontSize: 24 }}>Báo cáo xuất nhập kho</Text>
          <Text style={{ fontSize: 16 }}>{moment().format("DD-MM-YYYY")}</Text>
        </View>
      </View>

      <View style={styles.ribbon}>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}></Text>
          <Text style={styles.ribbonValue}>
            {/* {moment().format("DD-MM-YYYY")} */}
          </Text>
        </View>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}>Bưu Điện Nghệ An</Text>
          <Text style={styles.ribbonValue}></Text>
        </View>
        <View style={styles.ribbonBox}>
          <Text style={styles.ribbonLabel}></Text>
        </View>
      </View>
      {/* TODO Báo cáo */}
      <View style={styles.table}>
        <View style={styles.tableRowB}>
          <Text style={styles.tableHeadingB}>Mã sản phẩm</Text>
          <Text style={styles.tableHeadingB}>Sản phẩm</Text>
          <Text style={styles.tableHeadingB}>Giá nhập</Text>
          <Text style={styles.tableHeadingB}>Giá xuất</Text>
          <Text style={styles.tableHeadingB}>Nhập kho</Text>
          <Text style={styles.tableHeadingB}>Xuất kho</Text>
          <Text style={styles.tableHeadingB}>Tồn kho</Text>
          <Text style={styles.tableHeadingB}>Mô tả</Text>
        </View>

        {productsList.map((item) => {
          return (
            <View
              style={item.id % 2 === 0 ? styles.tableRowA : styles.tableRowB}
              key={item.id}
            >
              <Text style={styles.serviceName}>BT_{item.id}</Text>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceName}>{item.inPrice}</Text>
              <Text style={styles.serviceName}>{item.outPrice}</Text>
              <Text style={styles.serviceName}>{item.avaiable}</Text>
              <Text style={styles.serviceName}>{item.totalIn}</Text>
              <Text style={styles.serviceName}>{item.totalOut}</Text>
              <Text style={styles.serviceName}>{item.description}</Text>
            </View>
          );
        })}
      </View>
    </Page>
  </Document>
);

export default Report;
