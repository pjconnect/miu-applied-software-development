package edu.miu.cs.cs489appsd.lab1a.productmgmtapp.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Product {
    public Long productId;
    public String name;
    public LocalDate dateSupplied;
    public Float qtyInStock;
    public BigDecimal unitPrice;

    public Product(Long productId, String name, LocalDate dateSupplied, Float qtyInStock, BigDecimal unitPrice) {
        this.productId = productId;
        this.name = name;
        this.dateSupplied = dateSupplied;
        this.qtyInStock = qtyInStock;
        this.unitPrice = unitPrice;
    }

    public Product(String name) {
        this.name = name;
    }

    public Product() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateSupplied() {
        return dateSupplied;
    }

    public void setDateSupplied(LocalDate dateSupplied) {
        this.dateSupplied = dateSupplied;
    }

    public Float getQtyInStock() {
        return qtyInStock;
    }

    public void setQtyInStock(Float qtyInStock) {
        this.qtyInStock = qtyInStock;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String printJSON() {
        return "{" +
                "\"id\":" + productId +
                ", \"name\":\"" + name + "\"" +
                ", \"date\":\"" + dateSupplied + "\"" +
                ", \"quantity\":" + qtyInStock +
                ", \"price\":" + unitPrice +
                "}";
    }

    public String printXml() {
        StringBuilder sb = new StringBuilder();
        sb.append("<product>");
        sb.append("<id>").append(productId).append("</id>");
        sb.append("<name>").append(name).append("</name>");
        sb.append("<date>").append(dateSupplied).append("</date>");
        sb.append("<quantity>").append(qtyInStock).append("</quantity>");
        sb.append("<price>").append(unitPrice).append("</price>");
        sb.append("</product>");
        return sb.toString();
    }

    public String printCsv() {
        return productId + "," + name + "," + dateSupplied + "," + qtyInStock + "," + unitPrice;
    }
}
