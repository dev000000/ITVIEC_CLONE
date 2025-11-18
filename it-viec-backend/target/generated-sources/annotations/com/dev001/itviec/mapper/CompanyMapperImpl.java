package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.entity.company.Company;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251023-0518, environment: Java 21.0.8 (Eclipse Adoptium)"
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

        companyResponse.address( company.getAddress() );
        companyResponse.companyIntroduction( company.getCompanyIntroduction() );
        companyResponse.companyModel( company.getCompanyModel() );
        companyResponse.companyName( company.getCompanyName() );
        companyResponse.companySize( company.getCompanySize() );
        companyResponse.country( company.getCountry() );
        companyResponse.createdAt( company.getCreatedAt() );
        companyResponse.description( company.getDescription() );
        companyResponse.employer( company.getEmployer() );
        companyResponse.id( company.getId() );
        companyResponse.industry( company.getIndustry() );
        companyResponse.logoUrl( company.getLogoUrl() );
        companyResponse.ourExpertise( company.getOurExpertise() );
        companyResponse.overtimePolicy( company.getOvertimePolicy() );
        companyResponse.slug( company.getSlug() );
        companyResponse.updatedAt( company.getUpdatedAt() );
        companyResponse.website( company.getWebsite() );
        companyResponse.whyWorkHere( company.getWhyWorkHere() );
        companyResponse.workingHours( company.getWorkingHours() );

        return companyResponse.build();
    }
}
