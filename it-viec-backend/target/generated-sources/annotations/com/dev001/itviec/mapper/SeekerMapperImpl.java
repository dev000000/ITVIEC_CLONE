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
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251023-0518, environment: Java 21.0.8 (Eclipse Adoptium)"
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

        seekerResponse.address( seeker.getAddress() );
        seekerResponse.city( seeker.getCity() );
        seekerResponse.coverLetter( seeker.getCoverLetter() );
        seekerResponse.createdAt( seeker.getCreatedAt() );
        List<City> list = seeker.getDesiredLocations();
        if ( list != null ) {
            seekerResponse.desiredLocations( new LinkedHashSet<City>( list ) );
        }
        seekerResponse.dob( seeker.getDob() );
        seekerResponse.fullName( seeker.getFullName() );
        seekerResponse.gender( seeker.getGender() );
        seekerResponse.id( seeker.getId() );
        seekerResponse.jobTitle( seeker.getJobTitle() );
        seekerResponse.personalLink( seeker.getPersonalLink() );
        seekerResponse.phoneNumber( seeker.getPhoneNumber() );
        List<Skill> list1 = seeker.getSkills();
        if ( list1 != null ) {
            seekerResponse.skills( new LinkedHashSet<Skill>( list1 ) );
        }
        seekerResponse.updatedAt( seeker.getUpdatedAt() );
        seekerResponse.user( seeker.getUser() );

        return seekerResponse.build();
    }
}
