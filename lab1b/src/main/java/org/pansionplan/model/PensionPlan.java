package org.pansionplan.model;

public class PensionPlan {
    private int referenceNumber;
    private double monthlyContribution;

    public PensionPlan(int referenceNumber, double monthlyContribution) {
        this.referenceNumber = referenceNumber;
        this.monthlyContribution = monthlyContribution;
    }

    public int getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(int referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public double getMonthlyContribution() {
        return monthlyContribution;
    }

    public void setMonthlyContribution(double monthlyContribution) {
        this.monthlyContribution = monthlyContribution;
    }
}
