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
                new Employee("EX1089", "Daniel", "Agar", 105945.50, LocalDate.of(2012, 1, 17), null),
                new Employee("", "Benard", "Shaw", 197750.00, LocalDate.of(2013, 3, 3), null),
                new Employee("SM2307", "Carly", "Agar", 842000.75, LocalDate.of(2015, 4, 16), null),
                new Employee("", "Wesley", "Schneider", 74500.00, LocalDate.of(2023, 4, 2), null)
        };


        Arrays.sort(employees, Comparator.comparing(Employee::getLastName).thenComparing(Employee::getYearlySalary, Comparator.reverseOrder()));

        for(var emp: employees){
            System.out.println(emp);
        }
    }
}
