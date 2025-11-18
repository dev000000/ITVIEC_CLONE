package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.entity.job.Job;
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
public class JobMapperImpl implements JobMapper {

    @Override
    public List<JobResponse> toJobResponse(List<Job> jobs) {
        if ( jobs == null ) {
            return null;
        }

        List<JobResponse> list = new ArrayList<JobResponse>( jobs.size() );
        for ( Job job : jobs ) {
            list.add( jobToJobResponse( job ) );
        }

        return list;
    }

    protected JobResponse jobToJobResponse(Job job) {
        if ( job == null ) {
            return null;
        }

        JobResponse.JobResponseBuilder jobResponse = JobResponse.builder();

        jobResponse.city( job.getCity() );
        jobResponse.company( job.getCompany() );
        jobResponse.createdAt( job.getCreatedAt() );
        jobResponse.experienceLevel( job.getExperienceLevel() );
        jobResponse.expiresAt( job.getExpiresAt() );
        jobResponse.id( job.getId() );
        jobResponse.jobDescription( job.getJobDescription() );
        jobResponse.jobReason( job.getJobReason() );
        jobResponse.jobRequirements( job.getJobRequirements() );
        jobResponse.jobStatus( job.getJobStatus() );
        jobResponse.jobType( job.getJobType() );
        jobResponse.location( job.getLocation() );
        jobResponse.postedAt( job.getPostedAt() );
        jobResponse.salary( job.getSalary() );
        List<Skill> list = job.getSkills();
        if ( list != null ) {
            jobResponse.skills( new LinkedHashSet<Skill>( list ) );
        }
        jobResponse.slug( job.getSlug() );
        jobResponse.title( job.getTitle() );
        jobResponse.updatedAt( job.getUpdatedAt() );
        jobResponse.whyJoinUs( job.getWhyJoinUs() );

        return jobResponse.build();
    }
}
