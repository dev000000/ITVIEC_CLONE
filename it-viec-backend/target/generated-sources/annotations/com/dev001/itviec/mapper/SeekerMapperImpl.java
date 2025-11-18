package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.skill.Skill;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class SeekerMapperImpl implements SeekerMapper {

    @Override
    public List<SeekerResponse> toSeekerResponse(List<Seeker> seekers) {
        if ( seekers == null ) {
            return null;
        }

        List<SeekerResponse> list = new ArrayList<SeekerResponse>( seekers.size() );
        for ( Seeker seeker : seekers ) {
            list.add( seekerToSeekerResponse( seeker ) );
        }

        return list;
    }

    protected SeekerResponse seekerToSeekerResponse(Seeker seeker) {
        if ( seeker == null ) {
            return null;
        }

        SeekerResponse.SeekerResponseBuilder seekerResponse = SeekerResponse.builder();

        seekerResponse.id( seeker.getId() );
        seekerResponse.user( seeker.getUser() );
        seekerResponse.fullName( seeker.getFullName() );
        seekerResponse.jobTitle( seeker.getJobTitle() );
        seekerResponse.phoneNumber( seeker.getPhoneNumber() );
        seekerResponse.dob( seeker.getDob() );
        seekerResponse.gender( seeker.getGender() );
        seekerResponse.city( seeker.getCity() );
        seekerResponse.address( seeker.getAddress() );
        seekerResponse.personalLink( seeker.getPersonalLink() );
        seekerResponse.coverLetter( seeker.getCoverLetter() );
        seekerResponse.createdAt( seeker.getCreatedAt() );
        seekerResponse.updatedAt( seeker.getUpdatedAt() );
        List<Skill> list = seeker.getSkills();
        if ( list != null ) {
            seekerResponse.skills( new LinkedHashSet<Skill>( list ) );
        }
        List<City> list1 = seeker.getDesiredLocations();
        if ( list1 != null ) {
            seekerResponse.desiredLocations( new LinkedHashSet<City>( list1 ) );
        }

        return seekerResponse.build();
    }
}
