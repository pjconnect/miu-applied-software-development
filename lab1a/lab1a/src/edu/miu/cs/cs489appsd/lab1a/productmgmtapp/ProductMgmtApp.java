package edu.miu.cs.cs489appsd.lab1a.productmgmtapp;

import edu.miu.cs.cs489appsd.lab1a.productmgmtapp.model.Product;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductMgmtApp {
    public static void main(String[] args) {

        Product[] products = new Product[] {
            new Product(1L, "Product A", LocalDate.of(2024, 4, 1), 10.0f, BigDecimal.valueOf(20.50)),
            new Product(2L, "Product B", LocalDate.of(2024, 4, 1), 15.0f, BigDecimal.valueOf(15.75)),
            new Product(3L, "Product C", LocalDate.of(2024, 4, 1), 8.0f, BigDecimal.valueOf(30.00)),
        };


        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < products.length; i++) {
            sb.append("\n");
            Product p = products[i];
            sb.append(p.printJSON());
            if (i < products.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("\n");
        sb.append("]");
        System.out.println(sb);


        StringBuilder sbXML = new StringBuilder();
        sbXML.append("<products>");
        for (Product p : products) {
            sbXML.append(p.printXml());
        }
        sbXML.append("</products>");
        System.out.println(sbXML);


        StringBuilder sbCSV = new StringBuilder();
        sbCSV.append("id,name,date,quantity,price\n");
        for (Product p : products) {
            sbCSV.append(p.printCsv()).append("\n");
        }
        System.out.println(sbCSV);
    }
}