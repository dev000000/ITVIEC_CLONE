package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.entity.city.City;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251023-0518, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class CityMapperImpl implements CityMapper {

    @Override
    public List<CityResponse> toCityResponse(List<City> cities) {
        if ( cities == null ) {
            return null;
        }

        List<CityResponse> list = new ArrayList<CityResponse>( cities.size() );
        for ( City city : cities ) {
            list.add( cityToCityResponse( city ) );
        }

        return list;
    }

    protected CityResponse cityToCityResponse(City city) {
        if ( city == null ) {
            return null;
        }

        CityResponse.CityResponseBuilder cityResponse = CityResponse.builder();

        cityResponse.cityName( city.getCityName() );
        cityResponse.id( city.getId() );

        return cityResponse.build();
    }
}
