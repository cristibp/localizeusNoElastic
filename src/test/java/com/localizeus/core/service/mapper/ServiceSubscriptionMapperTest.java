package com.localizeus.core.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ServiceSubscriptionMapperTest {

    private ServiceSubscriptionMapper serviceSubscriptionMapper;

    @BeforeEach
    public void setUp() {
        serviceSubscriptionMapper = new ServiceSubscriptionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(serviceSubscriptionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(serviceSubscriptionMapper.fromId(null)).isNull();
    }
}
