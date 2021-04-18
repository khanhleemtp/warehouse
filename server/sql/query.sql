-- Create
INSERT INTO `invoice`(`title`, `totalPrice`, `timeCreate`, `customer`, `employee`, `type`) VALUES ();

INSERT INTO `history`(`productId`, `invoiceId`, `quantity`, `note`) VALUES ();
INSERT INTO `history`(`productId`, `invoiceId`, `quantity`, `note`) VALUES ();
INSERT INTO `history`(`productId`, `invoiceId`, `quantity`, `note`) VALUES ();



-- Get info
SELECT 
	invoice.id as invoiceId,
    invoice.title as title,
    invoice.type as type,
    invoice.totalPrice as totalPrice,
    history.quantity as quantity,
    product.name as productName,
    product.outPrice as productOutprice,
    product.inPrice as productInprice
FROM `invoice`
LEFT JOIN history on history.invoiceId = invoice.id
LEFT JOIN product on product.id = history.productId
WHERE product.isActive=1 AND invoice.id = 46;

-- Query theo thoi gian
SELECT * from invoice  
WHERE timeCreate BETWEEN '2021-01-29 10:15:55' AND '2021-04-15 14:15:55';