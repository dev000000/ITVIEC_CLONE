package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.city.City;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260101-2150, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class ApplicationMapperImpl implements ApplicationMapper {

    @Override
    public List<ApplicationResponse> toApplicationResponse(List<Application> applications) {
        if ( applications == null ) {
            return null;
        }

        List<ApplicationResponse> list = new ArrayList<ApplicationResponse>( applications.size() );
        for ( Application application : applications ) {
            list.add( applicationToApplicationResponse( application ) );
        }

        return list;
    }

    protected ApplicationResponse applicationToApplicationResponse(Application application) {
        if ( application == null ) {
            return null;
        }

        ApplicationResponse.ApplicationResponseBuilder applicationResponse = ApplicationResponse.builder();

        applicationResponse.coverLetter( application.getCoverLetter() );
        applicationResponse.createdAt( application.getCreatedAt() );
        List<City> list = application.getDesiredLocations();
        if ( list != null ) {
            applicationResponse.desiredLocations( new ArrayList<City>( list ) );
        }
        applicationResponse.employerMessage( application.getEmployerMessage() );
        applicationResponse.fullName( application.getFullName() );
        applicationResponse.id( application.getId() );
        applicationResponse.job( application.getJob() );
        applicationResponse.phoneNumber( application.getPhoneNumber() );
        applicationResponse.resumeUrl( application.getResumeUrl() );
        applicationResponse.seeker( application.getSeeker() );
        applicationResponse.status( application.getStatus() );
        applicationResponse.updatedAt( application.getUpdatedAt() );

        return applicationResponse.build();
    }
}
