package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.entity.company.Company;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class CompanyMapperImpl implements CompanyMapper {

    @Override
    public List<CompanyResponse> toCompanyResponse(List<Company> companies) {
        if ( companies == null ) {
            return null;
        }

        List<CompanyResponse> list = new ArrayList<CompanyResponse>( companies.size() );
        for ( Company company : companies ) {
            list.add( companyToCompanyResponse( company ) );
        }

        return list;
    }

    protected CompanyResponse companyToCompanyResponse(Company company) {
        if ( company == null ) {
            return null;
        }

        CompanyResponse.CompanyResponseBuilder companyResponse = CompanyResponse.builder();

        companyResponse.id( company.getId() );
        companyResponse.employer( company.getEmployer() );
        companyResponse.companyName( company.getCompanyName() );
        companyResponse.slug( company.getSlug() );
        companyResponse.description( company.getDescription() );
        companyResponse.website( company.getWebsite() );
        companyResponse.logoUrl( company.getLogoUrl() );
        companyResponse.address( company.getAddress() );
        companyResponse.companyModel( company.getCompanyModel() );
        companyResponse.industry( company.getIndustry() );
        companyResponse.companySize( company.getCompanySize() );
        companyResponse.country( company.getCountry() );
        companyResponse.workingHours( company.getWorkingHours() );
        companyResponse.overtimePolicy( company.getOvertimePolicy() );
        companyResponse.companyIntroduction( company.getCompanyIntroduction() );
        companyResponse.ourExpertise( company.getOurExpertise() );
        companyResponse.whyWorkHere( company.getWhyWorkHere() );
        companyResponse.createdAt( company.getCreatedAt() );
        companyResponse.updatedAt( company.getUpdatedAt() );

        return companyResponse.build();
    }
}
