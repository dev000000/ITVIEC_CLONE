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
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
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

        jobResponse.id( job.getId() );
        jobResponse.company( job.getCompany() );
        jobResponse.title( job.getTitle() );
        jobResponse.slug( job.getSlug() );
        jobResponse.jobReason( job.getJobReason() );
        jobResponse.jobDescription( job.getJobDescription() );
        jobResponse.jobRequirements( job.getJobRequirements() );
        jobResponse.whyJoinUs( job.getWhyJoinUs() );
        jobResponse.location( job.getLocation() );
        jobResponse.city( job.getCity() );
        jobResponse.salary( job.getSalary() );
        jobResponse.jobType( job.getJobType() );
        jobResponse.experienceLevel( job.getExperienceLevel() );
        jobResponse.postedAt( job.getPostedAt() );
        jobResponse.expiresAt( job.getExpiresAt() );
        jobResponse.jobStatus( job.getJobStatus() );
        jobResponse.createdAt( job.getCreatedAt() );
        jobResponse.updatedAt( job.getUpdatedAt() );
        List<Skill> list = job.getSkills();
        if ( list != null ) {
            jobResponse.skills( new LinkedHashSet<Skill>( list ) );
        }

        return jobResponse.build();
    }
}
