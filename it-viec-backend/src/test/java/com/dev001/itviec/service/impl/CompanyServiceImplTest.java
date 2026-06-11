package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import com.dev001.itviec.dto.response.CompanyBriefResponse;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyOptionResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.mapper.CompanyMapper;
import com.dev001.itviec.repository.CompanyLogoRepository;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.service.EmployerService;

@ExtendWith(MockitoExtension.class)
class CompanyServiceImplTest {

    @Mock
    private CompanyMapper companyMapper;

    @Mock
    private CompanyLogoRepository companyLogoRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private EmployerService employerService;

    @InjectMocks
    private CompanyServiceImpl companyService;

    @Test
    void getAdminCompaniesShouldReturnPaginatedResponse() {
        Company company =
                Company.builder().id("company-1").companyName("ITViec").build();
        CompanyBriefResponse response = CompanyBriefResponse.builder()
                .id("company-1")
                .companyName("ITViec")
                .build();

        when(companyRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(company), Pageable.ofSize(10).withPage(0), 1));
        when(companyMapper.toCompanyBriefResponse(List.of(company))).thenReturn(List.of(response));

        PageResponse<CompanyBriefResponse> result =
                companyService.getAdminCompanies(0, 10, "it", CompanyModel.PRODUCT, 1L, CompanySize.SIZE_11_50);

        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(companyRepository).findAll(any(Specification.class), pageableCaptor.capture());

        Pageable pageable = pageableCaptor.getValue();
        assertThat(pageable.getPageNumber()).isZero();
        assertThat(pageable.getPageSize()).isEqualTo(10);
        assertThat(pageable.getSort()).isEqualTo(Sort.by(Sort.Order.asc("companyName"), Sort.Order.asc("id")));
        assertThat(result.getData()).containsExactly(response);
        assertThat(result.getPage()).isZero();
        assertThat(result.getSize()).isEqualTo(1);
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getTotalPages()).isEqualTo(1);
        assertThat(result.isFirst()).isTrue();
        assertThat(result.isLast()).isTrue();
    }

    @Test
    void getAllCompaniesWithJobCountActiveShouldReturnPaginatedResponse() {
        Company firstCompany =
                Company.builder().id("company-1").companyName("Alpha").build();
        Company secondCompany =
                Company.builder().id("company-2").companyName("Beta").build();
        CompanyCardResponse firstResponse = CompanyCardResponse.builder()
                .id("company-1")
                .companyName("Alpha")
                .build();
        CompanyCardResponse secondResponse = CompanyCardResponse.builder()
                .id("company-2")
                .companyName("Beta")
                .build();

        when(companyRepository.findAll(any(Pageable.class)))
                .thenReturn(new PageImpl<>(
                        List.of(firstCompany, secondCompany), Pageable.ofSize(9).withPage(0), 2));
        when(companyMapper.toCompanyCardResponse(firstCompany)).thenReturn(firstResponse);
        when(companyMapper.toCompanyCardResponse(secondCompany)).thenReturn(secondResponse);
        when(jobRepository.countByCompanyAndStatus(firstCompany, JobStatus.ACTIVE))
                .thenReturn(3L);
        when(jobRepository.countByCompanyAndStatus(secondCompany, JobStatus.ACTIVE))
                .thenReturn(1L);

        PageResponse<CompanyCardResponse> result = companyService.getAllCompaniesWithJobCountActive(0, 9);

        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(companyRepository).findAll(pageableCaptor.capture());

        Pageable pageable = pageableCaptor.getValue();
        assertThat(pageable.getPageNumber()).isZero();
        assertThat(pageable.getPageSize()).isEqualTo(9);
        assertThat(pageable.getSort()).isEqualTo(Sort.by(Sort.Order.asc("companyName"), Sort.Order.asc("id")));
        assertThat(result.getData()).containsExactly(firstResponse, secondResponse);
        assertThat(result.getData().get(0).getNumberOfJobsActive()).isEqualTo(3);
        assertThat(result.getData().get(1).getNumberOfJobsActive()).isEqualTo(1);
        assertThat(result.getPage()).isZero();
        assertThat(result.getSize()).isEqualTo(2);
        assertThat(result.getTotalElements()).isEqualTo(2);
        assertThat(result.getTotalPages()).isEqualTo(1);
        assertThat(result.isFirst()).isTrue();
        assertThat(result.isLast()).isTrue();
    }

    @Test
    void getAdminCompanyOptionsShouldReturnSortedOptions() {
        Company firstCompany = Company.builder()
                .id("company-1")
                .companyName("Alpha")
                .slug("alpha")
                .build();
        Company secondCompany = Company.builder()
                .id("company-2")
                .companyName("Beta")
                .slug("beta")
                .build();

        when(companyRepository.findAll(any(Sort.class))).thenReturn(List.of(firstCompany, secondCompany));

        List<CompanyOptionResponse> result = companyService.getAdminCompanyOptions();

        assertThat(result)
                .extracting(
                        CompanyOptionResponse::getId,
                        CompanyOptionResponse::getCompanyName,
                        CompanyOptionResponse::getSlug)
                .containsExactly(
                        org.assertj.core.groups.Tuple.tuple("company-1", "Alpha", "alpha"),
                        org.assertj.core.groups.Tuple.tuple("company-2", "Beta", "beta"));
        verify(companyRepository).findAll(any(Sort.class));
    }

    @Test
    void buildAdminCompanySpecificationShouldApplySearchAndFilters() {
        Specification<Company> specification =
                companyService.buildAdminCompanySpecification("IT", CompanyModel.PRODUCT, 9L, CompanySize.SIZE_11_50);

        Root<Company> root = mockPath(Root.class);
        CriteriaQuery<?> query = mockPath(CriteriaQuery.class);
        CriteriaBuilder criteriaBuilder = mockPath(CriteriaBuilder.class);

        Path companyNamePath = mockPath(Path.class);
        Path loweredCompanyNamePath = mockPath(Path.class);
        Predicate companyNamePredicate = mockPath(Predicate.class);
        when(root.get("companyName")).thenReturn(companyNamePath);
        when(criteriaBuilder.lower(companyNamePath)).thenReturn(loweredCompanyNamePath);
        when(criteriaBuilder.like(loweredCompanyNamePath, "%it%")).thenReturn(companyNamePredicate);

        Path companyModelPath = mockPath(Path.class);
        Predicate companyModelPredicate = mockPath(Predicate.class);
        when(root.get("companyModel")).thenReturn(companyModelPath);
        when(criteriaBuilder.equal(companyModelPath, CompanyModel.PRODUCT)).thenReturn(companyModelPredicate);

        Path countryPath = mockPath(Path.class);
        Path countryIdPath = mockPath(Path.class);
        Predicate countryPredicate = mockPath(Predicate.class);
        when(root.get("country")).thenReturn(countryPath);
        when(countryPath.get("id")).thenReturn(countryIdPath);
        when(criteriaBuilder.equal(countryIdPath, 9L)).thenReturn(countryPredicate);

        Path companySizePath = mockPath(Path.class);
        Predicate companySizePredicate = mockPath(Predicate.class);
        when(root.get("companySize")).thenReturn(companySizePath);
        when(criteriaBuilder.equal(companySizePath, CompanySize.SIZE_11_50)).thenReturn(companySizePredicate);

        Predicate combinedPredicate = mockPath(Predicate.class);
        when(criteriaBuilder.and(any(Predicate[].class))).thenReturn(combinedPredicate);

        Predicate result = specification.toPredicate(root, query, criteriaBuilder);

        assertThat(result).isSameAs(combinedPredicate);
        verify(criteriaBuilder).like(loweredCompanyNamePath, "%it%");
        verify(criteriaBuilder).equal(companyModelPath, CompanyModel.PRODUCT);
        verify(criteriaBuilder).equal(countryIdPath, 9L);
        verify(criteriaBuilder).equal(companySizePath, CompanySize.SIZE_11_50);
    }

    @SuppressWarnings("unchecked")
    private static <T> T mockPath(Class<T> type) {
        return (T) org.mockito.Mockito.mock(type);
    }
}
