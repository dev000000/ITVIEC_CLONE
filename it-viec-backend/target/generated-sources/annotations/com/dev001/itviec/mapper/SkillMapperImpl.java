package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.skill.Skill;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251023-0518, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class SkillMapperImpl implements SkillMapper {

    @Override
    public List<SkillResponse> toSkillResponse(List<Skill> skills) {
        if ( skills == null ) {
            return null;
        }

        List<SkillResponse> list = new ArrayList<SkillResponse>( skills.size() );
        for ( Skill skill : skills ) {
            list.add( skillToSkillResponse( skill ) );
        }

        return list;
    }

    protected SkillResponse skillToSkillResponse(Skill skill) {
        if ( skill == null ) {
            return null;
        }

        SkillResponse.SkillResponseBuilder skillResponse = SkillResponse.builder();

        skillResponse.id( skill.getId() );
        skillResponse.skillName( skill.getSkillName() );

        return skillResponse.build();
    }
}
