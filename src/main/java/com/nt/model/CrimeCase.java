package com.nt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Document(collection = "crime_cases")
@AllArgsConstructor
@NoArgsConstructor
public class CrimeCase {

	 @Id
	    private String id;
	    private String caseId;
	    private String title;
	    private String dateOfIncident;  // Could use LocalDate if you want date parsing
	    private String timeOfCrime;
	    private String location;
	    private String caseType;
	    private String casePriority;
	    private String caseStatus;
	    private String caseSummary;
	    private String crimeMethod;
	    private String caseDetails;

	    private List<String> suspects;
	    private List<String> victims;

	    private String investigationDetails;
	    private String chargesFiled;
	    private String firNumber;
	    private String courtProceedings;
	    private List<String> evidencesCollected;
	    private String investigatingOfficer;
	    private List<String> mediaCoverage;
	    private List<String> securityLapses;
	    private List<String> images;
         private String policeStation;
         private VideoEvidence videoEvidence;

}