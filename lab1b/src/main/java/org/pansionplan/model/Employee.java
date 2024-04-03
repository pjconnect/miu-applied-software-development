package org.pansionplan.model;

import java.time.LocalDate;

public class Employee {
    public String referenceNumber;
    public String firstName;
    public String lastName;
    public double yearlySalary;
    public LocalDate employmentDate;
    public LocalDate enrollmentDate;

    public PensionPlan pensionPlan;

    public Employee(String referenceNumber, String firstName, String lastName, double yearlySalary, LocalDate employmentDate, LocalDate enrollmentDate) {
        this.referenceNumber = referenceNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearlySalary = yearlySalary;
        this.employmentDate = employmentDate;
        this.enrollmentDate = enrollmentDate;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public double getYearlySalary() {
        return yearlySalary;
    }

    public void setYearlySalary(double yearlySalary) {
        this.yearlySalary = yearlySalary;
    }

    public LocalDate getEmploymentDate() {
        return employmentDate;
    }

    public void setEmploymentDate(LocalDate employmentDate) {
        this.employmentDate = employmentDate;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public String toString() {
        return "{" +
                "\"referenceNumber\":\"" + referenceNumber + "\"," +
                "\"firstName\":\"" + firstName + "\"," +
                "\"lastName\":\"" + lastName + "\"," +
                "\"yearlySalary\":" + yearlySalary + "," +
                "\"employmentDate\":\"" + employmentDate + "\"," +
                "\"enrollmentDate\":\"" + enrollmentDate + "\"," +
                "\"pensionPlan\":" + (pensionPlan != null ? pensionPlan.toString() : "null") +
                "}";
    }
}