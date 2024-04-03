package org.pansionplan;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.pansionplan.model.Employee;
import org.pansionplan.model.PensionPlan;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;

public class App {
    public static void main(String[] args) {
        Employee[] employees = {
                new Employee("EX1089", "Daniel", "Agar", 105945.50, LocalDate.of(2018, 1, 17), null),
                new Employee("", "Benard", "Shaw", 197750.00, LocalDate.of(2019, 4, 3), null),
                new Employee("SM2307", "Carly", "Agar", 842000.75, LocalDate.of(2014, 5, 16), null),
                new Employee("", "Wesley", "Schneider", 74500.00, LocalDate.of(2019, 5, 2), null)
        };

        PensionPlan pp = new PensionPlan(23435, 200);
        employees[0].pensionPlan = pp;


        //sort by last name then year then salary
        Arrays.sort(employees, Comparator.comparing(Employee::getLastName).thenComparing(Employee::getYearlySalary, Comparator.reverseOrder()));

        System.out.println("-----All Employees-----");
        System.out.println("\"employees\": [");
        for(var emp: employees){
            System.out.print(emp);
            System.out.println(",");
        }
        System.out.println("]");

        System.out.println("----- Monthly Upcoming Enrolls -----");
        var qualityEmployees = Arrays.stream(employees).filter(t->((Employee) t).isUpcomingEmployee())
                .toArray();
        System.out.println("\"qualify\": [");
        for(var emp: qualityEmployees){
            System.out.print(emp);
            System.out.println(",");
        }
        System.out.println("]");
    }
}
